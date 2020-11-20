import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import {
  LOG_IN,
  EMAIL,
  EMAIL_TEXT,
  PASSWORD,
  PASSWORD_TEXT,
  REQUIRED_FIELD,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  RESULTS_TEXT,
  FORGOT_PASSWORD,
  ENTER,
} from 'Utils/constants';
import { setEmail } from 'Utils';
import LoginForm, { DataTypes } from 'Components/common/Form/LoginForm';
import { SIGN_IN } from 'api/mutations';
import { Row, Left, Right, Image, Logo, Title, ForgotPasswordLink } from './styles';
import { LoginBackground, FaceLogo } from '../../Assets/Images';

export interface FormProps {
  email: string;
  password: string;
}

const data = [
  { name: EMAIL_TEXT, label: EMAIL },
  { name: PASSWORD_TEXT, label: PASSWORD },
];

const LogInPage = () => {
  const history = useHistory();
  const [signIn, { data: signInResponse, loading }] = useMutation(SIGN_IN);
  const [backendError, setBackendError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('company')) {
      history.push(`/${RESULTS_TEXT}`);
    }
  }, []);

  useEffect(() => {
    if (signInResponse && !loading) {
      if (signInResponse.signIn.success) {
        localStorage.setItem('token', signInResponse.signIn.admin.authentication_token);
        localStorage.setItem('company', signInResponse.signIn.admin.company.id);
        localStorage.setItem('user', signInResponse.signIn.admin.type);
        setEmail(signInResponse.signIn.admin.email);
        history.push(`/${RESULTS_TEXT}`);
      } else {
        setBackendError(signInResponse.signIn.errors[0]);
      }
    }
  }, [signInResponse]);

  const submitForm = async ({ email, password }: FormProps) =>
    signIn({
      variables: { input: { email, password } },
    });

  return (
    <Row>
      <Left>
        <Image src={LoginBackground} />
        <Logo src={FaceLogo} />
      </Left>
      <Right>
        <Title>{LOG_IN}</Title>
        <LoginForm
          data={data as DataTypes[]}
          schema={yup.object().shape({
            email: yup
              .string()
              .required(REQUIRED_FIELD)
              .matches(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                INVALID_EMAIL,
              ),
            password: yup.string().required(REQUIRED_FIELD).min(8, INVALID_PASSWORD),
          })}
          submitForm={submitForm}
          backendError={backendError}
          buttonText={ENTER}
          loading={loading}
        />
        <ForgotPasswordLink
          style={{ visibility: 'hidden' }}
          onClick={() => {
            // TODO handle forgot password
          }}
        >
          {FORGOT_PASSWORD}
        </ForgotPasswordLink>
      </Right>
    </Row>
  );
};

export default LogInPage;
