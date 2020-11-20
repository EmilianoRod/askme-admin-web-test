/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { decamelizeKeys } from 'humps';
import { useHistory, useLocation } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import { BeatLoader } from 'react-spinners';

import { Background, RowContainer, BackButton, ColumnContainer } from 'Views/BranchOffices/styles';
import { Back } from 'Assets/Images';
import useNavigation from 'Utils/navigation';
import {
  RESULTS_TEXT,
  COMPANY,
  DOUGHNUT,
  TOTAL_ANSWERS,
  FACE_TYPE,
  RESP,
  NO_ANSWERS,
  PERIOD,
  MULTIPLE_CHOICE_TYPE,
  MULTIPLE_CHOICE,
  SCALE_TYPE,
  GO_BACK,
} from 'Utils/constants';
import { MainLayout } from 'Layouts';
import { GET_SURVEY, GET_QUESTIONS_ANSWERS, GET_QUESTION } from 'api/queries';
import { company_company_surveys_active_areas } from 'api/__generated__/company';
import Chart from 'Components/Charts/Chart';
import ChartCard from 'Components/Charts/ChartCard';
import theme from 'theme';
import {
  QuestionsAnswers,
  QuestionsAnswers_questionsAnswers,
  QuestionsAnswers_questionsAnswers_areas_data_data_answers_answers,
} from 'api/__generated__/questionsAnswers';
import { getQuestion } from 'api/__generated__/getQuestion';

import useSession from '../../Utils/session';
import { survey } from '../../api/__generated__/survey';
import ResultsDetailFilter from './ResultsDetailsFilter';
import { CardContainer, Label, FlexColumn, Square, DetailsContainer } from './styles';
import { Label as NoAnswersLabel } from '../../Components/Charts/styles';

