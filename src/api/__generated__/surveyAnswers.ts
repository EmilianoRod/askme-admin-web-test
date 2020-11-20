/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AnswersInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: surveyAnswers
// ====================================================

export interface surveyAnswers_surveyAnswers_answers_answer {
  __typename: "Answer";
  id: string;
  value: string;
  answered_at: any;
}

export interface surveyAnswers_surveyAnswers_answers_question {
  __typename: "Question";
  id: string;
  text: string;
}

export interface surveyAnswers_surveyAnswers_answers {
  __typename: "AnswerQuestion";
  answer: surveyAnswers_surveyAnswers_answers_answer | null;
  question: surveyAnswers_surveyAnswers_answers_question | null;
}

export interface surveyAnswers_surveyAnswers {
  __typename: "Answers";
  answers: surveyAnswers_surveyAnswers_answers[] | null;
  group_id: string | null;
}

export interface surveyAnswers {
  surveyAnswers: surveyAnswers_surveyAnswers[] | null;
}

export interface surveyAnswersVariables {
  input: AnswersInput;
}
