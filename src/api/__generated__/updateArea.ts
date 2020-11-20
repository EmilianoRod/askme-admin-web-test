/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateAreaInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateArea
// ====================================================

export interface updateArea_updateArea_area_active_survey {
  __typename: "Survey";
  id: string;
}

export interface updateArea_updateArea_area_colors {
  __typename: "ColorsArea";
  text: string;
  background: string;
}

export interface updateArea_updateArea_area_branch {
  __typename: "Branch";
  id: string;
  name: string;
}

export interface updateArea_updateArea_area {
  __typename: "Area";
  active_survey: updateArea_updateArea_area_active_survey | null;
  friendly_token: string;
  id: string;
  name: string;
  colors: updateArea_updateArea_area_colors | null;
  branch: updateArea_updateArea_area_branch | null;
}

export interface updateArea_updateArea {
  __typename: "UpdateAreaPayload";
  errors: string[] | null;
  success: boolean;
  area: updateArea_updateArea_area | null;
}

export interface updateArea {
  updateArea: updateArea_updateArea | null;
}

export interface updateAreaVariables {
  input: UpdateAreaInput;
}
