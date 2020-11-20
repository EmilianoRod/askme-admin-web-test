/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateSurveyInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createSurvey
// ====================================================

export interface createSurvey_createSurvey_survey_active_areas_colors {
  __typename: "ColorsArea";
  background: string;
  text: string;
}

export interface createSurvey_createSurvey_survey_active_areas_branch {
  __typename: "Branch";
  name: string;
  id: string;
}

export interface createSurvey_createSurvey_survey_active_areas {
  __typename: "Area";
  name: string;
  id: string;
  colors: createSurvey_createSurvey_survey_active_areas_colors | null;
  branch: createSurvey_createSurvey_survey_active_areas_branch | null;
}

export interface createSurvey_createSurvey_survey {
  __typename: "Survey";
  name: string;
  id: string;
  /**
   * List areas
   */
  active_areas: createSurvey_createSurvey_survey_active_areas[] | null;
}

export interface createSurvey_createSurvey {
  __typename: "CreateSurveyPayload";
  success: boolean;
  errors: string[] | null;
  survey: createSurvey_createSurvey_survey | null;
}

export interface createSurvey {
  createSurvey: createSurvey_createSurvey | null;
}

export interface createSurveyVariables {
  input: CreateSurveyInput;
}
