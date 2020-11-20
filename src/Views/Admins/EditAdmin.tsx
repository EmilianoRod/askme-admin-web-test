/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { RiArrowDownSLine } from 'react-icons/ri';
import { decamelizeKeys } from 'humps';
import { BeatLoader } from 'react-spinners';

import { MainLayout } from 'Layouts';
import {
  ADMINS_TEXT,
  EMAIL_TEXT,
  VISUALIZATOR,
  COMPANY,
  ADMIN_ES,
  VISUALIZATOR_TEXT,
  ACCESS,
  BRANCH_OFFICES,
  AREAS,
  CONFIRM,
  VISUALIZATOR_USER,
  REQUIRED_FIELD,
  INVALID_EMAIL,
  EDIT_ADMIN,
} from 'Utils/constants';
import { CancelButton } from 'Components/common/Form';
import { UPDATE_COMPANY_ADMIN } from 'api/mutations';
import useNavigation from 'Utils/navigation';
import {
  InputContainer,
  InputLabel,
  Input,
  Error,
  Form,
  BEError,
  Button,
} from 'Components/common/Form/styles';
import { SelectCont, Form as SelectForm } from 'Views/Results/styles';
import { InputSelect, Body } from 'Views/Surveys/styles';
import PopoverList from 'Components/SelectList/PopoverList';
import { company_company_surveys } from 'api/__generated__/company';
import { GET_COMPANY_BRANCHES, GET_ADMIN } from 'api/queries';
import { getCompanyBranches } from 'api/__generated__/getCompanyBranches';
import PopoverSearchableCheckList from 'Components/SelectList/PopoverSearchableCheckList';
import { getAdmin_company_admin_users_areas } from 'api/__generated__/getAdmin';
import { RowContainer } from 'Components/Charts/styles';

import useSession from '../../Utils/session';
import { Background, Title, BackgroundContainer, Row } from './styles';
import theme from '../../theme';

const ADMIN_TYPES = [
  { id: COMPANY, name: ADMIN_ES },
  { id: VISUALIZATOR_TEXT, name: VISUALIZATOR },
];

