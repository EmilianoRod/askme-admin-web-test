/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignInInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: signIn
// ====================================================

export interface signIn_signIn_admin_company {
  __typename: "Company";
  id: string;
}

export interface signIn_signIn_admin {
  __typename: "AdminUser";
  type: string;
  authentication_token: string;
  company: signIn_signIn_admin_company | null;
  email: string;
}

export interface signIn_signIn {
  __typename: "SignInPayload";
  success: boolean;
  errors: string[] | null;
  admin: signIn_signIn_admin | null;
}

export interface signIn {
  signIn: signIn_signIn | null;
}

export interface signInVariables {
  input: SignInInput;
}
