import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { Table, TableBody } from '@material-ui/core';
import { decamelizeKeys } from 'humps';
import { useHistory, useLocation } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import { BeatLoader } from 'react-spinners';

import { MainLayout } from 'Layouts';
import { RowContainer, BackButton, ColumnContainer } from 'Views/BranchOffices/styles';
import {
  RESULTS_TEXT,
  COMPANY,
  CONTACT_ESP,
  ANSWER,
  DATE,
  NO_ANSWERS,
  PERIOD,
  GO_BACK,
} from 'Utils/constants';
import { company_company_surveys_active_areas } from 'api/__generated__/company';
import { Back } from 'Assets/Images';
import { GET_SURVEY, TEXT_ANSWERS, GET_QUESTION } from 'api/queries';
import { survey } from 'api/__generated__/survey';
import TableHeader from 'Components/TableElements/TableHeader';
import { textAnswers_textAnswers } from 'api/__generated__/textAnswers';
import TextQuestionRow from 'Components/TableElements/TextQuestionRow';
import theme from 'theme';

import useSession from '../../Utils/session';
import { Background, TextAnswersTable } from './styles';
import TextDetailsFilters from './TextDetailsFilters';
import { Label as NoAnswersLabel } from '../../Components/Charts/styles';

const TEXT_DETAIL_FIELDS = ['', ANSWER, CONTACT_ESP, DATE];
const WIDTHS = ['5%', '45%', '25%', '25%'];

const TextDetail = () => {
  const location = useLocation<{ date: any }>();
  const [date, setDate] = useState<[Dayjs | null, Dayjs | null] | null>([dayjs(), dayjs()]);
  const [branchArea, setBranchArea] = useState<company_company_surveys_active_areas>();
  const [width, setWidth] = useState(window.innerWidth);
  const history = useHistory();
  const selectedDate = location.state?.date;
  const surveyId = window.location.pathname.split('/')[3];
  const questionId = window.location.pathname.split('/')[5];

  const { data: questionData, error: questionError, loading: questionLoading } = useQuery(
    GET_QUESTION,
    {
      variables: { input: { survey_id: surveyId }, id: questionId },
    },
  );

  const { data, error: surveyError, loading: loadingSurvey } = useQuery<survey>(GET_SURVEY, {
    variables: {
      input: decamelizeKeys({
        companyId: localStorage.getItem(COMPANY),
      }),
      id: surveyId,
    },
  });

  const [textAnswers, { data: questionAnswer, error, loading }] = useLazyQuery(TEXT_ANSWERS);

  useSession([loading, loadingSurvey, questionLoading], [error, surveyError, questionError]);

  useEffect(() => {
    if (selectedDate) setDate([dayjs(selectedDate[0].$d), dayjs(selectedDate[1].$d)]);
  }, []);

  useEffect(() => {
    if (data?.company?.surveys?.[0]?.active_areas) {
      setBranchArea(data?.company?.surveys?.[0]?.active_areas[0]);
    }
  }, [data?.company?.surveys?.[0]?.active_areas]);

  useEffect(() => {
    textAnswers({
      variables: {
        input: {
          survey_id: surveyId,
          question_id: questionId,
          area_id: branchArea?.id,
          start_date: date?.[0]?.format('DD/MM/YYYY'),
          end_date: date?.[1]?.format('DD/MM/YYYY'),
        },
      },
    });
  }, [branchArea, date]);

  useEffect(() => {
    window.addEventListener('resize', () => setWidth(window.innerWidth));
  }, []);

  if (surveyError) return null;

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
              onClick={() => history.push({ pathname: `/${RESULTS_TEXT}`, state: { date } })}
            >
              <img src={Back} alt={GO_BACK} />
            </BackButton>
            {questionData && (
              <TextDetailsFilters
                branchArea={branchArea}
                setBranchArea={setBranchArea}
                date={date}
                setDate={setDate}
                question={questionData.survey.questions[0].text}
              />
            )}
          </RowContainer>
        )}
        {!loading && questionAnswer && questionAnswer.textAnswers.length ? (
          <TextAnswersTable>
            <Table>
              <TableHeader fields={TEXT_DETAIL_FIELDS} widths={WIDTHS} />
              <TableBody>
                {questionAnswer &&
                  questionAnswer.textAnswers &&
                  questionAnswer.textAnswers.map((answer: textAnswers_textAnswers) => (
                    <TextQuestionRow key={answer.group_id} answer={answer} windowWidth={width} />
                  ))}
              </TableBody>
            </Table>
          </TextAnswersTable>
        ) : (
          <>
            {loading && !loadingSurvey ? (
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
      </Background>
    </MainLayout>
  );
};

export default TextDetail;
