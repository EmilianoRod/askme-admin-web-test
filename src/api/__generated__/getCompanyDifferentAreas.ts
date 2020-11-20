/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getCompanyDifferentAreas
// ====================================================

export interface getCompanyDifferentAreas_company_different_areas_branches {
  __typename: "Branch";
  id: string;
  name: string;
}

export interface getCompanyDifferentAreas_company_different_areas {
  __typename: "CompanyAreas";
  ids: string[];
  name: string;
  branches: getCompanyDifferentAreas_company_different_areas_branches[];
}

export interface getCompanyDifferentAreas_company {
  __typename: "Company";
  different_areas: getCompanyDifferentAreas_company_different_areas[] | null;
}

export interface getCompanyDifferentAreas {
  company: getCompanyDifferentAreas_company | null;
}

export interface getCompanyDifferentAreasVariables {
  input: CompanyInput;
}
