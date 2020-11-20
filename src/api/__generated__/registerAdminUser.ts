/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RegisterAdminUserInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: registerAdminUser
// ====================================================

export interface registerAdminUser_registerAdminUser_admin {
  __typename: "AdminUser";
  email: string;
  id: string;
  type: string;
}

export interface registerAdminUser_registerAdminUser {
  __typename: "RegisterAdminUserPayload";
  success: boolean;
  errors: string[] | null;
  admin: registerAdminUser_registerAdminUser_admin | null;
}

export interface registerAdminUser {
  registerAdminUser: registerAdminUser_registerAdminUser | null;
}

export interface registerAdminUserVariables {
  input: RegisterAdminUserInput;
}
