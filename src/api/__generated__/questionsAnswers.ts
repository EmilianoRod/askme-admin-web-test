/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { QuestionsAnswersInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: QuestionsAnswers
// ====================================================

export interface QuestionsAnswers_questionsAnswers_areas_area {
  __typename: "Area";
  name: string;
  id: string;
}

export interface QuestionsAnswers_questionsAnswers_areas_data_data_answers_answers {
  __typename: "AnswerValuesData";
  value: string | null;
  quantity: number | null;
}

export interface QuestionsAnswers_questionsAnswers_areas_data_data_answers {
  __typename: "AnswersData";
  total: string;
  answers: QuestionsAnswers_questionsAnswers_areas_data_data_answers_answers[] | null;
  nps: number | null;
  csat: number | null;
}

export interface QuestionsAnswers_questionsAnswers_areas_data {
  __typename: "DataByFilter";
  date: string;
  data_answers: QuestionsAnswers_questionsAnswers_areas_data_data_answers;
}

export interface QuestionsAnswers_questionsAnswers_areas {
  __typename: "AreaAnswer";
  area: QuestionsAnswers_questionsAnswers_areas_area;
  total: number;
  data: QuestionsAnswers_questionsAnswers_areas_data[] | null;
}

export interface QuestionsAnswers_questionsAnswers {
  __typename: "QuestionTypes";
  id: string;
  text: string;
  type: string;
  survey_id: string;
  areas: QuestionsAnswers_questionsAnswers_areas[];
}

export interface QuestionsAnswers {
  questionsAnswers: QuestionsAnswers_questionsAnswers[] | null;
}

export interface QuestionsAnswersVariables {
  input: QuestionsAnswersInput;
}
