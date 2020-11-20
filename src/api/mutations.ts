import gql from 'graphql-tag';

export const SIGN_IN = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) {
      success
      errors
      admin {
        type
        authentication_token
        company {
          id
        }
        email
      }
    }
  }
`;

export const SIGN_OUT = gql`
  mutation signOut($input: SignOutInput!) {
    signOut(input: $input) {
      errors
      success
    }
  }
`;

export const CREATE_BRANCH_OFFICE = gql`
  mutation createBranch($input: CreateBranchInput!) {
    createBranch(input: $input) {
      success
      errors
      branch {
        id
        name
        address
        areas {
          name
          id
        }
      }
    }
  }
`;

export const DELETE_AREA = gql`
  mutation deleteArea($input: DeleteAreaInput!) {
    deleteArea(input: $input) {
      success
      errors
      area {
        id
        name
        branch {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_AREA = gql`
  mutation createArea($input: CreateAreaInput!) {
    createArea(input: $input) {
      success
      errors
      area {
        id
        name
        branch {
          id
          name
        }
      }
    }
  }
`;

export const UPDATE_BRANCH_OFFICE = gql`
  mutation updateBranchOffice($input: UpdateBranchInput!) {
    updateBranch(input: $input) {
      success
      errors
      branch {
        id
        name
        address
        areas {
          id
          name
        }
      }
    }
  }
`;

export const DELETE_BRANCH = gql`
  mutation deleteBranch($input: DeleteBranchInput!) {
    deleteBranch(input: $input) {
      success
      errors
      branch {
        id
        name
        address
        areas {
          id
          name
        }
      }
    }
  }
`;

export const CREATE_SURVEY = gql`
  mutation createSurvey($input: CreateSurveyInput!) {
    createSurvey(input: $input) {
      success
      errors
      survey {
        name
        id
        active_areas {
          name
          id
          colors {
            background
            text
          }
          branch {
            name
            id
          }
        }
      }
    }
  }
`;

export const UPDATE_AREA = gql`
  mutation updateArea($input: UpdateAreaInput!) {
    updateArea(input: $input) {
      errors
      success
      area {
        active_survey {
          id
        }
        friendly_token
        id
        name
        colors {
          text
          background
        }
        branch {
          id
          name
        }
      }
      success
      errors
    }
  }
`;

export const CREATE_QUESTION = gql`
  mutation createQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      errors
      success
      question {
        survey_id
        id
        position
        duration
        options {
          id
          text
        }
        satisfaction_index
        subtype
        type
        text
      }
    }
  }
`;

export const DELETE_QUESTION = gql`
  mutation deleteQuestion($input: DeleteQuestionInput!) {
    deleteQuestion(input: $input) {
      errors
      success
      question {
        survey_id
        id
        position
        duration
        options {
          id
          text
        }
        satisfaction_index
        subtype
        type
        text
      }
    }
  }
`;

export const UPDATE_QUESTION = gql`
  mutation updateQuestion($input: UpdateQuestionInput!) {
    updateQuestion(input: $input) {
      errors
      success
      question {
        survey_id
        id
        position
        duration
        description
        options {
          id
          text
        }
        satisfaction_index
        subtype
        type
        text
      }
    }
  }
`;

export const UPDATE_SURVEY = gql`
  mutation updateSurvey($input: UpdateSurveyInput!) {
    updateSurvey(input: $input) {
      success
      errors
      survey {
        name
        id
        active_areas {
          name
          id
          colors {
            background
            text
          }
          branch {
            name
            id
          }
        }
      }
    }
  }
`;

export const DELETE_SURVEY = gql`
  mutation deleteSurvey($input: DeleteSurveyInput!) {
    deleteSurvey(input: $input) {
      success
      errors
      survey {
        name
        id
        active_areas {
          name
          id
          colors {
            background
            text
          }
          branch {
            name
            id
          }
        }
      }
    }
  }
`;

export const DELETE_ACTIVE_AREA = gql`
  mutation deleteActiveSurvey($input: DeleteActiveSurveyInput!) {
    deleteActiveSurvey(input: $input) {
      errors
      success
      area {
        id
        name
        colors {
          background
          text
        }
        active_survey {
          id
        }
        branch {
          name
          id
        }
      }
    }
  }
`;

export const EDIT_PROFILE = gql`
  mutation updateAdminUser($input: UpdateAdminUserInput!) {
    updateAdminUser(input: $input) {
      success
      errors
      admin {
        id
        email
      }
    }
  }
`;

export const CREATE_ADMIN = gql`
  mutation registerAdminUser($input: RegisterAdminUserInput!) {
    registerAdminUser(input: $input) {
      success
      errors
      admin {
        email
        id
        type
      }
    }
  }
`;

export const UPDATE_COMPANY_ADMIN = gql`
  mutation updateCompanyAdminUser($input: UpdateCompanyAdminUserInput!) {
    updateCompanyAdminUser(input: $input) {
      success
      errors
      admin {
        email
        type
        id
      }
    }
  }
`;

export const DELETE_ADMIN = gql`
  mutation deleteAdminUser($input: DeleteAdminUserInput!) {
    deleteAdminUser(input: $input) {
      errors
      success
      admin {
        id
        email
        type
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      errors
      success
      user {
        id
        email
        area {
          name
          id
          branch {
            id
            name
          }
        }
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      errors
      success
      user {
        id
        email
        area {
          id
          name
          branch {
            name
            id
          }
        }
      }
    }
  }
`;

export const CREATE_TABLET = gql`
  mutation createUser($input: CreateUserInput!) {
    createUser(input: $input) {
      success
      errors
      user {
        area {
          id
          name
          branch {
            id
            name
          }
        }
      }
    }
  }
`;
