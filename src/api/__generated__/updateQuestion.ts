/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateQuestionInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateQuestion
// ====================================================

export interface updateQuestion_updateQuestion_question_options {
  __typename: "MultipleChoiceAnswer";
  id: string;
  text: string;
}

export interface updateQuestion_updateQuestion_question {
  __typename: "Question";
  survey_id: string;
  id: string;
  position: number;
  duration: number;
  description: string | null;
  options: updateQuestion_updateQuestion_question_options[] | null;
  satisfaction_index: number | null;
  subtype: string | null;
  type: string;
  text: string;
}

export interface updateQuestion_updateQuestion {
  __typename: "UpdateQuestionPayload";
  errors: string[] | null;
  success: boolean;
  question: updateQuestion_updateQuestion_question | null;
}

export interface updateQuestion {
  updateQuestion: updateQuestion_updateQuestion | null;
}

export interface updateQuestionVariables {
  input: UpdateQuestionInput;
}
