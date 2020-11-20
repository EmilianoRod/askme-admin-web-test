/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TextAnswersInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: textAnswers
// ====================================================

export interface textAnswers_textAnswers_answer_area_branch {
  __typename: "Branch";
  name: string;
  id: string;
}

export interface textAnswers_textAnswers_answer_area {
  __typename: "Area";
  branch: textAnswers_textAnswers_answer_area_branch | null;
  id: string;
  name: string;
}

export interface textAnswers_textAnswers_answer {
  __typename: "Answer";
  answered_at: any;
  area: textAnswers_textAnswers_answer_area;
  value: string;
}

export interface textAnswers_textAnswers_contact_answer {
  __typename: "Answer";
  value: string;
}

export interface textAnswers_textAnswers_question {
  __typename: "Question";
  text: string;
  id: string;
}

export interface textAnswers_textAnswers {
  __typename: "TextAnswers";
  answer: textAnswers_textAnswers_answer;
  contact_answer: textAnswers_textAnswers_contact_answer | null;
  group_id: string;
  question: textAnswers_textAnswers_question;
}

export interface textAnswers {
  textAnswers: textAnswers_textAnswers[] | null;
}

export interface textAnswersVariables {
  input: TextAnswersInput;
}
