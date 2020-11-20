/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: surveys
// ====================================================

export interface surveys_company_admin_users {
  __typename: "AdminUser";
  email: string;
  type: string;
  id: string;
}

export interface surveys_company_branches_areas_colors {
  __typename: "ColorsArea";
  background: string;
  text: string;
}

export interface surveys_company_branches_areas_branch {
  __typename: "Branch";
  id: string;
  name: string;
}

export interface surveys_company_branches_areas {
  __typename: "Area";
  created_at: any;
  name: string;
  id: string;
  friendly_token: string;
  colors: surveys_company_branches_areas_colors | null;
  branch: surveys_company_branches_areas_branch | null;
}

export interface surveys_company_branches {
  __typename: "Branch";
  id: string;
  name: string;
  address: string | null;
  /**
   * List areas
   */
  areas: surveys_company_branches_areas[] | null;
}

export interface surveys_company_surveys_active_areas_colors {
  __typename: "ColorsArea";
  background: string;
  text: string;
}

export interface surveys_company_surveys_active_areas_branch {
  __typename: "Branch";
  name: string;
  id: string;
}

export interface surveys_company_surveys_active_areas {
  __typename: "Area";
  name: string;
  id: string;
  colors: surveys_company_surveys_active_areas_colors | null;
  branch: surveys_company_surveys_active_areas_branch | null;
}

export interface surveys_company_surveys {
  __typename: "Survey";
  name: string;
  id: string;
  /**
   * List areas
   */
  active_areas: surveys_company_surveys_active_areas[] | null;
}

export interface surveys_company_different_areas_colors {
  __typename: "ColorsArea";
  background: string;
  text: string;
}

export interface surveys_company_different_areas_branches_areas {
  __typename: "Area";
  name: string;
  id: string;
}

export interface surveys_company_different_areas_branches {
  __typename: "Branch";
  id: string;
  name: string;
  address: string | null;
  /**
   * List areas
   */
  areas: surveys_company_different_areas_branches_areas[] | null;
}

export interface surveys_company_different_areas {
  __typename: "CompanyAreas";
  ids: string[];
  name: string;
  colors: surveys_company_different_areas_colors;
  branches: surveys_company_different_areas_branches[];
}

export interface surveys_company_users_area_branch {
  __typename: "Branch";
  name: string;
  id: string;
}

export interface surveys_company_users_area {
  __typename: "Area";
  name: string;
  id: string;
  branch: surveys_company_users_area_branch | null;
}

export interface surveys_company_users {
  __typename: "User";
  email: string;
  id: string;
  area: surveys_company_users_area | null;
}

export interface surveys_company {
  __typename: "Company";
  id: string;
  /**
   * List AdminUser
   */
  admin_users: surveys_company_admin_users[] | null;
  /**
   * List Branches
   */
  branches: surveys_company_branches[] | null;
  /**
   * List Surveys
   */
  surveys: surveys_company_surveys[] | null;
  different_areas: surveys_company_different_areas[] | null;
  allowed_users: number;
  /**
   * List Users
   */
  users: surveys_company_users[] | null;
}

export interface surveys {
  company: surveys_company | null;
}

export interface surveysVariables {
  input: CompanyInput;
}
