/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateAreaInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createArea
// ====================================================

export interface createArea_createArea_area_branch {
  __typename: "Branch";
  id: string;
  name: string;
}

export interface createArea_createArea_area {
  __typename: "Area";
  id: string;
  name: string;
  branch: createArea_createArea_area_branch | null;
}

export interface createArea_createArea {
  __typename: "CreateAreaPayload";
  success: boolean;
  errors: string[] | null;
  area: createArea_createArea_area | null;
}

export interface createArea {
  createArea: createArea_createArea | null;
}

export interface createAreaVariables {
  input: CreateAreaInput;
}
