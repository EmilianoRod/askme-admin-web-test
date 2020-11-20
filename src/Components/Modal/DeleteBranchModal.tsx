/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect, useState } from 'react';
import { useMutation, ApolloCache } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import {
  DELETE,
  COMPANY,
  YOU_WILL_LOSE_DATA,
  BRANCH_OFFICES_TEXT,
  ARE_YOU_SURE_DELETE_BRANCH,
  ARE_YOU_SURE_DELETE_QUESTION,
  ARE_YOU_SURE_DELETE_SURVEY,
  SURVEYS_TEXT,
  BRANCH_OFFICE,
  QUESTION,
  SURVEY,
  ADMINS,
  ARE_YOU_SURE_DELETE_ADMIN,
  ADMINS_TEXT,
  USER,
  ARE_YOU_SURE_DELETE_USER,
} from 'Utils/constants';
import {
  DELETE_BRANCH,
  DELETE_QUESTION,
  DELETE_SURVEY,
  DELETE_ADMIN,
  DELETE_USER,
} from 'api/mutations';
import { deleteBranch } from 'api/__generated__/deleteBranch';
import {
  BRANCH_OFFICES_PAGE,
  GET_SURVEY_QUESTIONS,
  COMPANY_SURVEYS,
  GET_SURVEY,
  GET_ADMINS,
  TABLET_USERS,
} from 'api/queries';
import { DeleteButton } from 'Components/common/Buttons';
import { getBranchOffices } from 'api/__generated__/getBranchOffices';
import { deleteQuestion } from 'api/__generated__/deleteQuestion';
import { getSurvey } from 'api/__generated__/getSurvey';
import { deleteSurvey } from 'api/__generated__/deleteSurvey';
import { surveys } from 'api/__generated__/surveys';
import { survey } from 'api/__generated__/survey';
import { deleteAdminUser } from 'api/__generated__/deleteAdminUser';
import { getAdmins } from 'api/__generated__/getAdmins';
import { deleteUser } from 'api/__generated__/deleteUser';
import { tabletUsers } from 'api/__generated__/tabletUsers';

import useSession from '../../Utils/session';
import { Modal, ModalContainer, RowContainer, Title, Text } from './styles';
import CancelButton from '../common/Form/CancelButton';

export interface ModalProps {
  isOpen: boolean;
  handleOpen: () => void;
  id: string;
  type: string;
}

