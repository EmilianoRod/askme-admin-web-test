/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyInput } from './../../../__generated__/globalTypes';

// ====================================================
// GraphQL query operation: company
// ====================================================

export interface company_company_surveys_active_areas_branch {
  __typename: 'Branch';
  name: string;
  id: string;
}

export interface company_company_surveys_active_areas {
  __typename: 'Area';
  name: string;
  id: string;
  branch: company_company_surveys_active_areas_branch | null;
}

export interface company_company_surveys {
  __typename: 'Survey';
  name: string;
  id: string;
  /**
   * List areas
   */
  active_areas: company_company_surveys_active_areas[] | null;
}
export interface company_company_branches_areas {
  __typename: 'Area';
  name: string;
  id: string;
}

export interface company_company_branches {
  __typename: 'Branch';
  id: string;
  name: string;
  address: string | null;
  /**
   * List areas
   */
  areas: company_company_branches_areas[] | null;
}

export interface company_company {
  __typename: 'Company';
  /**
   * List Surveys
   */
  surveys: company_company_surveys[] | null;
  branches: company_company_branches[] | null;
}

export interface company {
  company: company_company | null;
}

export interface companyVariables {
  input: CompanyInput;
}
