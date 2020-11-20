/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery, ApolloCache } from '@apollo/client';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { RiArrowDownSLine } from 'react-icons/ri';
import { decamelizeKeys } from 'humps';
import { BeatLoader } from 'react-spinners';

import { MainLayout } from 'Layouts';
import {
  ADD_ADMIN,
  REQUIRED_FIELD,
  INVALID_EMAIL,
  ADMINS_TEXT,
  EMAIL_TEXT,
  PASSWORD_TEXT,
  PASSWORDS_DONT_MATCH,
  VISUALIZATOR,
  COMPANY,
  ADMIN_ES,
  VISUALIZATOR_TEXT,
  ACCESS,
  PASSWORD_CONFIRMATION,
  PASSWORD_CONFIRMATION_TEXT,
  PASSWORD,
  BRANCH_OFFICES,
  AREAS,
  CONFIRM,
  INVALID_PASSWORD,
} from 'Utils/constants';
import { CancelButton } from 'Components/common/Form';
import { CREATE_ADMIN } from 'api/mutations';
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
import { GET_COMPANY_BRANCHES, GET_ADMINS } from 'api/queries';
import { getCompanyBranches } from 'api/__generated__/getCompanyBranches';
import PopoverSearchableCheckList from 'Components/SelectList/PopoverSearchableCheckList';
import { getAdmins } from 'api/__generated__/getAdmins';
import { registerAdminUser } from 'api/__generated__/registerAdminUser';

import useSession from '../../Utils/session';
import { Background, Title, BackgroundContainer, Row } from './styles';
import theme from '../../theme';

const ADMIN_TYPES = [
  { id: COMPANY, name: ADMIN_ES },
  { id: VISUALIZATOR_TEXT, name: VISUALIZATOR },
];

const NewAdmin = () => {
  useNavigation();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required(REQUIRED_FIELD)
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          INVALID_EMAIL,
        ),
      password: yup.string().required(REQUIRED_FIELD).min(8, INVALID_PASSWORD),
      passwordConfirmation: yup
        .string()
        .required(REQUIRED_FIELD)
        .oneOf([yup.ref(PASSWORD_TEXT)], PASSWORDS_DONT_MATCH)
        .min(8, INVALID_PASSWORD),
    }),
    defaultValues: { email: '', password: '', passwordConfirmation: '' },
  });
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

  const hasError = (input: string) => Object.keys(errors).find((error) => error === input);

  const createAdminUpdate = (cache: ApolloCache<registerAdminUser>, data: registerAdminUser) => {
    const createAdminData = data?.registerAdminUser?.admin;
    try {
      const cachedData = cache.readQuery<getAdmins>({
        query: GET_ADMINS,
        variables: {
          input: {
            company_id: localStorage.getItem(COMPANY),
          },
        },
      });
      if (cachedData?.company?.admin_users) {
        if (createAdminData) {
          cache.writeQuery({
            query: GET_ADMINS,
            variables: {
              input: {
                company_id: localStorage.getItem(COMPANY),
              },
            },
            data: {
              ...cachedData,
              company: {
                admin_users: [...cachedData.company.admin_users, createAdminData],
              },
            },
          });
        }
      }
    } catch (e) {
      return e;
    }
  };

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

  const [createAdmin, { data, error, loading }] = useMutation(CREATE_ADMIN, {
    update(cache, { data: updateData }) {
      createAdminUpdate(cache, updateData);
    },
  });

  useSession([loading, loadingBranches], [error, errorBranches]);

  useEffect(() => {
    if (!loading) {
      if (data?.registerAdminUser?.success) history.push(`/${ADMINS_TEXT}`);
      else setBackendError(data?.registerAdminUser?.errors[0]);
    }
  }, [loading]);

  useEffect(() => {
    if (branchArea.length) setSelectedBranchAreas([branchArea[0]]);
  }, [branchArea]);

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

  const handleOutsideClick = () => {
    if (anchorRef) {
      setAnchorRef(null);
      setFocused({ ...focused, type: false });
    }
    if (areaAnchorRef) {
      setAreaAnchorRef(null);
      setFocused({ ...focused, area: false });
      if (!selectedBranchAreas.length) setSelectedBranchAreas([branchArea[0]]);
    }
  };

  const onSubmit = handleSubmit((formValues) => {
    createAdmin({
      variables: {
        input: {
          email: formValues.email,
          password: formValues.password,
          type: selectedType.id,
          areas_ids:
            selectedType.id === VISUALIZATOR_TEXT
              ? selectedBranchAreas.map((selected) => selected.id)
              : branchArea.map((all) => all.id),
          company_id: localStorage.getItem(COMPANY),
        },
      },
    }).catch((e) => e);
  });

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
            <Title className="new">{ADD_ADMIN}</Title>
            <CancelButton onClick={() => history.push(`/${ADMINS_TEXT}`)} />
          </Row>
          <Form className="start" onSubmit={onSubmit}>
            <Row className="input">
              <InputContainer className="question margin">
                <InputLabel className="capitalize">{EMAIL_TEXT}</InputLabel>
                <Input
                  className={hasError(EMAIL_TEXT) ? 'error question' : 'question'}
                  type="text"
                  name={EMAIL_TEXT}
                  autoComplete="off"
                  ref={register()}
                />
                <Error>{hasError(EMAIL_TEXT) && errors[EMAIL_TEXT]?.message}</Error>
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
            <Row className="input">
              <InputContainer className="question margin">
                <InputLabel className="capitalize">{PASSWORD}</InputLabel>
                <Input
                  className={hasError(PASSWORD_TEXT) ? 'error question' : 'question'}
                  type={PASSWORD_TEXT}
                  name={PASSWORD_TEXT}
                  autoComplete="off"
                  ref={register()}
                />
                <Error>{hasError(PASSWORD_TEXT) && errors[PASSWORD_TEXT]?.message}</Error>
              </InputContainer>
              <InputContainer className="question margin">
                <InputLabel>{PASSWORD_CONFIRMATION}</InputLabel>
                <Input
                  className={hasError(PASSWORD_CONFIRMATION_TEXT) ? 'error question' : 'question'}
                  type={PASSWORD_TEXT}
                  name={PASSWORD_CONFIRMATION_TEXT}
                  autoComplete="off"
                  ref={register()}
                />
                <Error>
                  {hasError(PASSWORD_CONFIRMATION_TEXT) &&
                    errors[PASSWORD_CONFIRMATION_TEXT]?.message}
                </Error>
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

export default NewAdmin;
