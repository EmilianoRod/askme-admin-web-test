/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: me
// ====================================================

export interface me_me_company {
  __typename: "Company";
  id: string;
}

export interface me_me {
  __typename: "AdminUser";
  company: me_me_company | null;
  email: string;
}

export interface me {
  me: me_me | null;
}
