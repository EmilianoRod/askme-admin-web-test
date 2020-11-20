/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateSurveyInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateSurvey
// ====================================================

export interface updateSurvey_updateSurvey_survey_active_areas_colors {
  __typename: "ColorsArea";
  background: string;
  text: string;
}

export interface updateSurvey_updateSurvey_survey_active_areas_branch {
  __typename: "Branch";
  name: string;
  id: string;
}

export interface updateSurvey_updateSurvey_survey_active_areas {
  __typename: "Area";
  name: string;
  id: string;
  colors: updateSurvey_updateSurvey_survey_active_areas_colors | null;
  branch: updateSurvey_updateSurvey_survey_active_areas_branch | null;
}

export interface updateSurvey_updateSurvey_survey {
  __typename: "Survey";
  name: string;
  id: string;
  /**
   * List areas
   */
  active_areas: updateSurvey_updateSurvey_survey_active_areas[] | null;
}

export interface updateSurvey_updateSurvey {
  __typename: "UpdateSurveyPayload";
  success: boolean;
  errors: string[] | null;
  survey: updateSurvey_updateSurvey_survey | null;
}

export interface updateSurvey {
  updateSurvey: updateSurvey_updateSurvey | null;
}

export interface updateSurveyVariables {
  input: UpdateSurveyInput;
}
