/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: tabletUser
// ====================================================

export interface tabletUser_company_users_area_branch {
  __typename: "Branch";
  name: string;
  id: string;
}

export interface tabletUser_company_users_area {
  __typename: "Area";
  name: string;
  id: string;
  branch: tabletUser_company_users_area_branch | null;
}

export interface tabletUser_company_users {
  __typename: "User";
  email: string;
  id: string;
  area: tabletUser_company_users_area | null;
}

export interface tabletUser_company {
  __typename: "Company";
  id: string;
  allowed_users: number;
  /**
   * List Users
   */
  users: tabletUser_company_users[] | null;
}

export interface tabletUser {
  company: tabletUser_company | null;
}

export interface tabletUserVariables {
  input: CompanyInput;
  id: string;
}
