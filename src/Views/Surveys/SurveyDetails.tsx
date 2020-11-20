import React, { useEffect } from 'react';
import { decamelizeKeys } from 'humps';
import { useQuery } from '@apollo/client';

import { MainLayout } from 'Layouts';
import { GET_SURVEY_QUESTIONS } from 'api/queries';
import { getSurvey } from 'api/__generated__/getSurvey';

import useSession from '../../Utils/session';
import SurveyDetailsNoQuestions from '../../Components/DetailsPage/SurveyDetailsNoQuestion';
import SurveyDetailsQuestions from '../../Components/DetailsPage/SurveyDetailsQuestions';

const SurveyDetails = () => {
  const surveyId = window.location.pathname.split('/')[3];

  const { data, loading, error } = useQuery<getSurvey>(GET_SURVEY_QUESTIONS, {
    variables: {
      input: decamelizeKeys({
        surveyId,
      }),
    },
  });

  useSession([loading], [error]);

  useEffect(() => {
    if (error) {
      // TODO: handleError
    }
  });

  return (
    <MainLayout>
      {!loading && data?.survey?.questions && data.survey.questions.length > 0 ? (
        <SurveyDetailsQuestions
          loading={loading}
          name={data.survey.name}
          id={surveyId}
          questions={data.survey.questions}
        />
      ) : (
        <SurveyDetailsNoQuestions loading={loading} name={data?.survey?.name} id={surveyId} />
      )}
    </MainLayout>
  );
};

export default SurveyDetails;
