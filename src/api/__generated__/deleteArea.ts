/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteAreaInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteArea
// ====================================================

export interface deleteArea_deleteArea_area_branch {
  __typename: "Branch";
  id: string;
  name: string;
}

export interface deleteArea_deleteArea_area {
  __typename: "Area";
  id: string;
  name: string;
  branch: deleteArea_deleteArea_area_branch | null;
}

export interface deleteArea_deleteArea {
  __typename: "DeleteAreaPayload";
  success: boolean;
  errors: string[] | null;
  area: deleteArea_deleteArea_area | null;
}

export interface deleteArea {
  deleteArea: deleteArea_deleteArea | null;
}

export interface deleteAreaVariables {
  input: DeleteAreaInput;
}
