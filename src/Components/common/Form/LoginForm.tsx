import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { BeatLoader } from 'react-spinners';

import { PASSWORD_TEXT, EMAIL_TEXT } from 'Utils/constants';
import { FormProps } from 'Views/LogIn/LogInPage';
import theme from 'theme';
import { InputLabel, InputContainer, Input, InputsContainer, Error, Form, BEError } from './styles';
import SubmitButton from './SubmitButton';

export interface DataTypes {
  label: string;
  name: typeof EMAIL_TEXT | typeof PASSWORD_TEXT;
}

export interface LoginFormProps {
  data: DataTypes[];
  schema: yup.ObjectSchema<
    object & {
      email: string;
      password: string;
    }
  >;
  submitForm: (formValues: FormProps) => void;
  backendError: string;
  buttonText: string;
  loading: boolean;
}

const LoginForm = ({
  data,
  schema,
  submitForm,
  backendError,
  buttonText,
  loading,
}: LoginFormProps) => {
  const { register, handleSubmit, errors } = useForm<yup.InferType<typeof schema>>({
    validationSchema: schema,
  });
  const onSubmit = handleSubmit((formValues) => submitForm(formValues));
  const hasError = (input: string) => Object.keys(errors).find((error) => error === input);

  const renderFields = () =>
    data.map(({ name, label }: DataTypes) => (
      <InputContainer className="login" key={name}>
        <InputLabel>{`${label}*`}</InputLabel>
        <Input
          className={hasError(name) ? 'error' : ''}
          type={name === PASSWORD_TEXT ? PASSWORD_TEXT : 'text'}
          name={name}
          autoComplete="off"
          ref={register()}
        />
        <Error>{hasError(name) && errors[name]?.message}</Error>
      </InputContainer>
    ));

  return (
    <Form onSubmit={onSubmit}>
      <InputsContainer>{renderFields()}</InputsContainer>
      <BEError>{backendError}</BEError>
      <SubmitButton
        disabled={loading}
        text={loading ? <BeatLoader size="5px" color={theme.palette.white[100]} /> : buttonText}
      />
    </Form>
  );
};

export default LoginForm;
