/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Dayjs } from 'dayjs';

import {
  ANSWERS_QUANTITY,
  ANSWERS_TOTAL,
  SEE_MORE,
  RESULTS_TEXT,
  DETAILS_TEXT,
  CONTACT_TYPE,
  CONTACT_ESP,
  CONTACT_ES,
} from 'Utils/constants';
import { company_company_surveys_active_areas } from 'api/__generated__/company';
import { QuestionsAnswers } from 'api/__generated__/questionsAnswers';
import { Row, FlexColumn, QuestionText, TextCard, SeeMoreLink, Body } from './styles';

export interface TextChartProps {
  data: QuestionsAnswers;
  branchArea: company_company_surveys_active_areas[];
  surveyId?: string;
  date: [Dayjs | null, Dayjs | null] | null;
}

const ContactChart = ({ data, branchArea, surveyId, date }: TextChartProps) => {
  const history = useHistory();
  const questions = data?.questionsAnswers;
  const contactQuestions = questions?.filter(({ type }) => type === CONTACT_TYPE);

  const answersOneArea = (areaToCount: company_company_surveys_active_areas) => {
    let counter = 0;
    contactQuestions?.map(({ areas }) => {
      return areas.map((area) => {
        if (areaToCount.id === area.area.id) {
          counter += area.total;
        }
      });
    });
    return counter;
  };

  return contactQuestions?.length && contactQuestions?.length > 0 ? (
    <Row className="wrap">
      <FlexColumn className="padding">
        <QuestionText>{CONTACT_ESP}</QuestionText>
        <TextCard>
          <FlexColumn>
            <Body className="marginBottom">
              {branchArea.length > 1 ? ANSWERS_QUANTITY : ANSWERS_TOTAL}
            </Body>
            {branchArea.length === 1 && (
              <Body className="large bold">{answersOneArea(branchArea[0])}</Body>
            )}
            {branchArea.length > 1 && (
              <FlexColumn>
                {branchArea.map((area) => (
                  <>
                    <Row className="space">
                      <Row className="contact">
                        <Body>{`${area?.branch?.name} ${area?.name}`}</Body>
                      </Row>
                      <Body className="bold">{`: ${answersOneArea(area)}`}</Body>
                    </Row>
                  </>
                ))}
              </FlexColumn>
            )}
          </FlexColumn>
          <SeeMoreLink
            onClick={() => {
              history.push({
                pathname: `/${RESULTS_TEXT}/${DETAILS_TEXT}/${surveyId}/${CONTACT_ES}`,
                state: { date },
              });
            }}
          >
            {SEE_MORE}
          </SeeMoreLink>
        </TextCard>
      </FlexColumn>
    </Row>
  ) : null;
};

export default ContactChart;
