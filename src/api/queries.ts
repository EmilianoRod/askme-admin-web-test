import gql from 'graphql-tag';

export const BRANCH_OFFICES_PAGE = gql`
  query getBranchOffices($input: CompanyInput!) {
    company(input: $input) {
      id
      admin_users {
        email
        type
        id
      }
      branches {
        id
        name
        address
        areas {
          created_at
          name
          id
          friendly_token
          colors {
            background
            text
          }
          branch {
            id
            name
          }
        }
      }
      surveys {
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
      different_areas {
        ids
        name
        colors {
          background
          text
        }
      }
      allowed_users
      users {
        email
        id
        area {
          name
          id
          branch {
            name
            id
          }
        }
      }
    }
  }
`;

export const ME = gql`
  query me {
    me {
      company {
        id
      }
      email
    }
  }
`;

export const GET_QUESTIONS_ANSWERS = gql`
  query QuestionsAnswers($input: QuestionsAnswersInput!) {
    questionsAnswers(input: $input) {
      id
      text
      type
      survey_id
      areas {
        area {
          name
          id
        }
        total
        data {
          date
          data_answers {
            total
            answers {
              value
              quantity
            }
            nps
            csat
          }
        }
      }
    }
  }
`;

export const COMPANY_SURVEYS = gql`
  query surveys($input: CompanyInput!) {
    company(input: $input) {
      id
      admin_users {
        email
        type
        id
      }
      branches {
        id
        name
        address
        areas {
          created_at
          name
          id
          friendly_token
          colors {
            background
            text
          }
          branch {
            id
            name
          }
        }
      }
      surveys {
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
      different_areas {
        ids
        name
        colors {
          background
          text
        }
        branches {
          id
          name
          address
          areas {
            name
            id
          }
        }
      }
      allowed_users
      users {
        email
        id
        area {
          name
          id
          branch {
            name
            id
          }
        }
      }
    }
  }
`;

export const GET_BRANCH_AREAS = gql`
  query branch($input: BranchInput!) {
    branch(input: $input) {
      id
      name
      address
      areas {
        id
        name
        friendly_token
        created_at
        qr_code
        active_survey {
          name
          id
        }
      }
    }
  }
`;

export const GET_SURVEY_QUESTIONS = gql`
  query getSurvey($input: SurveyInput!) {
    survey(input: $input) {
      name
      id
      questions {
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

export const GET_QUESTION = gql`
  query getQuestion($input: SurveyInput!, $id: String!) {
    survey(input: $input) {
      name
      id
      questions(id: $id) {
        description
        duration
        id
        options {
          text
        }
        position
        satisfaction_index
        subtype
        survey_id
        text
        type
      }
    }
  }
`;

export const GET_SURVEY = gql`
  query survey($input: CompanyInput!, $id: String!) {
    company(input: $input) {
      surveys(id: $id) {
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

export const TEXT_ANSWERS = gql`
  query textAnswers($input: TextAnswersInput!) {
    textAnswers(input: $input) {
      answer {
        answered_at
        area {
          branch {
            name
            id
          }
          id
          name
        }
        value
      }
      contact_answer {
        value
      }
      group_id
      question {
        text
        id
      }
    }
  }
`;

export const CONTACT_ANSWERS = gql`
  query ContactAnswers($input: AnswersInput!) {
    contactAnswers(input: $input) {
      group_id
      answers {
        question {
          subtype
        }
        answer {
          answered_at
          value
        }
      }
    }
  }
`;

export const SURVEY_ANSWERS = gql`
  query surveyAnswers($input: AnswersInput!) {
    surveyAnswers(input: $input) {
      answers {
        answer {
          id
          value
          answered_at
        }
        question {
          id
          text
        }
      }
      group_id
    }
  }
`;

export const GET_ADMINS = gql`
  query getAdmins($input: CompanyInput!) {
    company(input: $input) {
      id
      admin_users {
        email
        type
        id
      }
    }
  }
`;

export const GET_COMPANY_BRANCHES = gql`
  query getCompanyBranches($input: CompanyInput!) {
    company(input: $input) {
      branches {
        name
        id
        areas {
          name
          id
        }
      }
    }
  }
`;

export const GET_ADMIN = gql`
  query getAdmin($input: CompanyInput!, $id: String!) {
    company(input: $input) {
      admin_users(id: $id) {
        email
        type
        id
        areas {
          name
          id
          branch {
            name
            id
          }
        }
      }
    }
  }
`;

export const TABLET_USERS = gql`
  query tabletUsers($input: CompanyInput!) {
    company(input: $input) {
      id
      admin_users {
        email
        type
        id
      }
      branches {
        id
        name
        address
        areas {
          created_at
          name
          id
          friendly_token
          colors {
            background
            text
          }
          branch {
            id
            name
          }
        }
      }
      surveys {
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
      different_areas {
        ids
        name
        colors {
          background
          text
        }
        branches {
          id
          name
          address
          areas {
            name
            id
          }
        }
      }
      tablet_users {
        email
        web
        id
        area {
          name
          id
          branch {
            name
            id
          }
        }
      }
    }
  }
`;

export const TABLET_USER = gql`
  query tabletUser($input: CompanyInput!, $id: String!) {
    company(input: $input) {
      id
      allowed_users
      users(id: $id) {
        email
        id
        area {
          name
          id
          branch {
            name
            id
          }
        }
      }
    }
  }
`;

export const SURVEY_PDF = gql`
  query getSurveyPDF($input: AnswersInput!) {
    surveyAnswersSummary(input: $input) {
      summary
    }
  }
`;
