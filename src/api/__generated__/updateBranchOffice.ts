/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateBranchInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateBranchOffice
// ====================================================

export interface updateBranchOffice_updateBranch_branch_areas {
  __typename: "Area";
  id: string;
  name: string;
}

export interface updateBranchOffice_updateBranch_branch {
  __typename: "Branch";
  id: string;
  name: string;
  address: string | null;
  /**
   * List areas
   */
  areas: updateBranchOffice_updateBranch_branch_areas[] | null;
}

export interface updateBranchOffice_updateBranch {
  __typename: "UpdateBranchPayload";
  success: boolean;
  errors: string[] | null;
  branch: updateBranchOffice_updateBranch_branch | null;
}

export interface updateBranchOffice {
  updateBranch: updateBranchOffice_updateBranch | null;
}

export interface updateBranchOfficeVariables {
  input: UpdateBranchInput;
}
