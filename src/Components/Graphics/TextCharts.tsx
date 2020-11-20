import React from 'react';
import { useHistory } from 'react-router-dom';
import { Dayjs } from 'dayjs';

import {
  TEXT_TYPE,
  ANSWERS_QUANTITY,
  ANSWERS_TOTAL,
  SEE_MORE,
  TEXT,
  RESULTS_TEXT,
  DETAILS_TEXT,
} from 'Utils/constants';
import { company_company_surveys_active_areas } from 'api/__generated__/company';
import {
  QuestionsAnswers,
  QuestionsAnswers_questionsAnswers_areas,
} from 'api/__generated__/questionsAnswers';
import { Row, FlexColumn, QuestionText, TextCard, SeeMoreLink, Body } from './styles';

export interface TextChartProps {
  data: QuestionsAnswers;
  branchArea: company_company_surveys_active_areas[];
  surveyId?: string;
  date: [Dayjs | null, Dayjs | null] | null;
}

const TextCharts = ({ data, branchArea, surveyId, date }: TextChartProps) => {
  const history = useHistory();
  const questions = data?.questionsAnswers;
  const textQuestions = questions?.filter(({ type }) => type === TEXT_TYPE);
  const findAreaById = (area: QuestionsAnswers_questionsAnswers_areas) =>
    branchArea.find((aBranchArea) => aBranchArea.id === area.area.id);

  return (
    <Row className="wrap">
      {textQuestions &&
        textQuestions.map(({ areas, text, id }) => (
          <FlexColumn key={text} className="padding">
            <QuestionText>{text}</QuestionText>
            <TextCard>
              <FlexColumn>
                <Body className="marginBottom">
                  {areas && areas.length > 1 ? ANSWERS_QUANTITY : ANSWERS_TOTAL}
                </Body>
                {areas && areas.length === 1 && (
                  <Body className="large bold">{areas[0]?.total}</Body>
                )}
                {areas && areas.length > 1 && (
                  <FlexColumn>
                    {areas.map((area) => (
                      <>
                        <Row className="space">
                          <Row className="contact">
                            <Body>
                              {`${findAreaById(area)?.branch?.name} ${findAreaById(area)?.name}`}
                            </Body>
                          </Row>
                          <Body className="bold">{`: ${area?.total}`}</Body>
                        </Row>
                      </>
                    ))}
                  </FlexColumn>
                )}
              </FlexColumn>
              <SeeMoreLink
                onClick={() => {
                  history.push({
                    pathname: `/${RESULTS_TEXT}/${DETAILS_TEXT}/${surveyId}/${TEXT}/${id}`,
                    state: { date },
                  });
                }}
              >
                {SEE_MORE}
              </SeeMoreLink>
            </TextCard>
          </FlexColumn>
        ))}
    </Row>
  );
};

export default TextCharts;
