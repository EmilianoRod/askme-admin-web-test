/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SurveyInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getSurvey
// ====================================================

export interface getSurvey_survey_questions_options {
  __typename: "MultipleChoiceAnswer";
  id: string;
  text: string;
}

export interface getSurvey_survey_questions {
  __typename: "Question";
  survey_id: string;
  id: string;
  position: number;
  duration: number;
  options: getSurvey_survey_questions_options[] | null;
  satisfaction_index: number | null;
  subtype: string | null;
  type: string;
  text: string;
}

export interface getSurvey_survey {
  __typename: "Survey";
  name: string;
  id: string;
  /**
   * List questions
   */
  questions: getSurvey_survey_questions[] | null;
}

export interface getSurvey {
  survey: getSurvey_survey | null;
}

export interface getSurveyVariables {
  input: SurveyInput;
}