const ModalComponent = ({ isOpen, handleOpen, id, type }: ModalProps) => {
  const history = useHistory();
  const survey_id = window.location.pathname.split('/')[3];
  const [hasBeenSubmited, setHasBeenSubmited] = useState(false);

  const updateQuery = (cache: ApolloCache<deleteBranch>, data: deleteBranch | null | undefined) => {
    const deleteBranchData = data?.deleteBranch;
    try {
      const cachedData = cache.readQuery<getBranchOffices>({
        query: BRANCH_OFFICES_PAGE,
        variables: {
          input: {
            company_id: localStorage.getItem(COMPANY),
          },
        },
      });
      if (cachedData?.company?.branches) {
        if (deleteBranchData && deleteBranchData.branch) {
          const branches = cachedData?.company?.branches?.filter(
            ({ id: myId }) => myId !== deleteBranchData?.branch?.id,
          );
          cache.writeQuery({
            query: BRANCH_OFFICES_PAGE,
            variables: {
              input: {
                company_id: localStorage.getItem(COMPANY),
              },
            },
            data: {
              ...cachedData,
              company: {
                branches: [...branches],
              },
            },
          });
        }
      }
    } catch (e) {
      return e;
    }
  };

  const deleteSurveyUpdate = (cache: ApolloCache<deleteSurvey>, data?: deleteSurvey | null) => {
    const deleteSurveyData = data?.deleteSurvey?.survey;
    try {
      const cachedData = cache.readQuery<surveys>({
        query: COMPANY_SURVEYS,
        variables: {
          input: {
            company_id: localStorage.getItem(COMPANY),
          },
        },
      });
      if (cachedData?.company?.surveys) {
        if (deleteSurveyData) {
          const newSurveys = cachedData?.company?.surveys?.filter(
            ({ id: myId }) => myId !== deleteSurveyData?.id,
          );
          cache.writeQuery({
            query: COMPANY_SURVEYS,
            variables: {
              input: {
                company_id: localStorage.getItem(COMPANY),
              },
            },
            data: {
              ...cachedData,
              company: {
                surveys: [...newSurveys],
              },
            },
          });
        }
      }
    } catch (error) {
      const cachedData = cache.readQuery<survey>({
        query: GET_SURVEY,
        variables: {
          input: {
            company_id: localStorage.getItem(COMPANY),
          },
          id: survey_id,
        },
      });
      if (cachedData?.company?.surveys) {
        if (deleteSurveyData) {
          cache.writeQuery({
            query: GET_SURVEY,
            variables: {
              input: {
                company_id: localStorage.getItem(COMPANY),
              },
              id: survey_id,
            },
            data: {
              ...cachedData,
              company: {
                surveys: [],
              },
            },
          });
        }
      }
      return error;
    }
  };

  const deleteQuestionUpdate = (cache: ApolloCache<deleteQuestion>, data?: deleteQuestion) => {
    const deleteQuestionData = data?.deleteQuestion?.question;
    try {
      const cachedData = cache.readQuery<getSurvey>({
        query: GET_SURVEY_QUESTIONS,
        variables: {
          input: {
            survey_id,
          },
        },
      });
      if (cachedData?.survey) {
        if (deleteQuestionData) {
          cache.writeQuery({
            query: GET_SURVEY_QUESTIONS,
            variables: {
              input: {
                survey_id,
              },
            },
            data: {
              ...cachedData,
              survey: {
                ...cachedData.survey,
                questions: cachedData?.survey?.questions?.filter(
                  (question) => question.id !== deleteQuestionData.id,
                ),
              },
            },
          });
        }
      }
    } catch (e) {
      return e;
    }
  };

  const deleteAdminUpdate = (cache: ApolloCache<deleteAdminUser>, data?: deleteAdminUser) => {
    const deleteAdminData = data?.deleteAdminUser?.admin;
    const cachedData = cache.readQuery<getAdmins>({
      query: GET_ADMINS,
      variables: {
        input: {
          company_id: localStorage.getItem(COMPANY),
        },
      },
    });
    if (cachedData?.company?.admin_users) {
      if (deleteAdminData) {
        cache.writeQuery({
          query: GET_ADMINS,
          variables: {
            input: {
              company_id: localStorage.getItem(COMPANY),
            },
          },
          data: {
            ...cachedData,
            company: {
              admin_users: cachedData.company.admin_users.filter((admin) => admin.id !== id),
            },
          },
        });
      }
    }
  };

  const deleteUserUpdate = (cache: ApolloCache<deleteUser>, data?: deleteUser) => {
    const deleteUserData = data?.deleteUser?.user;
    const cachedData = cache.readQuery<tabletUsers>({
      query: TABLET_USERS,
      variables: {
        input: {
          company_id: localStorage.getItem(COMPANY),
        },
      },
    });
    if (cachedData?.company?.tablet_users) {
      if (deleteUserData) {
        cache.writeQuery({
          query: TABLET_USERS,
          variables: {
            input: {
              company_id: localStorage.getItem(COMPANY),
            },
          },
          data: {
            ...cachedData,
            company: {
              users: cachedData.company.tablet_users.filter(({ id: userId }) => userId !== id),
            },
          },
        });
      }
    }
  };

  const [
    deleteBranchMutation,
    { error: deleteBranchError, loading: deleteBranchLoading },
  ] = useMutation<deleteBranch>(DELETE_BRANCH, {
    update(cache, { data }) {
      updateQuery(cache, data);
    },
    onCompleted: () => {
      history.push(`/${BRANCH_OFFICES_TEXT}`);
      handleOpen();
    },
  });

  const [
    deleteQuestionMutation,
    { error: deleteQuestionError, loading: deleteQuestionLoading },
  ] = useMutation(DELETE_QUESTION, {
    update(cache, { data: updateData }) {
      deleteQuestionUpdate(cache, updateData);
    },
    onCompleted: handleOpen,
  });

  const [
    deleteSurveyMutation,
    { error: deleteSurveyError, loading: deleteSurveyLoading },
  ] = useMutation(DELETE_SURVEY, {
    update(cache, { data: updateData }) {
      deleteSurveyUpdate(cache, updateData);
    },
    onCompleted: handleOpen,
  });

  const [
    deleteAdminMutation,
    { error: deleteAdminError, loading: deleteAdminLoading },
  ] = useMutation(DELETE_ADMIN, {
    update(cache, { data: updateData }) {
      deleteAdminUpdate(cache, updateData);
    },
    onCompleted: handleOpen,
  });

  const [deleteUserMutation, { error: deleteUserError, loading: deleteUserLoading }] = useMutation(
    DELETE_USER,
    {
      update(cache, { data: updateData }) {
        deleteUserUpdate(cache, updateData);
      },
      onCompleted: handleOpen,
    },
  );

  useSession(
    [
      deleteBranchLoading,
      deleteQuestionLoading,
      deleteSurveyLoading,
      deleteAdminLoading,
      deleteUserLoading,
    ],
    [deleteBranchError, deleteQuestionError, deleteSurveyError, deleteAdminError, deleteUserError],
  );

  const onDelete = async () => {
    if (!hasBeenSubmited) {
      setHasBeenSubmited(true);
      if (type === BRANCH_OFFICE) {
        deleteBranchMutation({
          variables: { input: { id } },
        }).catch((e) => e);
        setHasBeenSubmited(false);
      }
      if (type === QUESTION) {
        deleteQuestionMutation({ variables: { input: { id } } }).catch((e) => e);
        setHasBeenSubmited(false);
      }
      if (type === SURVEY) {
        history.push(`/${SURVEYS_TEXT}`);
        deleteSurveyMutation({ variables: { input: { id } } }).catch((e) => e);
        setHasBeenSubmited(false);
      }
      if (type === ADMINS) {
        handleOpen();
        history.push(`/${ADMINS_TEXT}`);
        deleteAdminMutation({ variables: { input: { id } } }).catch((e) => e);
        setHasBeenSubmited(false);
      }
      if (type === USER) {
        deleteUserMutation({ variables: { input: { id } } }).catch((e) => e);
        setHasBeenSubmited(false);
      }
    }
  };

  useEffect(() => {
    if (
      deleteBranchError ||
      deleteQuestionError ||
      deleteSurveyError ||
      deleteAdminError ||
      deleteUserError
    ) {
      // TODO: handle error
    }
  });

  const renderTitle = () => {
    switch (type) {
      case BRANCH_OFFICE:
        return ARE_YOU_SURE_DELETE_BRANCH;
      case QUESTION:
        return ARE_YOU_SURE_DELETE_QUESTION;
      case SURVEY:
        return ARE_YOU_SURE_DELETE_SURVEY;
      case ADMINS:
        return ARE_YOU_SURE_DELETE_ADMIN;
      case USER:
        return ARE_YOU_SURE_DELETE_USER;
      default:
        return ARE_YOU_SURE_DELETE_BRANCH;
    }
  };

  return (
    <Modal open={isOpen} onClose={handleOpen}>
      <ModalContainer>
        <Title>{renderTitle()}</Title>
        {type === BRANCH_OFFICE && <Text>{YOU_WILL_LOSE_DATA}</Text>}
        <RowContainer>
          <CancelButton onClick={handleOpen} />
          <DeleteButton text={DELETE} onDelete={onDelete} />
        </RowContainer>
      </ModalContainer>
    </Modal>
  );
};

export default ModalComponent;
