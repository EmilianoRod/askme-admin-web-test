/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateBranchInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createOffice
// ====================================================

export interface createOffice_createBranch_branch_areas {
  __typename: "Area";
  name: string;
  id: string;
}

export interface createOffice_createBranch_branch {
  __typename: "Branch";
  id: string;
  name: string;
  address: string | null;
  /**
   * List areas
   */
  areas: createOffice_createBranch_branch_areas[] | null;
}

export interface createOffice_createBranch {
  __typename: "CreateBranchPayload";
  success: boolean;
  errors: string[] | null;
  branch: createOffice_createBranch_branch | null;
}

export interface createOffice {
  createBranch: createOffice_createBranch | null;
}

export interface createOfficeVariables {
  input: CreateBranchInput;
}
