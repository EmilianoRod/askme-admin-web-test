/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateAdminUserInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateAdminUser
// ====================================================

export interface updateAdminUser_updateAdminUser_admin {
  __typename: "AdminUser";
  id: string;
  email: string;
}

export interface updateAdminUser_updateAdminUser {
  __typename: "UpdateAdminUserPayload";
  success: boolean;
  errors: string[] | null;
  admin: updateAdminUser_updateAdminUser_admin | null;
}

export interface updateAdminUser {
  updateAdminUser: updateAdminUser_updateAdminUser | null;
}

export interface updateAdminUserVariables {
  input: UpdateAdminUserInput;
}
