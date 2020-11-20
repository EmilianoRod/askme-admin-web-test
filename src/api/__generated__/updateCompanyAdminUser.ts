/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateCompanyAdminUserInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateCompanyAdminUser
// ====================================================

export interface updateCompanyAdminUser_updateCompanyAdminUser_admin {
  __typename: "AdminUser";
  email: string;
  type: string;
  id: string;
}

export interface updateCompanyAdminUser_updateCompanyAdminUser {
  __typename: "UpdateCompanyAdminUserPayload";
  success: boolean;
  errors: string[] | null;
  admin: updateCompanyAdminUser_updateCompanyAdminUser_admin | null;
}

export interface updateCompanyAdminUser {
  updateCompanyAdminUser: updateCompanyAdminUser_updateCompanyAdminUser | null;
}

export interface updateCompanyAdminUserVariables {
  input: UpdateCompanyAdminUserInput;
}
