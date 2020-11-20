/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AnswersInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: ContactAnswers
// ====================================================

export interface ContactAnswers_contactAnswers_answers_question {
  __typename: "Question";
  subtype: string | null;
}

export interface ContactAnswers_contactAnswers_answers_answer {
  __typename: "Answer";
  answered_at: any;
  value: string;
}

export interface ContactAnswers_contactAnswers_answers {
  __typename: "AnswerQuestion";
  question: ContactAnswers_contactAnswers_answers_question | null;
  answer: ContactAnswers_contactAnswers_answers_answer | null;
}

export interface ContactAnswers_contactAnswers {
  __typename: "Answers";
  group_id: string | null;
  answers: ContactAnswers_contactAnswers_answers[] | null;
}

export interface ContactAnswers {
  contactAnswers: ContactAnswers_contactAnswers[] | null;
}

export interface ContactAnswersVariables {
  input: AnswersInput;
}
