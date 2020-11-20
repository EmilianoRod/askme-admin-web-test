/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: areas
// ====================================================

export interface areas_company_different_areas_branches {
  __typename: "Branch";
  name: string;
  id: string;
}

export interface areas_company_different_areas {
  __typename: "CompanyAreas";
  name: string;
  branches: areas_company_different_areas_branches[];
}

export interface areas_company {
  __typename: "Company";
  different_areas: areas_company_different_areas[] | null;
}

export interface areas {
  company: areas_company | null;
}

export interface areasVariables {
  input: CompanyInput;
}
