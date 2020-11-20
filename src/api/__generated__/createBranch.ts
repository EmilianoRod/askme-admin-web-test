/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBranchInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createBranch
// ====================================================

export interface createBranch_createBranch_branch_areas {
  __typename: "Area";
  name: string;
  id: string;
}

export interface createBranch_createBranch_branch {
  __typename: "Branch";
  id: string;
  name: string;
  address: string | null;
  /**
   * List areas
   */
  areas: createBranch_createBranch_branch_areas[] | null;
}

export interface createBranch_createBranch {
  __typename: "CreateBranchPayload";
  success: boolean;
  errors: string[] | null;
  branch: createBranch_createBranch_branch | null;
}

export interface createBranch {
  createBranch: createBranch_createBranch | null;
}

export interface createBranchVariables {
  input: CreateBranchInput;
}
