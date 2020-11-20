/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: tabletUsers
// ====================================================

export interface tabletUsers_company_admin_users {
  __typename: "AdminUser";
  email: string;
  type: string;
  id: string;
}

export interface tabletUsers_company_branches_areas_colors {
  __typename: "ColorsArea";
  background: string;
  text: string;
}

export interface tabletUsers_company_branches_areas_branch {
  __typename: "Branch";
  id: string;
  name: string;
}

export interface tabletUsers_company_branches_areas {
  __typename: "Area";
  created_at: any;
  name: string;
  id: string;
  friendly_token: string;
  colors: tabletUsers_company_branches_areas_colors | null;
  branch: tabletUsers_company_branches_areas_branch | null;
}

export interface tabletUsers_company_branches {
  __typename: "Branch";
  id: string;
  name: string;
  address: string | null;
  /**
   * List areas
   */
  areas: tabletUsers_company_branches_areas[] | null;
}

export interface tabletUsers_company_surveys_active_areas_colors {
  __typename: "ColorsArea";
  background: string;
  text: string;
}

export interface tabletUsers_company_surveys_active_areas_branch {
  __typename: "Branch";
  name: string;
  id: string;
}

export interface tabletUsers_company_surveys_active_areas {
  __typename: "Area";
  name: string;
  id: string;
  colors: tabletUsers_company_surveys_active_areas_colors | null;
  branch: tabletUsers_company_surveys_active_areas_branch | null;
}

export interface tabletUsers_company_surveys {
  __typename: "Survey";
  name: string;
  id: string;
  /**
   * List areas
   */
  active_areas: tabletUsers_company_surveys_active_areas[] | null;
}

export interface tabletUsers_company_different_areas_colors {
  __typename: "ColorsArea";
  background: string;
  text: string;
}

export interface tabletUsers_company_different_areas_branches_areas {
  __typename: "Area";
  name: string;
  id: string;
}

export interface tabletUsers_company_different_areas_branches {
  __typename: "Branch";
  id: string;
  name: string;
  address: string | null;
  /**
   * List areas
   */
  areas: tabletUsers_company_different_areas_branches_areas[] | null;
}

export interface tabletUsers_company_different_areas {
  __typename: "CompanyAreas";
  ids: string[];
  name: string;
  colors: tabletUsers_company_different_areas_colors;
  branches: tabletUsers_company_different_areas_branches[];
}

export interface tabletUsers_company_tablet_users_area_branch {
  __typename: "Branch";
  name: string;
  id: string;
}

export interface tabletUsers_company_tablet_users_area {
  __typename: "Area";
  name: string;
  id: string;
  branch: tabletUsers_company_tablet_users_area_branch | null;
}

export interface tabletUsers_company_tablet_users {
  __typename: "User";
  email: string;
  web: boolean | null;
  id: string;
  area: tabletUsers_company_tablet_users_area | null;
}

export interface tabletUsers_company {
  __typename: "Company";
  id: string;
  /**
   * List AdminUser
   */
  admin_users: tabletUsers_company_admin_users[] | null;
  /**
   * List Branches
   */
  branches: tabletUsers_company_branches[] | null;
  /**
   * List Surveys
   */
  surveys: tabletUsers_company_surveys[] | null;
  different_areas: tabletUsers_company_different_areas[] | null;
  tablet_users: tabletUsers_company_tablet_users[] | null;
}

export interface tabletUsers {
  company: tabletUsers_company | null;
}

export interface tabletUsersVariables {
  input: CompanyInput;
}
