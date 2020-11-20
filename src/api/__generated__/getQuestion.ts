/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SurveyInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getQuestion
// ====================================================

export interface getQuestion_survey_questions_options {
  __typename: "MultipleChoiceAnswer";
  text: string;
}

export interface getQuestion_survey_questions {
  __typename: "Question";
  description: string | null;
  duration: number;
  id: string;
  options: getQuestion_survey_questions_options[] | null;
  position: number;
  satisfaction_index: number | null;
  subtype: string | null;
  survey_id: string;
  text: string;
  type: string;
}

export interface getQuestion_survey {
  __typename: "Survey";
  name: string;
  id: string;
  /**
   * List questions
   */
  questions: getQuestion_survey_questions[] | null;
}

export interface getQuestion {
  survey: getQuestion_survey | null;
}

export interface getQuestionVariables {
  input: SurveyInput;
  id: string;
}
