/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getAdmin
// ====================================================

export interface getAdmin_company_admin_users_areas_branch {
  __typename: "Branch";
  name: string;
  id: string;
}

export interface getAdmin_company_admin_users_areas {
  __typename: "Area";
  name: string;
  id: string;
  branch: getAdmin_company_admin_users_areas_branch | null;
}

export interface getAdmin_company_admin_users {
  __typename: "AdminUser";
  email: string;
  type: string;
  id: string;
  areas: getAdmin_company_admin_users_areas[] | null;
}

export interface getAdmin_company {
  __typename: "Company";
  /**
   * List AdminUser
   */
  admin_users: getAdmin_company_admin_users[] | null;
}

export interface getAdmin {
  company: getAdmin_company | null;
}

export interface getAdminVariables {
  input: CompanyInput;
  id: string;
}