const ResultsDetail = () => {
  const [question, setQuestion] = useState<QuestionsAnswers_questionsAnswers>();
  const [date, setDate] = useState<[Dayjs | null, Dayjs | null] | null>([dayjs(), dayjs()]);
  const [branchArea, setBranchArea] = useState<company_company_surveys_active_areas[]>([]);
  const history = useHistory();
  const location = useLocation<{
    date: any;
    branchAreas: company_company_surveys_active_areas[];
  }>();
  const selectedDate = location.state?.date;
  const selectedBranchArea = location.state?.branchAreas;
  const [uniqueArea, setUniqueArea] = useState(
    question?.areas.filter((area) => area.total > 0).length === 1,
  );
  useNavigation();

  const surveyId = window.location.pathname.split('/')[3];
  const questionId = window.location.pathname.split('/')[4];

  const [getSurvey, { data, error: surveyError, loading: loadingSurvey }] = useLazyQuery<survey>(
    GET_SURVEY,
    {
      variables: {
        input: decamelizeKeys({
          companyId: localStorage.getItem(COMPANY),
        }),
        id: surveyId,
      },
    },
  );

  useEffect(() => {
    getSurvey();
    if (selectedDate) setDate([dayjs(selectedDate[0].$d), dayjs(selectedDate[1].$d)]);
    if (selectedBranchArea) setBranchArea(selectedBranchArea);
  }, []);

  useEffect(() => {
    setUniqueArea(question?.areas.filter((area) => area.total > 0).length === 1);
  }, [question]);

  useEffect(() => {
    if (!branchArea.length && data?.company?.surveys?.[0]?.active_areas) {
      setBranchArea([data?.company?.surveys?.[0]?.active_areas[0]]);
    }
  }, [data?.company?.surveys?.[0]?.active_areas]);

  const [getQuestions, { data: questionsData, error, loading }] = useLazyQuery<QuestionsAnswers>(
    GET_QUESTIONS_ANSWERS,
    {
      fetchPolicy: 'no-cache',
    },
  );

  const { data: questionData, error: questionError, loading: loadingQuestion } = useQuery<
    getQuestion
  >(GET_QUESTION, {
    variables: {
      input: {
        survey_id: surveyId,
      },
      id: questionId,
    },
  });

  useSession([loading, loadingQuestion, loadingSurvey], [surveyError, error, questionError]);

  useEffect(() => {
    if (branchArea.length > 0 && date) {
      getQuestions({
        variables: {
          input: {
            survey_id: surveyId,
            area_id: branchArea.map((area) => area?.id),
            start_date: date?.[0]?.format('DD/MM/YYYY'),
            finish_date: date?.[1]?.format('DD/MM/YYYY'),
          },
        },
      });
    }
  }, [branchArea, date]);

  useEffect(() => {
    if (questionsData)
      setQuestion(
        questionsData?.questionsAnswers?.find((aQuestion) => aQuestion.id === questionId),
      );
  }, [questionsData]);

  if (surveyError) return null;

  const getColorFromPalette = (
    type: string,
    answer: QuestionsAnswers_questionsAnswers_areas_data_data_answers_answers,
    id: number,
  ) => {
    switch (type) {
      case FACE_TYPE:
        return theme.palette.faces[parseInt(answer.value as string, 10) - 1];
      case SCALE_TYPE:
        return theme.palette.scale[parseInt(answer.value as string, 10)];
      case MULTIPLE_CHOICE_TYPE:
        return theme.palette.charts[id];
      default:
        return theme.palette.faces[parseInt(answer.value as string, 10) - 1];
    }
  };

  const renderColorReference = (type: string) => {
    let colorIndex = 0;
    const colors: { id: string; color: string; value: number }[] = [];
    question?.areas.forEach((area) => {
      area.data?.forEach((day) => {
        day?.data_answers?.answers?.forEach((answer) => {
          if (
            !colors.some((color) => color.id === answer.value) &&
            answer.value &&
            answer.quantity
          ) {
            colors.push({
              id: answer.value,
              color: getColorFromPalette(type, answer, colorIndex),
              value: answer.quantity,
            });
            colorIndex += 1;
          } else {
            colors.forEach((color) => {
              if (color.id === answer.value && answer.quantity) color.value += answer.quantity;
            });
          }
        });
      });
    });
    return colors
      .sort((color1, color2) => parseInt(color2.id, 10) - parseInt(color1.id, 10))
      .map((aColor) => (
        <RowContainer className="top center reference" key={aColor.color}>
          <Square
            style={{
              backgroundColor: aColor.color,
            }}
          />
          <RowContainer className="wrap">
            <Label className="small bold">{aColor.id}</Label>
            <Label className="small ">{`${aColor.value} ${RESP}`}</Label>
          </RowContainer>
        </RowContainer>
      ));
  };

  return (
    <MainLayout>
      <Background>
        {loadingSurvey ? (
          <RowContainer className="full center">
            <BeatLoader color={theme.palette.primary[75]} />
          </RowContainer>
        ) : (
          <RowContainer>
            <BackButton
              className="details"
              onClick={
                () =>
                  history.push({
                    pathname: `/${RESULTS_TEXT}`,
                    state: { date, survey: data?.company?.surveys?.[0], branchArea },
                  })
                // eslint-disable-next-line react/jsx-curly-newline
              }
            >
              <img src={Back} alt={GO_BACK} />
            </BackButton>
            <ColumnContainer>
              {questionData && questionData.survey && questionData.survey.questions && (
                <ResultsDetailFilter
                  branchArea={branchArea}
                  setBranchArea={setBranchArea}
                  date={date}
                  setDate={setDate}
                  question={questionData.survey.questions[0].text}
                />
              )}
              {!loading && branchArea.length && question?.areas.some((area) => area.total > 0) ? (
                <>
                  <CardContainer className={question.type === MULTIPLE_CHOICE_TYPE ? 'hidden' : ''}>
                    {question.type !== MULTIPLE_CHOICE_TYPE && (
                      <ChartCard
                        questionSurvey={question}
                        index={0}
                        questionType={question.type}
                        branchAreas={branchArea}
                        details
                      />
                    )}
                  </CardContainer>
                  <CardContainer className="margin">
                    <RowContainer className="doughnut center">
                      {question && uniqueArea && (
                        <FlexColumn>
                          <Label className="answers">{TOTAL_ANSWERS}</Label>
                          <Label className="big">
                            {question.areas.find(({ total }) => total > 0)?.total}
                          </Label>
                        </FlexColumn>
                      )}
                      {question && (
                        <DetailsContainer className={uniqueArea ? 'unique' : 'doughnut'}>
                          <Chart
                            selectedChart={
                              question.type === MULTIPLE_CHOICE_TYPE ? MULTIPLE_CHOICE : DOUGHNUT
                            }
                            data={question.areas}
                            areas={branchArea}
                            type={question.type}
                            details
                          />
                        </DetailsContainer>
                      )}
                    </RowContainer>
                    {question && (
                      <FlexColumn className="colors doughnut">
                        {renderColorReference(question.type)}
                      </FlexColumn>
                    )}
                  </CardContainer>
                </>
              ) : (
                <>
                  {loading ? (
                    <RowContainer className="full center">
                      <BeatLoader color={theme.palette.primary[75]} />
                    </RowContainer>
                  ) : (
                    <ColumnContainer className="center margin">
                      <NoAnswersLabel className="answers">{NO_ANSWERS}</NoAnswersLabel>
                      <NoAnswersLabel className="answers lowerCase">{PERIOD}</NoAnswersLabel>
                    </ColumnContainer>
                  )}
                </>
              )}
            </ColumnContainer>
          </RowContainer>
        )}
      </Background>
    </MainLayout>
  );
};

export default ResultsDetail;
