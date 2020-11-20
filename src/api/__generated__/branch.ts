/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BranchInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: branch
// ====================================================

export interface branch_branch_areas_active_survey {
  __typename: "Survey";
  name: string;
  id: string;
}

export interface branch_branch_areas {
  __typename: "Area";
  id: string;
  name: string;
  friendly_token: string;
  created_at: any;
  qr_code: string | null;
  active_survey: branch_branch_areas_active_survey | null;
}

export interface branch_branch {
  __typename: "Branch";
  id: string;
  name: string;
  address: string | null;
  /**
   * List areas
   */
  areas: branch_branch_areas[] | null;
}

export interface branch {
  branch: branch_branch | null;
}

export interface branchVariables {
  input: BranchInput;
}