const EditAdmin = () => {
  useNavigation();
  const history = useHistory();
  const admin_id = window.location.pathname.split('/')[3];
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [selectedType, setSelectedType] = useState(ADMIN_TYPES[0]);
  const [branchArea, setBranchArea] = useState<
    { branchName: string; id: string; areaName: string }[]
  >([]);
  const [selectedBranchAreas, setSelectedBranchAreas] = useState<
    { branchName: string; id: string; areaName: string }[]
  >([]);
  const [focused, setFocused] = useState({ type: false, area: false });
  const [anchorRef, setAnchorRef] = useState<HTMLDivElement | null>(null);
  const [areaAnchorRef, setAreaAnchorRef] = useState<HTMLDivElement | null>(null);
  const [backendError, setBackendError] = useState('');

  const { data: branches, error: errorBranches, loading: loadingBranches } = useQuery<
    getCompanyBranches
  >(GET_COMPANY_BRANCHES, {
    variables: {
      input: decamelizeKeys({
        companyId: localStorage.getItem(COMPANY),
      }),
    },
    onCompleted: () => {
      setBranchArea(
        branches?.company?.branches
          ?.map((branch) => {
            return branch?.areas?.map((area) => {
              return { branchName: branch.name, areaName: area.name, id: area.id };
            });
          })
          .flat() as {
          branchName: string;
          id: string;
          areaName: string;
        }[],
      );
    },
  });
  const { data: adminData, error: errorAdminData, loading: loadingAdminData } = useQuery(
    GET_ADMIN,
    {
      variables: {
        input: { company_id: localStorage.getItem(COMPANY) },
        id: admin_id,
      },
      onCompleted: () => {
        if (!loadingAdminData) {
          setEmail(adminData?.company?.admin_users[0].email);
          setSelectedBranchAreas(
            adminData?.company?.admin_users[0].areas?.map(
              ({ name, id, branch }: getAdmin_company_admin_users_areas) => {
                return { areaName: name, id, branchName: branch?.name };
              },
            ),
          );
          setSelectedType(
            adminData?.company?.admin_users[0].type === VISUALIZATOR_USER
              ? ADMIN_TYPES[1]
              : ADMIN_TYPES[0],
          );
        }
      },
    },
  );
  const [updateAdmin, { data, error: updateError, loading }] = useMutation(UPDATE_COMPANY_ADMIN);

  useSession(
    [loading, loadingAdminData, loadingBranches],
    [errorBranches, errorAdminData, updateError],
  );

  useEffect(() => {
    if (!loading) {
      if (data?.updateCompanyAdminUser?.success) history.push(`/${ADMINS_TEXT}`);
      else setBackendError(data?.updateCompanyAdminUser?.errors[0]);
    }
  }, [loading]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, isArea: boolean) => {
    if (isArea) {
      if (areaAnchorRef) setAreaAnchorRef(null);
      setFocused({ ...focused, area: true });
      setAreaAnchorRef(e.currentTarget);
    } else {
      if (anchorRef) setAnchorRef(null);
      setFocused({ ...focused, type: true });
      setAnchorRef(e.currentTarget);
    }
  };

  const hasError = () => {
    if (!email) setError(REQUIRED_FIELD);
    else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    )
      setError(INVALID_EMAIL);
    return (
      !email ||
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    );
  };

  const onSubmit = () => {
    if (!hasError())
      updateAdmin({
        variables: {
          input: {
            id: admin_id,
            email,
            areas_ids:
              selectedType.id === VISUALIZATOR_TEXT
                ? selectedBranchAreas.map((selected) => selected.id)
                : branchArea.map((all) => all.id),
            type: selectedType.id,
          },
        },
      }).catch((e) => e);
  };

  const handleOutsideClick = () => {
    if (anchorRef) {
      setAnchorRef(null);
      setFocused({ ...focused, type: false });
    }
    if (areaAnchorRef) {
      setAreaAnchorRef(null);
      setFocused({ ...focused, area: false });
      if (!selectedBranchAreas.length)
        setSelectedBranchAreas(
          adminData?.company?.admin_users[0].areas?.map(
            ({ name, id, branch }: getAdmin_company_admin_users_areas) => {
              return {
                areaName: name,
                id,
                branchName: branch?.name,
              };
            },
          ),
        );
    }
  };

  const renderAreaName = () =>
    selectedBranchAreas.length > 1 ? (
      <>
        <Body className="bold lower">
          {selectedBranchAreas.length} {BRANCH_OFFICES}/{AREAS}
        </Body>
      </>
    ) : (
      branchArea.length > 0 && (
        <>
          <Body className="bold">{selectedBranchAreas[0]?.branchName}</Body>{' '}
          <Body>{selectedBranchAreas[0]?.areaName}</Body>
        </>
      )
    );

  useEffect(() => {
    if (data?.createQuestion?.success) history.push(`/${ADMINS_TEXT}`);
  }, [data?.createQuestion?.success]);

  return (
    <MainLayout>
      <Background>
        <BackgroundContainer className="start">
          <Row className="margin">
            <Title className="new">{EDIT_ADMIN}</Title>
            <CancelButton onClick={() => history.push(`/${ADMINS_TEXT}`)} />
          </Row>
          {loadingAdminData ? (
            <RowContainer className="center large">
              <BeatLoader color={theme.palette.primary[75]} />
            </RowContainer>
          ) : (
            <Form className="start">
              <Row className="input">
                <InputContainer className="question margin">
                  <InputLabel className="capitalize">{EMAIL_TEXT}</InputLabel>
                  <Input
                    className={error ? 'error question' : 'question'}
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                  />
                  <Error>{error}</Error>
                </InputContainer>
                <InputContainer className="question margin">
                  <InputLabel>{`${ACCESS}*`}</InputLabel>
                  <SelectForm className="question">
                    <SelectCont
                      className={focused.type ? 'focused question' : 'question'}
                      onClick={(e) => handleClick(e, false)}
                      open={false}
                      displayEmpty
                      renderValue={() => <Body>{selectedType.name}</Body>}
                      value={selectedType.name}
                      input={<InputSelect />}
                      IconComponent={() => (
                        <RiArrowDownSLine size="30px" color={theme.palette.primary[75]} />
                      )}
                    />
                  </SelectForm>
                  <Error />
                </InputContainer>
              </Row>
              {selectedType.id === VISUALIZATOR_TEXT && (
                <InputContainer className="question margin">
                  <InputLabel>{AREAS}</InputLabel>
                  <SelectForm>
                    <SelectCont
                      className={focused.area ? 'focused question' : 'question'}
                      onClick={(e) => handleClick(e, true)}
                      open={false}
                      displayEmpty
                      renderValue={() => renderAreaName()}
                      input={<InputSelect />}
                      IconComponent={() => (
                        <RiArrowDownSLine size="30px" color={theme.palette.primary[75]} />
                      )}
                    />
                  </SelectForm>
                  <Error />
                </InputContainer>
              )}
              <BEError>{backendError}</BEError>
              <Button disabled={loading} type="button" onClick={onSubmit}>
                {loading ? <BeatLoader size="5px" color={theme.palette.white[100]} /> : CONFIRM}
              </Button>
            </Form>
          )}
          {anchorRef && (
            <PopoverList
              data={ADMIN_TYPES}
              handleOutsideClick={handleOutsideClick}
              anchorRef={anchorRef}
              setSelected={
                setSelectedType as (
                  item: company_company_surveys | { id: string | number; name: string },
                ) => void
              }
              className="question"
            />
          )}
          {branches?.company && (
            <PopoverSearchableCheckList
              data={branchArea}
              handleOutsideClick={handleOutsideClick}
              anchorRef={areaAnchorRef}
              selected={selectedBranchAreas}
              setSelected={setSelectedBranchAreas}
            />
          )}
        </BackgroundContainer>
      </Background>
    </MainLayout>
  );
};

export default EditAdmin;
