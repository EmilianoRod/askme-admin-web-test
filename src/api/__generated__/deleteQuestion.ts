/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteQuestionInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteQuestion
// ====================================================

export interface deleteQuestion_deleteQuestion_question_options {
  __typename: "MultipleChoiceAnswer";
  id: string;
  text: string;
}

export interface deleteQuestion_deleteQuestion_question {
  __typename: "Question";
  survey_id: string;
  id: string;
  position: number;
  duration: number;
  options: deleteQuestion_deleteQuestion_question_options[] | null;
  satisfaction_index: number | null;
  subtype: string | null;
  type: string;
  text: string;
}

export interface deleteQuestion_deleteQuestion {
  __typename: "DeleteQuestionPayload";
  errors: string[] | null;
  success: boolean;
  question: deleteQuestion_deleteQuestion_question | null;
}

export interface deleteQuestion {
  deleteQuestion: deleteQuestion_deleteQuestion | null;
}

export interface deleteQuestionVariables {
  input: DeleteQuestionInput;
}
