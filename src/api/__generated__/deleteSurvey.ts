/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteSurveyInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteSurvey
// ====================================================

export interface deleteSurvey_deleteSurvey_survey_active_areas_colors {
  __typename: "ColorsArea";
  background: string;
  text: string;
}

export interface deleteSurvey_deleteSurvey_survey_active_areas_branch {
  __typename: "Branch";
  name: string;
  id: string;
}

export interface deleteSurvey_deleteSurvey_survey_active_areas {
  __typename: "Area";
  name: string;
  id: string;
  colors: deleteSurvey_deleteSurvey_survey_active_areas_colors | null;
  branch: deleteSurvey_deleteSurvey_survey_active_areas_branch | null;
}

export interface deleteSurvey_deleteSurvey_survey {
  __typename: "Survey";
  name: string;
  id: string;
  /**
   * List areas
   */
  active_areas: deleteSurvey_deleteSurvey_survey_active_areas[] | null;
}

export interface deleteSurvey_deleteSurvey {
  __typename: "DeleteSurveyPayload";
  success: boolean;
  errors: string[] | null;
  survey: deleteSurvey_deleteSurvey_survey | null;
}

export interface deleteSurvey {
  deleteSurvey: deleteSurvey_deleteSurvey | null;
}

export interface deleteSurveyVariables {
  input: DeleteSurveyInput;
}
