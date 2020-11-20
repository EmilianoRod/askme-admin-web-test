/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable consistent-return */
import React, { useState, useEffect, ReactText } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery, ApolloCache } from '@apollo/client';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { RiArrowDownSLine } from 'react-icons/ri';
import { decamelizeKeys } from 'humps';
import { BeatLoader } from 'react-spinners';

import { MainLayout } from 'Layouts';
import {
  NEW_USER,
  REQUIRED_FIELD,
  INVALID_EMAIL,
  EMAIL_TEXT,
  PASSWORD_TEXT,
  PASSWORDS_DONT_MATCH,
  COMPANY,
  PASSWORD_CONFIRMATION,
  PASSWORD_CONFIRMATION_TEXT,
  PASSWORD,
  CONFIRM,
  INVALID_PASSWORD,
  AREA,
  TABLET_TEXT,
} from 'Utils/constants';
import { CancelButton } from 'Components/common/Form';
import { CREATE_TABLET } from 'api/mutations';
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
import { GET_COMPANY_BRANCHES, TABLET_USERS } from 'api/queries';
import {
  getCompanyBranches,
  getCompanyBranches_company_branches,
} from 'api/__generated__/getCompanyBranches';
import { createUser } from 'api/__generated__/createUser';
import { tabletUsers } from 'api/__generated__/tabletUsers';
import { company_company_surveys } from 'api/__generated__/company';

import useSession from '../../Utils/session';
import theme from '../../theme';
import { Background, Title, BackgroundContainer, Row } from '../Admins/styles';

const NewTablet = () => {
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

  const hasError = (input: string) => Object.keys(errors).find((error) => error === input);

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

  const createUserUpdate = (cache: ApolloCache<createUser>, data: createUser) => {
    const createUserData = data?.createUser?.user;
    try {
      const cachedData = cache.readQuery<tabletUsers>({
        query: TABLET_USERS,
        variables: {
          input: {
            company_id: localStorage.getItem(COMPANY),
          },
        },
      });
      if (cachedData?.company?.tablet_users) {
        if (createUserData) {
          cache.writeQuery({
            query: TABLET_USERS,
            variables: {
              input: {
                company_id: localStorage.getItem(COMPANY),
              },
            },
            data: {
              ...cachedData,
              company: {
                users: [...cachedData.company.tablet_users, createUserData],
              },
            },
          });
        }
      }
    } catch (e) {
      return e;
    }
  };

  const [createUserMutation, { data, error, loading }] = useMutation(CREATE_TABLET, {
    update(cache, { data: updateData }) {
      createUserUpdate(cache, updateData);
    },
    onCompleted: () => history.push(`/${TABLET_TEXT}`),
  });

  useSession([loading, loadingBranches], [error, errorBranches]);

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

  const onSubmit = handleSubmit((formValues) => {
    createUserMutation({
      variables: {
        input: {
          email: formValues.email,
          password: formValues.password,
          password_confirmation: formValues.passwordConfirmation,
          area_id: selectedBranchAreas?.id,
        },
      },
    }).catch((e) => e);
  });

  useEffect(() => {
    if (!loading) {
      if (data?.createUser?.success) history.push(`/${TABLET_TEXT}`);
      else setBackendError(data?.createUser?.errors[0]);
    }
  }, [loading]);

  return (
    <MainLayout>
      <Background>
        <BackgroundContainer className="start">
          <Row className="margin">
            <Title className="new">{NEW_USER}</Title>
            <CancelButton onClick={() => history.push(`/${TABLET_TEXT}`)} />
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
                <InputLabel>{AREA}</InputLabel>
                <SelectForm className="question">
                  <SelectCont
                    className={focused ? 'focused question' : 'question'}
                    onClick={(e) => handleClick(e)}
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
            <BEError>{backendError}</BEError>
            <Button disabled={loading} type="submit">
              {loading ? <BeatLoader size="5px" color={theme.palette.white[100]} /> : CONFIRM}
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
                    | { branch: getCompanyBranches_company_branches; id: string; name: string },
                ) => void
              }
              className={`question ${AREA}`}
            />
          )}
        </BackgroundContainer>
      </Background>
    </MainLayout>
  );
};

export default NewTablet;
