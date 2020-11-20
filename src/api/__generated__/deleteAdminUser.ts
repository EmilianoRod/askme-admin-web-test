/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteAdminUserInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteAdminUser
// ====================================================

export interface deleteAdminUser_deleteAdminUser_admin {
  __typename: "AdminUser";
  id: string;
  email: string;
  type: string;
}

export interface deleteAdminUser_deleteAdminUser {
  __typename: "DeleteAdminUserPayload";
  errors: string[] | null;
  success: boolean;
  admin: deleteAdminUser_deleteAdminUser_admin | null;
}

export interface deleteAdminUser {
  deleteAdminUser: deleteAdminUser_deleteAdminUser | null;
}

export interface deleteAdminUserVariables {
  input: DeleteAdminUserInput;
}
