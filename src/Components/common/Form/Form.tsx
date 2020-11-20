import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { FetchResult } from '@apollo/client';
import { BeatLoader } from 'react-spinners';

import theme from 'theme';
import SubmitButton from './SubmitButton';
import CancelButton from './CancelButton';
import { PASSWORD_TEXT, PASSWORD_CONFIRMATION_TEXT, EMAIL_TEXT } from '../../../Utils/constants';
import {
  BackgroundContainer,
  FormContainer,
  InputContainer,
  InputLabel,
  Input,
  Title,
  Error,
  InputsContainer,
  EditForm,
} from './styles';

export interface DataType {
  name: typeof EMAIL_TEXT | typeof PASSWORD_TEXT | typeof PASSWORD_CONFIRMATION_TEXT;
  labelText: string;
}
// when going to use this component add | new schema type in schema and | typeOf mutation variables in variables
export interface FormPropType {
  title: string;
  submitText: string;
  schema: yup.ObjectSchema<
    | (object & {
        name: string;
        address: string;
      })
    | (object & {
        name: string;
        url: string;
      })
    | (object & {
        name: string;
      })
    | (object & {
        email: string;
        password: string;
        passwordConfirmation: string;
      })
    // add new type here // add new type here
  >;
  data: DataType[];
  errorMessage: string;
  hasBeenSubmited: boolean;
  setHasBeenSubmited: (state: boolean) => void;
  initialValues: {
    name?: string;
    address?: string;
    url?: string;
    password?: string;
    email?: string | null;
    passwordConfirmation?: string;
  };
  onCancel: () => void;
  submitForm: (
    variables: any, // add new type here
  ) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>;
  loading: boolean;
}

const Form = ({
  title,
  submitText,
  schema,
  data,
  errorMessage,
  initialValues,
  hasBeenSubmited,
  setHasBeenSubmited,
  onCancel,
  submitForm,
  loading,
}: FormPropType) => {
  const { register, handleSubmit, errors } = useForm<yup.InferType<typeof schema>>({
    validationSchema: schema,
    defaultValues: initialValues,
  });

  const onSubmit = handleSubmit((formValues) => {
    if (!hasBeenSubmited) {
      submitForm(formValues);
      setHasBeenSubmited(true);
    }
  });

  const hasError = (input: string) => Object.keys(errors).find((error) => error === input);

  const renderInputField = (
    label: string,
    name: string,
    hasInputError: boolean,
    ref:
      | ((instance: HTMLInputElement | null) => void)
      | React.RefObject<HTMLInputElement>
      | null
      | undefined,
    error: string,
  ) => {
    return (
      <InputContainer key={name}>
        <InputLabel>{label}</InputLabel>
        <Input
          className={hasInputError ? 'error' : ''}
          name={name}
          ref={ref}
          autoComplete="off"
          type={
            name === PASSWORD_CONFIRMATION_TEXT || name === PASSWORD_TEXT ? PASSWORD_TEXT : 'text'
          }
        />
        <Error>{hasInputError ? error : ''}</Error>
      </InputContainer>
    );
  };

  const renderAllInputs = () => {
    return data.map(({ name, labelText }: DataType) => {
      const hasInputError = hasError(name);
      return renderInputField(
        labelText,
        name,
        hasInputError !== undefined,
        register(),
        errors[name]?.message,
      );
    });
  };

  return (
    <BackgroundContainer>
      <FormContainer>
        <Title>{title}</Title>
        <EditForm onSubmit={onSubmit}>
          <InputsContainer>{renderAllInputs()}</InputsContainer>
          <Error className="start">{errorMessage}</Error>
          <SubmitButton
            disabled={loading}
            text={loading ? <BeatLoader size="5px" color={theme.palette.white[100]} /> : submitText}
          />
        </EditForm>
      </FormContainer>
      <CancelButton onClick={onCancel} />
    </BackgroundContainer>
  );
};

export default Form;
