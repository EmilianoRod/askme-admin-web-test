/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignOutInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: signOut
// ====================================================

export interface signOut_signOut {
  __typename: "SignOutPayload";
  errors: string[] | null;
  success: boolean;
}

export interface signOut {
  signOut: signOut_signOut | null;
}

export interface signOutVariables {
  input: SignOutInput;
}
