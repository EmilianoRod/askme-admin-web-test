/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable consistent-return */
import React, { useState, useEffect, ReactText } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useQuery, useMutation } from '@apollo/client';
import { Table, TableBody } from '@material-ui/core';
import { decamelizeKeys } from 'humps';
import { useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import {
  SEARCH,
  NEW_TEXT,
  COMPANY,
  EMAIL_TEXT,
  NO_ADMINS,
  ADD_ONE,
  TABLET_ACCESS,
  NEW_USER,
  AREA,
  ALLOWED_USERS,
  TABLET_TEXT,
  PASSWORD,
  PASSWORD_TEXT,
  PASSWORD_CONFIRMATION,
  PASSWORD_CONFIRMATION_TEXT,
  REQUIRED_FIELD,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  PASSWORDS_DONT_MATCH,
  UPDATE,
} from 'Utils/constants';
import TableHeader from 'Components/TableElements/TableHeader';
import { TABLET_USERS, GET_COMPANY_BRANCHES } from 'api/queries';
import useNavigation from 'Utils/navigation';
import { AddButton } from 'Components/common/Buttons';
import { NoArea } from 'Assets/Images';
import UserRow from 'Components/TableElements/UserRow';
import { tabletUsers_company_tablet_users } from 'api/__generated__/tabletUsers';
import { UPDATE_USER } from 'api/mutations';
import { BackgroundContainer } from 'Views/Admins/styles';
import {
  getCompanyBranches_company_branches,
  getCompanyBranches,
} from 'api/__generated__/getCompanyBranches';
import {
  Form,
  InputContainer,
  InputLabel,
  Input,
  Error,
  BEError,
  Button,
} from 'Components/common/Form/styles';
import { SelectCont, Form as SelectForm } from 'Views/Results/styles';
import { RiArrowDownSLine } from 'react-icons/ri';
import { InputSelect } from 'Views/Surveys/styles';
import PopoverList from 'Components/SelectList/PopoverList';
import { company_company_surveys } from 'api/__generated__/company';

import useSession from '../../Utils/session';
import theme from '../../theme';
import MainLayout from '../../Layouts/mainLayout';
import {
  Title,
  Background,
  Input as Search,
  Row,
  UsersTable,
  Container,
  NoUsersBackground,
  Body,
  Column,
} from './styles';

const USERS_FIELDS = [EMAIL_TEXT, AREA, ''];
const CELL_WIDTH = ['45%', '50%', '5%'];

const TabletsPage = () => {
  useNavigation();
  const history = useHistory();
  const [searchedTerm, setSearchedTerm] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [email, setEmail] = useState({ text: '', error: '' });
  const [branchArea, setBranchArea] = useState<
    { branch: getCompanyBranches_company_branches; id: string; name: string }[]
  >([]);
  const [selectedBranchAreas, setSelectedBranchAreas] = useState<{
    branch: getCompanyBranches_company_branches;
    id: string;
    name: string;
  }>();
  const [focused, setFocused] = useState(false);
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
              return { branch, name: area.name, id: area.id };
            });
          })
          .flat() as {
          branch: getCompanyBranches_company_branches;
          id: string;
          name: string;
        }[],
      );
    },
  });

  const { data, loading, error: usersError } = useQuery(TABLET_USERS, {
    variables: {
      input: decamelizeKeys({
        companyId: localStorage.getItem(COMPANY),
      }),
    },
    onCompleted: () => {
      setSelectedBranchAreas(
        branchArea.find(({ id }) => id === data.company.tablet_users[0].area.id),
      );
      setEmail({ ...email, text: data.company.tablet_users[0].email });
    },
  });

  const { register, handleSubmit, errors } = useForm({
    validationSchema: yup.object().shape({
      password: yup.string().required(REQUIRED_FIELD).min(8, INVALID_PASSWORD),
      passwordConfirmation: yup
        .string()
        .required(REQUIRED_FIELD)
        .oneOf([yup.ref(PASSWORD_TEXT)], PASSWORDS_DONT_MATCH)
        .min(8, INVALID_PASSWORD),
    }),
    defaultValues: { password: '', passwordConfirmation: '' },
  });

  const hasError = (input: string) => Object.keys(errors).find((error) => error === input);

  useEffect(() => {
    if (branchArea.length) setSelectedBranchAreas(branchArea[0]);
  }, [branchArea]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (areaAnchorRef) setAreaAnchorRef(null);
    setFocused(true);
    setAreaAnchorRef(e.currentTarget);
  };

  const handleOutsideClick = () => {
    if (areaAnchorRef) {
      setAreaAnchorRef(null);
      setFocused(false);
      if (!selectedBranchAreas) setSelectedBranchAreas(branchArea[0]);
    }
  };

  const renderAreaName = () =>
    branchArea && (
      <>
        <Body className="bold">{selectedBranchAreas?.branch?.name}</Body>{' '}
        <Body>{selectedBranchAreas?.name}</Body>
      </>
    );

  const [
    updateUserMutation,
    { data: updateData, error: errorUpdate, loading: loadingUpdate },
  ] = useMutation(UPDATE_USER);

  useSession([loadingUpdate, loading, loadingBranches], [usersError, errorUpdate, errorBranches]);

  const onSubmit = handleSubmit((formValues) => {
    if (
      email.text &&
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email.text,
      )
    )
      updateUserMutation({
        variables: {
          input: {
            id: data?.company.tablet_users[0].id,
            email: email.text,
            password: formValues.password,
            password_confirmation: formValues.passwordConfirmation,
            area_id: selectedBranchAreas?.id,
          },
        },
      }).catch((e) => e);
    else setEmail({ ...email, error: INVALID_EMAIL });
  });

  useEffect(() => {
    if (!loadingUpdate) {
      if (updateData?.createUser?.success) {
        history.push(`/${TABLET_TEXT}`);
      } else setBackendError(updateData?.createUser?.errors[0]);
    }
  }, [loadingUpdate]);

  if (usersError) {
    // TODO: handle error case
  }

  const renderNoAdminsPage = () =>
    loading ? (
      <NoUsersBackground>
        <BeatLoader color={theme.palette.primary[75]} />
      </NoUsersBackground>
    ) : (
      <NoUsersBackground>
        <img alt={NO_ADMINS} src={NoArea} />
        <Body className="bold marginTop">{NO_ADMINS}</Body>
        <Body className="marginBottom">{ADD_ONE}</Body>
        <AddButton
          loading={false}
          text={NEW_USER}
          handleClick={() => history.push(`/${TABLET_TEXT}/${NEW_TEXT}`)}
        />
      </NoUsersBackground>
    );

  useEffect(() => {
    if (data?.company?.allowed_users <= data?.company?.users?.length !== disabled)
      setDisabled(!disabled);
  }, [data]);

  return (
    <MainLayout>
      <Background>
        {data?.company?.tablet_users?.length ? (
          <Container>
            <Row className="margin">
              <Title>{TABLET_ACCESS}</Title>
              <AddButton
                disabled={disabled}
                loading={false}
                text={NEW_USER}
                handleClick={() => history.push(`${TABLET_TEXT}/${NEW_TEXT}`)}
              />
            </Row>
            <Row className="input">
              <Body>{`${ALLOWED_USERS} ${data?.company?.allowed_users}`}</Body>
            </Row>
            {data?.company?.tablet_users?.length === 1 ? (
              <BackgroundContainer className="start">
                <Form className="start" onSubmit={onSubmit}>
                  <Row className="input">
                    <InputContainer className="question margin">
                      <InputLabel className="capitalize">{EMAIL_TEXT}</InputLabel>
                      <Input
                        className={email.error ? 'error question' : 'question'}
                        type="text"
                        value={email.text}
                        onChange={(e) => setEmail({ ...email, text: e.target.value })}
                        autoComplete="off"
                      />
                      <Error>{hasError(EMAIL_TEXT) && email.error}</Error>
                    </InputContainer>
                    <InputContainer className="question margin">
                      <InputLabel>{AREA}</InputLabel>
                      <SelectForm className="question">
                        <SelectCont
                          className={focused ? 'focused question' : 'question'}
                          onClick={handleClick}
                          open={false}
                          displayEmpty
                          renderValue={renderAreaName}
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
                        className={
                          hasError(PASSWORD_CONFIRMATION_TEXT) ? 'error question' : 'question'
                        }
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
                  <BEError>{backendError}</BEError>
                  <Button disabled={loadingUpdate} type="submit">
                    {loadingUpdate ? (
                      <BeatLoader size="5px" color={theme.palette.white[100]} />
                    ) : (
                      UPDATE
                    )}
                  </Button>
                </Form>
                {areaAnchorRef && (
                  <PopoverList
                    searchable
                    data={branchArea}
                    handleOutsideClick={handleOutsideClick}
                    anchorRef={areaAnchorRef}
                    setSelected={
                      setSelectedBranchAreas as (
                        item:
                          | company_company_surveys
                          | { id: ReactText; name: string }
                          | {
                              branch: getCompanyBranches_company_branches;
                              id: string;
                              name: string;
                            },
                      ) => void
                    }
                    className={`question ${AREA}`}
                  />
                )}
              </BackgroundContainer>
            ) : (
              <>
                <Row className="input">
                  <FiSearch size="20px" />
                  <Search onChange={(e) => setSearchedTerm(e.target.value)} placeholder={SEARCH} />
                </Row>
                <UsersTable>
                  <Table>
                    <TableHeader fields={USERS_FIELDS} widths={CELL_WIDTH} />
                    {loading ? null : (
                      <TableBody>
                        {data?.company?.tablet_users &&
                          data?.company?.tablet_users.map(
                            (usersToRender: tabletUsers_company_tablet_users) => {
                              if (
                                usersToRender.email
                                  .toLowerCase()
                                  .includes(searchedTerm.toLowerCase())
                              )
                                return <UserRow data={usersToRender} />;
                            },
                          )}
                      </TableBody>
                    )}
                  </Table>
                </UsersTable>
              </>
            )}
          </Container>
        ) : (
          <Column>
            <Row className="self">
              <Title>{TABLET_ACCESS}</Title>
            </Row>
            {renderNoAdminsPage()}
          </Column>
        )}
      </Background>
    </MainLayout>
  );
};

export default TabletsPage;
