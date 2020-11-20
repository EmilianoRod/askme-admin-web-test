/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getCompanyBranches
// ====================================================

export interface getCompanyBranches_company_branches_areas {
  __typename: "Area";
  name: string;
  id: string;
}

export interface getCompanyBranches_company_branches {
  __typename: "Branch";
  name: string;
  id: string;
  /**
   * List areas
   */
  areas: getCompanyBranches_company_branches_areas[] | null;
}

export interface getCompanyBranches_company {
  __typename: "Company";
  /**
   * List Branches
   */
  branches: getCompanyBranches_company_branches[] | null;
}

export interface getCompanyBranches {
  company: getCompanyBranches_company | null;
}

export interface getCompanyBranchesVariables {
  input: CompanyInput;
}
