/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteActiveSurveyInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteActiveSurvey
// ====================================================

export interface deleteActiveSurvey_deleteActiveSurvey_area_colors {
  __typename: "ColorsArea";
  background: string;
  text: string;
}

export interface deleteActiveSurvey_deleteActiveSurvey_area_active_survey {
  __typename: "Survey";
  id: string;
}

export interface deleteActiveSurvey_deleteActiveSurvey_area_branch {
  __typename: "Branch";
  name: string;
  id: string;
}

export interface deleteActiveSurvey_deleteActiveSurvey_area {
  __typename: "Area";
  id: string;
  name: string;
  colors: deleteActiveSurvey_deleteActiveSurvey_area_colors | null;
  active_survey: deleteActiveSurvey_deleteActiveSurvey_area_active_survey | null;
  branch: deleteActiveSurvey_deleteActiveSurvey_area_branch | null;
}

export interface deleteActiveSurvey_deleteActiveSurvey {
  __typename: "DeleteActiveSurveyPayload";
  errors: string[] | null;
  success: boolean;
  area: deleteActiveSurvey_deleteActiveSurvey_area | null;
}

export interface deleteActiveSurvey {
  deleteActiveSurvey: deleteActiveSurvey_deleteActiveSurvey | null;
}

export interface deleteActiveSurveyVariables {
  input: DeleteActiveSurveyInput;
}
