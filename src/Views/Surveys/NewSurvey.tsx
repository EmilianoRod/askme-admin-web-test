/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { useMutation, ApolloCache } from '@apollo/client';

import { MainLayout } from 'Layouts';
import Form from 'Components/common/Form';
import {
  SURVEYS_TEXT,
  NEW_SURVEY,
  SAVE,
  NAME_TEXT,
  NAME,
  DETAILS_TEXT,
  COMPANY,
} from 'Utils/constants';
import { CREATE_SURVEY } from 'api/mutations';
import { createSurvey } from 'api/__generated__/createSurvey';
import { surveys } from 'api/__generated__/surveys';
import { COMPANY_SURVEYS } from 'api/queries';
import useNavigation from 'Utils/navigation';

import useSession from '../../Utils/session';
import { Background } from '../BranchOffices/styles';

const NewSurvey = () => {
  const history = useHistory();
  useNavigation();
  const [errorMessage, setErrorMessage] = useState(' ');
  const [hasBeenSubmited, setHasBeenSubmited] = useState(false);

  const updateQuery = (cache: ApolloCache<createSurvey>, data: createSurvey | null | undefined) => {
    const createSurveyData = data?.createSurvey;
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
        if (createSurveyData && createSurveyData.survey) {
          cache.writeQuery({
            query: COMPANY_SURVEYS,
            variables: {
              input: {
                company_id: localStorage.getItem(COMPANY),
              },
            },
            data: {
              ...cachedData,
              company: { surveys: [...cachedData.company.surveys, createSurveyData.survey] },
            },
          });
        }
      }
    } catch (e) {
      return e;
    }
  };

  const [createSurveyMutation, { error: createSurveyError, loading }] = useMutation<createSurvey>(
    CREATE_SURVEY,
    {
      update(cache, { data }) {
        updateQuery(cache, data);
      },
      onCompleted: ({ createSurvey: survey }) => {
        if (survey && !survey.success && survey.errors) {
          setHasBeenSubmited(false);
          setErrorMessage(survey?.errors[0]);
        }
        if (survey && survey.success && survey.survey)
          history.push(`/${SURVEYS_TEXT}/${DETAILS_TEXT}/${survey.survey.id}`);
      },
    },
  );

  useSession([loading], [createSurveyError]);

  const submitForm = async ({ name }: { name: string }) =>
    createSurveyMutation({
      variables: { input: { name, company_id: localStorage.getItem(COMPANY) } },
    }).catch((e) => e);

  const data = [
    {
      name: NAME_TEXT,
      labelText: NAME,
    },
  ];

  const initialValues = {
    name: '',
  };

  useEffect(() => {
    if (createSurveyError) {
      // TODO: handle error
    }
  }, [createSurveyError]);

  return (
    <MainLayout>
      <Background>
        <Form
          data={data}
          onCancel={() => history.push(`/${SURVEYS_TEXT}`)}
          title={NEW_SURVEY}
          submitText={SAVE}
          hasBeenSubmited={hasBeenSubmited}
          setHasBeenSubmited={setHasBeenSubmited}
          schema={yup.object().shape({
            name: yup.string().required(),
          })}
          submitForm={submitForm}
          errorMessage={errorMessage}
          initialValues={initialValues}
          loading={loading}
        />
      </Background>
    </MainLayout>
  );
};

export default NewSurvey;
