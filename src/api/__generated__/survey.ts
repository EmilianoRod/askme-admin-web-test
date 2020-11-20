/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CompanyInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: survey
// ====================================================

export interface survey_company_surveys_active_areas_colors {
  __typename: "ColorsArea";
  background: string;
  text: string;
}

export interface survey_company_surveys_active_areas_branch {
  __typename: "Branch";
  name: string;
  id: string;
}

export interface survey_company_surveys_active_areas {
  __typename: "Area";
  name: string;
  id: string;
  colors: survey_company_surveys_active_areas_colors | null;
  branch: survey_company_surveys_active_areas_branch | null;
}

export interface survey_company_surveys {
  __typename: "Survey";
  name: string;
  id: string;
  /**
   * List areas
   */
  active_areas: survey_company_surveys_active_areas[] | null;
}

export interface survey_company {
  __typename: "Company";
  /**
   * List Surveys
   */
  surveys: survey_company_surveys[] | null;
}

export interface survey {
  company: survey_company | null;
}

export interface surveyVariables {
  input: CompanyInput;
  id: string;
}
