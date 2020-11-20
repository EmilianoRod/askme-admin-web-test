/* eslint-disable react/prop-types */
import React, { useState, useEffect, useMemo } from 'react';
import { Dayjs } from 'dayjs';

import { company_company_surveys_active_areas } from 'api/__generated__/company';
import { QuestionsAnswers_questionsAnswers } from 'api/__generated__/questionsAnswers';
import { useHistory } from 'react-router-dom';
import {
  LINE,
  DOUGHNUT,
  BAR,
  MULTIPLE_CHOICE,
  SEE_MORE,
  RESULTS_TEXT,
  DETAILS_TEXT,
  SCALE_TYPE,
  FACE_TYPE,
  MULTIPLE_CHOICE_TYPE,
  NO_ANSWERS,
  PERIOD,
} from '../../Utils/constants';
import {
  Container,
  Label,
  Icon,
  Question,
  Card,
  RowContainer,
  Button,
  SeeMoreLink,
  ColumnContainer,
} from './styles';
import {
  LineIcon,
  BarIcon,
  DoughnutIcon,
  LineWhiteIcon,
  BarWhiteIcon,
  DoughnutWhiteIcon,
} from '../../Assets/Images';
import Chart from './Chart';

export interface ChartCardProps {
  questionSurvey: QuestionsAnswers_questionsAnswers;
  questionType: string;
  index: number;
  branchAreas: company_company_surveys_active_areas[];
  details?: boolean;
  surveyId?: string;
  date?: [Dayjs | null, Dayjs | null] | null;
}

export type ChartType = typeof LINE | typeof DOUGHNUT | typeof BAR | typeof MULTIPLE_CHOICE;

const ChartCard = ({
  questionSurvey,
  questionType,
  index,
  branchAreas,
  details,
  surveyId,
  date,
}: ChartCardProps) => {
  const { text, areas, id } = questionSurvey;
  const history = useHistory();
  const [selectedChart, setSelectedChart] = useState<ChartType>(LINE);
  useEffect(() => {
    if (questionType === MULTIPLE_CHOICE_TYPE) {
      setSelectedChart(MULTIPLE_CHOICE);
    } else if (questionType === FACE_TYPE) {
      if (branchAreas?.length > 1) {
        setSelectedChart(DOUGHNUT);
      } else if (branchAreas?.length === 1) {
        setSelectedChart(BAR);
      }
    }
  }, []);
  const area = useMemo(
    () =>
      branchAreas.find((branchArea) => areas && areas[0] && branchArea?.id === areas[0]?.area?.id),
    [areas, branchAreas],
  );

  useEffect(() => {
    if (branchAreas.length > 1 && details) setSelectedChart(LINE);
  }, [branchAreas]);

  const renderIcon = (iconName: ChartType, srcWhite: string, src: string) =>
    selectedChart === iconName ? (
      <Button>
        <Icon src={srcWhite} />
      </Button>
    ) : (
      <Icon onClick={() => setSelectedChart(iconName)} src={src} />
    );

  const setClassName = () => {
    let name = '';
    if (details) return 'big details';
    if (index % 2 === 0) name += 'margin ';
    if (
      (branchAreas?.length <= 4 && areas[0].data && areas[0].data.length < 13) ||
      !areas.some((anArea) => anArea.total)
    )
      name += 'small';
    return name;
  };

  const renderIconsDependingOnQuestionType = () => {
    switch (questionType) {
      case FACE_TYPE:
        if (branchAreas?.length === 1)
          return (
            <RowContainer className="icons small">
              {renderIcon(BAR, BarWhiteIcon, BarIcon)}
              {renderIcon(LINE, LineWhiteIcon, LineIcon)}
            </RowContainer>
          );

        return (
          <RowContainer className={details ? 'hidden' : 'icons small'}>
            {renderIcon(DOUGHNUT, DoughnutWhiteIcon, DoughnutIcon)}
            {renderIcon(LINE, LineWhiteIcon, LineIcon)}
          </RowContainer>
        );
      case SCALE_TYPE:
        return !details ? (
          <RowContainer className="icons small">
            {renderIcon(LINE, LineWhiteIcon, LineIcon)}
            {renderIcon(DOUGHNUT, DoughnutWhiteIcon, DoughnutIcon)}
          </RowContainer>
        ) : null;
      default:
        return <div />;
    }
  };

  return (
    <Container className={setClassName()}>
      {!details && <Question>{text}</Question>}
      <Card className={selectedChart === DOUGHNUT || details ? 'big ' : ''}>
        <RowContainer
          className={
            selectedChart === LINE ||
            (selectedChart === DOUGHNUT && branchAreas?.length > 1) ||
            (selectedChart === MULTIPLE_CHOICE && branchAreas?.length > 1)
              ? 'line'
              : 'space'
          }
        >
          {branchAreas?.length === 1 && (
            <RowContainer
              className={selectedChart === (LINE || DOUGHNUT) || details ? 'hidden' : ''}
            >
              <Label className="bold">{area?.branch?.name}</Label>
              <Label>{area?.name}</Label>
            </RowContainer>
          )}
          <RowContainer>
            {renderIconsDependingOnQuestionType()}
            {!details && (
              <SeeMoreLink
                className="center"
                onClick={() => {
                  history.push({
                    pathname: `/${RESULTS_TEXT}/${DETAILS_TEXT}/${surveyId}/${id}`,
                    state: { date, branchAreas },
                  });
                }}
              >
                {SEE_MORE}
              </SeeMoreLink>
            )}
          </RowContainer>
        </RowContainer>
        <RowContainer className="charts">
          {areas && areas.some((ar) => ar.total) ? (
            <Chart
              details={details}
              selectedChart={selectedChart}
              data={areas}
              areas={branchAreas}
              type={questionType}
            />
          ) : (
            <ColumnContainer className="center">
              <Label className="answers">{NO_ANSWERS}</Label>
              <Label className="answers lowerCase">{PERIOD}</Label>
            </ColumnContainer>
          )}
        </RowContainer>
      </Card>
    </Container>
  );
};

export default ChartCard;
