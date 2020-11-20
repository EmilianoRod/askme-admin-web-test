/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery, useMutation, ApolloCache } from '@apollo/client';
import * as yup from 'yup';

import Form from 'Components/common/Form';
import {
  EMAIL,
  PASSWORD,
  PROFILE_TEXT,
  EDIT_PROFILE as EDIT_PROFILE_TEXT,
  EMAIL_TEXT,
  PASSWORD_TEXT,
  PASSWORD_CONFIRMATION_TEXT,
  PASSWORD_CONFIRMATION,
  SAVE,
  REQUIRED_FIELD,
  INVALID_EMAIL,
} from 'Utils/constants';
import { getEmail, setEmail } from 'Utils';
import { ME } from 'api/queries';
import { me } from 'api/__generated__/me';
import useNavigation from 'Utils/navigation';
import { EDIT_PROFILE } from 'api/mutations';
import { updateAdminUser } from 'api/__generated__/updateAdminUser';

import useSession from '../../Utils/session';
import { Background } from '../BranchOffices/styles';

import MainLayout from '../../Layouts/mainLayout';

export interface EditProfileProps {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const EditProfile = () => {
  const { data: meData, error, loading } = useQuery<me>(ME);
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(' ');
  const [hasBeenSubmited, setHasBeenSubmited] = useState(false);
  useNavigation();

  const updateProfile = (
    cache: ApolloCache<updateAdminUser>,
    data: updateAdminUser | null | undefined,
  ) => {
    const updateProfileData = data?.updateAdminUser;
    try {
      const cachedData = cache.readQuery<me>({
        query: ME,
      });
      if (cachedData?.me?.email) {
        if (updateProfileData && updateProfileData.admin?.email) {
          cache.writeQuery({
            query: ME,
            data: {
              ...cachedData,
              me: {
                email: updateProfileData.admin.email,
              },
            },
          });
        }
      }
    } catch (e) {
      return e;
    }
  };

  const [updateUserMutation, { error: loadingError, loading: loadingUpdate }] = useMutation<
    updateAdminUser
  >(EDIT_PROFILE, {
    update(cache, { data }) {
      updateProfile(cache, data);
    },
    onCompleted: ({ updateAdminUser: updateUserData }) => {
      if (updateUserData && !updateUserData.success && updateUserData?.errors) {
        setHasBeenSubmited(false);
        setErrorMessage(updateUserData?.errors[0]);
      }
      if (updateUserData && updateUserData.admin && updateUserData.success) {
        history.push(`/${PROFILE_TEXT}`);
        setEmail(updateUserData.admin?.email);
      }
    },
  });

  useSession([loading, loadingUpdate], [error, loadingError]);

  const data = [
    {
      name: EMAIL_TEXT,
      labelText: EMAIL,
    },
    {
      name: PASSWORD_TEXT,
      labelText: PASSWORD,
    },
    {
      name: PASSWORD_CONFIRMATION_TEXT,
      labelText: PASSWORD_CONFIRMATION,
    },
  ];

  const initialValues = {
    email: getEmail(),
    password: '',
    passwordConfirmation: '',
  };

  if (error) {
    // TODO: handle error
  }

  const submitForm = async ({ email, password, passwordConfirmation }: EditProfileProps) => {
    if (password)
      return updateUserMutation({
        variables: {
          input: {
            email,
            password,
            password_confirmation: passwordConfirmation,
          },
        },
      }).catch((e) => e);
    return updateUserMutation({
      variables: {
        input: {
          email,
        },
      },
    }).catch((e) => e);
  };

  const onCancel = () => history.push(`/${PROFILE_TEXT}`);

  return (
    <MainLayout>
      <Background>
        {!loading && meData && (
          <Form
            data={data}
            onCancel={onCancel}
            title={EDIT_PROFILE_TEXT}
            submitText={SAVE}
            hasBeenSubmited={hasBeenSubmited}
            setHasBeenSubmited={setHasBeenSubmited}
            schema={yup.object().shape({
              email: yup
                .string()
                .required(REQUIRED_FIELD)
                .matches(
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  INVALID_EMAIL,
                ),
              password: yup.string(),
              passwordConfirmation: yup.string(),
            })}
            submitForm={submitForm}
            errorMessage={errorMessage}
            initialValues={initialValues}
            loading={loadingUpdate}
          />
        )}
      </Background>
    </MainLayout>
  );
};

export default EditProfile;
