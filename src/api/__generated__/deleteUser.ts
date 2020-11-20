/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteUserInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: deleteUser
// ====================================================

export interface deleteUser_deleteUser_user_area_branch {
  __typename: "Branch";
  name: string;
  id: string;
}

export interface deleteUser_deleteUser_user_area {
  __typename: "Area";
  id: string;
  name: string;
  branch: deleteUser_deleteUser_user_area_branch | null;
}

export interface deleteUser_deleteUser_user {
  __typename: "User";
  id: string;
  email: string;
  area: deleteUser_deleteUser_user_area | null;
}

export interface deleteUser_deleteUser {
  __typename: "DeleteUserPayload";
  errors: string[] | null;
  success: boolean;
  user: deleteUser_deleteUser_user | null;
}

export interface deleteUser {
  deleteUser: deleteUser_deleteUser | null;
}

export interface deleteUserVariables {
  input: DeleteUserInput;
}
