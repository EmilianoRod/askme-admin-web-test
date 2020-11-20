/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserInput } from "./../../../__generated__/globalTypes";

// ====================================================
// GraphQL mutation operation: createUser
// ====================================================

export interface createUser_createUser_user_area_branch {
  __typename: "Branch";
  id: string;
  name: string;
}

export interface createUser_createUser_user_area {
  __typename: "Area";
  id: string;
  name: string;
  branch: createUser_createUser_user_area_branch | null;
}

export interface createUser_createUser_user {
  __typename: "User";
  area: createUser_createUser_user_area | null;
}

export interface createUser_createUser {
  __typename: "CreateUserPayload";
  success: boolean;
  errors: string[] | null;
  user: createUser_createUser_user | null;
}

export interface createUser {
  createUser: createUser_createUser | null;
}

export interface createUserVariables {
  input: CreateUserInput;
}
