/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateUserInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: updateUser
// ====================================================

export interface updateUser_updateUser_user_area_branch {
  __typename: "Branch";
  id: string;
  name: string;
}

export interface updateUser_updateUser_user_area {
  __typename: "Area";
  name: string;
  id: string;
  branch: updateUser_updateUser_user_area_branch | null;
}

export interface updateUser_updateUser_user {
  __typename: "User";
  id: string;
  email: string;
  area: updateUser_updateUser_user_area | null;
}

export interface updateUser_updateUser {
  __typename: "UpdateUserPayload";
  errors: string[] | null;
  success: boolean;
  user: updateUser_updateUser_user | null;
}

export interface updateUser {
  updateUser: updateUser_updateUser | null;
}

export interface updateUserVariables {
  input: UpdateUserInput;
}
