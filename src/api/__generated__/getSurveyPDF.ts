/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AnswersInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: getSurveyPDF
// ====================================================

export interface getSurveyPDF_surveyAnswersSummary {
  __typename: "Summary";
  summary: string;
}

export interface getSurveyPDF {
  surveyAnswersSummary: getSurveyPDF_surveyAnswersSummary;
}

export interface getSurveyPDFVariables {
  input: AnswersInput;
}
