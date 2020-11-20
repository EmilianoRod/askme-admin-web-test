/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Dayjs } from 'dayjs';
import { useHistory } from 'react-router-dom';

import {
  SURVEY,
  BRANCH_AREA,
  BRANCH_OFFICES,
  AREAS,
  PERIOD,
  SEE_SUMMARY,
  RESULTS_TEXT,
  DETAILS_TEXT,
} from 'Utils/constants';
import { DateRangePicker } from 'Components';
import PopoverList from 'Components/SelectList/PopoverList';
import PopoverCheckList from 'Components/SelectList/PopoverCheckList';
import {
  company_company_surveys,
  company_company_surveys_active_areas,
} from 'api/__generated__/company';
import { surveys_company_surveys, surveys } from 'api/__generated__/surveys';
import { AddButton } from 'Components/common/Buttons/styles';
import { FilterTitle, SelectCont, Input, Form, Column, Row, Body } from './styles';

export interface FiltersProps {
  survey: company_company_surveys | undefined;
  setSurvey: (survey: company_company_surveys | undefined) => void;
  branchArea: company_company_surveys_active_areas[];
  setBranchArea: (branchArea: company_company_surveys_active_areas[]) => void;
  date: [Dayjs | null, Dayjs | null] | null;
  setDate: (date: [Dayjs | null, Dayjs | null] | null) => void;
  surveysData: surveys;
}

const ResultsFilters = ({
  survey,
  setSurvey,
  branchArea,
  setBranchArea,
  date,
  setDate,
  surveysData,
}: FiltersProps) => {
  const history = useHistory();
  const [focused, setFocused] = useState({ surveys: false, branchAreas: false });
  const [anchorRefSurveys, setAnchorRefSurveys] = useState<HTMLDivElement | null>(null);
  const [anchorRefBranchAreas, setAnchorRefBranchAreas] = useState<HTMLDivElement | null>(null);

  const filterSurveys = () =>
    surveysData.company?.surveys?.filter(
      (aSurvey: surveys_company_surveys) => aSurvey.active_areas && aSurvey.active_areas.length,
    ) as surveys_company_surveys[];

  useEffect(() => {
    if (!survey && surveysData && filterSurveys()) {
      setSurvey(filterSurveys()[0]);
    }
  }, [surveysData]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, isMulti: boolean) => {
    if (isMulti) {
      if (anchorRefBranchAreas) setAnchorRefBranchAreas(null);
      setFocused({ ...focused, branchAreas: true });
      setAnchorRefBranchAreas(e.currentTarget);
    } else {
      if (anchorRefSurveys) setAnchorRefSurveys(null);
      setFocused({ ...focused, surveys: true });
      setAnchorRefSurveys(e.currentTarget);
    }
  };

  const handleOutsideClick = () => {
    if (anchorRefSurveys) {
      setAnchorRefSurveys(null);
      setFocused({ ...focused, surveys: false });
    }
    if (anchorRefBranchAreas) {
      setAnchorRefBranchAreas(null);
      setFocused({ ...focused, branchAreas: false });
      if (!branchArea.length && survey?.active_areas) setBranchArea([survey?.active_areas[0]]);
    }
  };

  const renderAreaName = () =>
    branchArea.length > 1 ? (
      <>
        <Body className="bold lower">
          {branchArea.length} {BRANCH_OFFICES}/{AREAS}
        </Body>
      </>
    ) : (
      branchArea.length > 0 && (
        <>
          <Body className="bold">{branchArea[0]?.branch?.name}</Body>{' '}
          <Body>{branchArea[0]?.name}</Body>
        </>
      )
    );

  useEffect(() => {
    if (!branchArea.length && survey?.active_areas) setBranchArea([survey.active_areas[0]]);
  }, [survey?.active_areas]);

  if (survey === undefined) return null;

  return (
    <Row className="space">
      <Row className="wrap">
        <Column>
          <FilterTitle>{SURVEY}</FilterTitle>
          <Form>
            <SelectCont
              className={focused.surveys ? 'focused' : ''}
              onClick={(e) => handleClick(e, false)}
              open={false}
              displayEmpty
              renderValue={() => survey && <Body>{survey.name}</Body>}
              value={survey && survey.name}
              input={<Input />}
              IconComponent={() => <RiArrowDownSLine size="30px" color="#00B642" />}
            />
          </Form>
        </Column>
        <Column>
          <FilterTitle>{BRANCH_AREA}</FilterTitle>
          <Form>
            <SelectCont
              className={focused.branchAreas ? 'focused' : ''}
              onClick={(e) => handleClick(e, true)}
              open={false}
              displayEmpty
              renderValue={() => renderAreaName()}
              input={<Input />}
              IconComponent={() => <RiArrowDownSLine size="30px" color="#00B642" />}
            />
          </Form>
        </Column>
        {surveysData && (
          <PopoverList
            data={filterSurveys() as surveys_company_surveys[]}
            handleOutsideClick={handleOutsideClick}
            anchorRef={anchorRefSurveys}
            setBranchArea={setBranchArea}
            setSelected={
              setSurvey as (
                item: company_company_surveys | { id: string | number; name: string },
              ) => void
            }
            className=""
          />
        )}
        {survey?.active_areas && (
          <PopoverCheckList
            data={survey?.active_areas}
            handleOutsideClick={handleOutsideClick}
            anchorRef={anchorRefBranchAreas}
            selected={branchArea}
            setSelected={setBranchArea}
          />
        )}
        <Column>
          <FilterTitle>{PERIOD}</FilterTitle>
          <Form>
            <DateRangePicker date={date} setDate={setDate} />
          </Form>
        </Column>
      </Row>
      <AddButton
        className="end"
        onClick={
          () =>
            history.push({
              pathname: `/${RESULTS_TEXT}/${DETAILS_TEXT}/${survey?.id}`,
              state: { date },
            })
          // eslint-disable-next-line react/jsx-curly-newline
        }
      >
        {SEE_SUMMARY}
      </AddButton>
    </Row>
  );
};

export default ResultsFilters;
