import React, { useState, useEffect } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { decamelizeKeys } from 'humps';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery, useLazyQuery } from '@apollo/client';
import { Table, TableBody } from '@material-ui/core';
import { BeatLoader } from 'react-spinners';

import { MainLayout } from 'Layouts';
import { RowContainer, BackButton, ColumnContainer } from 'Views/BranchOffices/styles';
import { RESULTS_TEXT, COMPANY, NO_ANSWERS, PERIOD, GO_BACK, DATE } from 'Utils/constants';
import { company_company_surveys_active_areas } from 'api/__generated__/company';
import { Back } from 'Assets/Images';
import { GET_SURVEY, SURVEY_ANSWERS, SURVEY_PDF } from 'api/queries';
import { survey } from 'api/__generated__/survey';
import TableHeader from 'Components/TableElements/TableHeader';
import SummaryRow from 'Components/TableElements/SummaryRow';
import {
  surveyAnswers_surveyAnswers_answers,
  surveyAnswers_surveyAnswers,
} from 'api/__generated__/surveyAnswers';
import theme from 'theme';

import useSession from '../../Utils/session';
import { Background, TextAnswersTable } from './styles';
import TextDetailsFilters from './TextDetailsFilters';
import { Label as NoAnswersLabel } from '../../Components/Charts/styles';

const SurveySummary = () => {
  const location = useLocation<{ date: any }>();
  const [date, setDate] = useState<[Dayjs | null, Dayjs | null] | null>([dayjs(), dayjs()]);
  const [branchArea, setBranchArea] = useState<company_company_surveys_active_areas>();
  const [width, setWidth] = useState(window.innerWidth);
  const history = useHistory();
  const surveyId = window.location.pathname.split('/')[3];
  const selectedDate = location.state?.date;
  const widths = ['5%'];
  const fields = [''];

  const { data, error: surveyError, loading: loadingSurvey } = useQuery<survey>(GET_SURVEY, {
    variables: {
      input: decamelizeKeys({
        companyId: localStorage.getItem(COMPANY),
      }),
      id: surveyId,
    },
  });

  const [getPDF, { data: pdfData, error: pdfError, loading: loadingPdf }] = useLazyQuery(
    SURVEY_PDF,
  );

  const [getSurveySummary, { data: summaryData, error, loading }] = useLazyQuery(SURVEY_ANSWERS);

  useSession([loading, loadingSurvey, loadingPdf], [surveyError, pdfError, error]);

  useEffect(() => {
    if (selectedDate) setDate([dayjs(selectedDate[0].$d), dayjs(selectedDate[1].$d)]);
  }, []);

  useEffect(() => {
    if (data?.company?.surveys?.[0]?.active_areas) {
      setBranchArea(data?.company?.surveys?.[0]?.active_areas[0]);
    }
  }, [data?.company?.surveys?.[0]?.active_areas]);

  useEffect(() => {
    getSurveySummary({
      variables: {
        input: {
          survey_id: surveyId,
          area_id: branchArea?.id,
          start_date: date?.[0]?.format('DD/MM/YYYY'),
          end_date: date?.[1]?.format('DD/MM/YYYY'),
        },
      },
    });
    getPDF({
      variables: {
        input: {
          survey_id: surveyId,
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

  if (surveyError || error) return null;

  const formatDate = (dateToFormat?: string) => dayjs(dateToFormat);

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
                    state: { survey: data?.company?.surveys?.[0], branchArea: [branchArea], date },
                  })
                // eslint-disable-next-line react/jsx-curly-newline
              }
            >
              <img src={Back} alt={GO_BACK} />
            </BackButton>
            <TextDetailsFilters
              branchArea={branchArea}
              setBranchArea={setBranchArea}
              date={date}
              setDate={setDate}
              question={data?.company?.surveys?.[0].name as string}
              href={pdfData?.surveyAnswersSummary?.summary}
            />
          </RowContainer>
        )}
        {!loading && summaryData && summaryData.surveyAnswers.length ? (
          <TextAnswersTable className="height">
            <Table>
              <TableHeader
                fields={[
                  ...fields,
                  summaryData.surveyAnswers[0].answers.map(
                    ({ question }: surveyAnswers_surveyAnswers_answers) => question?.text,
                  ),
                  DATE,
                ].flat()}
                widths={[
                  ...widths,
                  summaryData.surveyAnswers[0].answers.map(
                    () => `${95 / (summaryData.surveyAnswers[0].answers.length + 1)}%`,
                  ),
                ].flat()}
              />
              <TableBody>
                {summaryData &&
                  summaryData.surveyAnswers &&
                  summaryData.surveyAnswers
                    .slice()
                    .sort(
                      (
                        answer1: surveyAnswers_surveyAnswers,
                        answer2: surveyAnswers_surveyAnswers,
                      ) => {
                        const date1 = formatDate(answer1?.answers?.[0].answer?.answered_at);
                        const date2 = formatDate(answer2?.answers?.[0].answer?.answered_at);
                        return date2.diff(date1);
                      },
                    )
                    .map((answer: surveyAnswers_surveyAnswers) => (
                      <SummaryRow key={answer?.group_id as string} answer={answer} width={width} />
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

export default SurveySummary;
