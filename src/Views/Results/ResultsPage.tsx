import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useHistory, useLocation } from 'react-router-dom';
import { decamelizeKeys } from 'humps';
import { BeatLoader } from 'react-spinners';

import {
  RESULTS,
  NO_SURVEYS,
  ADD_SURVEY,
  CONTACT_TYPE,
  TEXT_TYPE,
  SURVEYS_TEXT,
  NEW_TEXT,
  COMPANY,
} from 'Utils/constants';
import { QuestionsAnswers } from 'api/__generated__/questionsAnswers';
import ChartCard from 'Components/Charts/ChartCard';
import { GET_QUESTIONS_ANSWERS, COMPANY_SURVEYS } from 'api/queries';
import {
  company_company_surveys,
  company_company_surveys_active_areas,
} from 'api/__generated__/company';
import useNavigation from 'Utils/navigation';
import { AddButton } from 'Components/common/Buttons';
import TextCharts from 'Components/Graphics/TextCharts';
import ContactChart from 'Components/Graphics/ContactChart';

import useSession from '../../Utils/session';
import MainLayout from '../../Layouts/mainLayout';
import { Title, Background, NoResultsBackground, Body, Row } from './styles';
import ResultsFilters from './ResultsFilters';
import { NoArea } from '../../Assets/Images';
import theme from '../../theme';

const ResultsPage = () => {
  const history = useHistory();
  const location = useLocation<{
    date: any;
    survey: company_company_surveys;
    branchArea: company_company_surveys_active_areas[];
  }>();
  const selectedDate = location.state?.date;
  const selectedSurvey = location.state?.survey;
  const selectedBranchArea = location.state?.branchArea;
  const [date, setDate] = useState<[Dayjs | null, Dayjs | null] | null>([dayjs(), dayjs()]);
  const [survey, setSurvey] = useState<company_company_surveys | undefined>();
  const [branchArea, setBranchArea] = useState<company_company_surveys_active_areas[]>([]);
  useNavigation();

  useEffect(() => {
    if (selectedDate) setDate([dayjs(selectedDate[0].$d), dayjs(selectedDate[1].$d)]);
    if (selectedSurvey) setSurvey(selectedSurvey);
    if (selectedBranchArea) setBranchArea(selectedBranchArea);
  }, []);

  const [getQuestions, { data, loading, error }] = useLazyQuery<QuestionsAnswers>(
    GET_QUESTIONS_ANSWERS,
    {
      fetchPolicy: 'no-cache',
    },
  );

  const { data: surveys, error: surveysError, loading: loadingSurveys } = useQuery(
    COMPANY_SURVEYS,
    {
      variables: {
        input: decamelizeKeys({
          companyId: localStorage.getItem(COMPANY),
        }),
      },
    },
  );

  useSession([loading, loadingSurveys], [error, surveysError]);

  useEffect(() => {
    if (survey && branchArea.length > 0 && date) {
      getQuestions({
        variables: {
          input: {
            survey_id: survey?.id,
            area_id: branchArea.map((area) => area?.id),
            start_date: date?.[0]?.format('DD/MM/YYYY'),
            finish_date: date?.[1]?.format('DD/MM/YYYY'),
          },
        },
      });
    }
  }, [survey, branchArea, date]);

  const renderNoSurveysScreen = () =>
    loadingSurveys ? (
      <NoResultsBackground>
        <BeatLoader color={theme.palette.primary[75]} />
      </NoResultsBackground>
    ) : (
      <NoResultsBackground>
        <img alt={NO_SURVEYS} src={NoArea} />
        <Body className="bold margin">{NO_SURVEYS}</Body>
        <AddButton
          loading={false}
          text={ADD_SURVEY}
          handleClick={() => history.push(`/${SURVEYS_TEXT}/${NEW_TEXT}`)}
        />
      </NoResultsBackground>
    );

  const renderCharts = () => {
    const filteredQuestions = data?.questionsAnswers?.filter(
      (question) => question.type !== CONTACT_TYPE && question.type !== TEXT_TYPE,
    );
    return filteredQuestions?.map((question, index) => (
      <ChartCard
        key={index}
        questionSurvey={question}
        index={index}
        questionType={question.type}
        branchAreas={branchArea}
        surveyId={survey?.id}
        date={date}
      />
    ));
  };

  return (
    <MainLayout>
      <Background>
        <Title>{RESULTS}</Title>
        <ResultsFilters
          survey={survey}
          setSurvey={setSurvey}
          branchArea={branchArea}
          setBranchArea={setBranchArea}
          date={date}
          setDate={setDate}
          surveysData={surveys}
        />
        <Row className="cards">{!loading && renderCharts()}</Row>
        <Row className="start">
          <span style={{ marginRight: 60 }}>
            {data && TextCharts({ data, branchArea, surveyId: survey?.id, date })}
          </span>
          <span>{data && ContactChart({ data, branchArea, surveyId: survey?.id, date })}</span>
        </Row>
        {!survey && renderNoSurveysScreen()}
      </Background>
    </MainLayout>
  );
};
export default ResultsPage;
