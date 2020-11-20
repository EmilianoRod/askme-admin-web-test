/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getAdmins
// ====================================================

export interface getAdmins_company_admin_users {
  __typename: "AdminUser";
  email: string;
  type: string;
  id: string;
}

export interface getAdmins_company {
  __typename: "Company";
  id: string;
  /**
   * List AdminUser
   */
  admin_users: getAdmins_company_admin_users[] | null;
}

export interface getAdmins {
  company: getAdmins_company | null;
}

export interface getAdminsVariables {
  input: CompanyInput;
}
