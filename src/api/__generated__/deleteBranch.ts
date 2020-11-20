/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteBranchInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteBranch
// ====================================================

export interface deleteBranch_deleteBranch_branch_areas {
  __typename: "Area";
  id: string;
  name: string;
}

export interface deleteBranch_deleteBranch_branch {
  __typename: "Branch";
  id: string;
  name: string;
  address: string | null;
  /**
   * List areas
   */
  areas: deleteBranch_deleteBranch_branch_areas[] | null;
}

export interface deleteBranch_deleteBranch {
  __typename: "DeleteBranchPayload";
  success: boolean;
  errors: string[] | null;
  branch: deleteBranch_deleteBranch_branch | null;
}

export interface deleteBranch {
  deleteBranch: deleteBranch_deleteBranch | null;
}

export interface deleteBranchVariables {
  input: DeleteBranchInput;
}
