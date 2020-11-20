/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateQuestionInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createQuestion
// ====================================================

export interface createQuestion_createQuestion_question_options {
  __typename: "MultipleChoiceAnswer";
  id: string;
  text: string;
}

export interface createQuestion_createQuestion_question {
  __typename: "Question";
  survey_id: string;
  id: string;
  position: number;
  duration: number;
  options: createQuestion_createQuestion_question_options[] | null;
  satisfaction_index: number | null;
  subtype: string | null;
  type: string;
  text: string;
}

export interface createQuestion_createQuestion {
  __typename: "CreateQuestionPayload";
  errors: string[] | null;
  success: boolean;
  question: createQuestion_createQuestion_question | null;
}

export interface createQuestion {
  createQuestion: createQuestion_createQuestion | null;
}

export interface createQuestionVariables {
  input: CreateQuestionInput;
}
