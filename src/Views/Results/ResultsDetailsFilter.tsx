/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Dayjs } from 'dayjs';
import { decamelizeKeys } from 'humps';

import { RowContainer, ColumnContainer, Title, Container } from 'Views/BranchOffices/styles';
import useNavigation from 'Utils/navigation';
import {
  RESULTS,
  COMPANY,
  BRANCH_OFFICES,
  AREAS,
  BRANCH_AREA,
  PERIOD,
  DOWNLOAD,
} from 'Utils/constants';
import { useLazyQuery } from '@apollo/client';
import { GET_SURVEY } from 'api/queries';
import PopoverCheckList from 'Components/SelectList/PopoverCheckList';
import { DateRangePicker } from 'Components';
import { company_company_surveys_active_areas } from 'api/__generated__/company';

import useSession from '../../Utils/session';
import { DownloadButton } from '../../Components/common/Buttons';
import { survey } from '../../api/__generated__/survey';
import { FilterTitle, SelectCont, Input, Form, Column, Row, Body, Line } from './styles';

export interface FiltersProps {
  branchArea: company_company_surveys_active_areas[];
  setBranchArea: (branchArea: company_company_surveys_active_areas[]) => void;
  date: [Dayjs | null, Dayjs | null] | null;
  setDate: (date: [Dayjs | null, Dayjs | null] | null) => void;
  question: string;
}

const ResultsDetailFilter = ({
  branchArea,
  setBranchArea,
  date,
  setDate,
  question,
}: FiltersProps) => {
  const [focused, setFocused] = useState(false);
  const [anchorRefBranchAreas, setAnchorRefBranchAreas] = useState<HTMLDivElement | null>(null);
  useNavigation();

  const surveyId = window.location.pathname.split('/')[3];

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

  useSession([loadingSurvey], [surveyError]);

  useEffect(() => {
    getSurvey();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (anchorRefBranchAreas) setAnchorRefBranchAreas(null);
    setFocused(true);
    setAnchorRefBranchAreas(e.currentTarget);
  };

  const handleOutsideClick = () => {
    if (anchorRefBranchAreas) {
      setAnchorRefBranchAreas(null);
      setFocused(false);
      if (!branchArea.length && data?.company?.surveys?.[0]?.active_areas)
        setBranchArea([data?.company?.surveys?.[0]?.active_areas[0]]);
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
    if (!branchArea.length && data?.company?.surveys?.[0]?.active_areas) {
      setBranchArea([data?.company?.surveys?.[0]?.active_areas[0]]);
    }
  }, [data?.company?.surveys?.[0]?.active_areas]);

  if (surveyError || data === undefined) return null;

  const handleDownload = () => {
    // TODO: Add query to download pdf
  };

  return (
    <ColumnContainer className="background start">
      <RowContainer>
        <Container className="min">
          <RowContainer>
            <Title className="small">{RESULTS}</Title>
          </RowContainer>
          <RowContainer className="top space">
            <Title>{question}</Title>
            <DownloadButton disabled text={DOWNLOAD} handleClick={handleDownload} />
          </RowContainer>
        </Container>
      </RowContainer>
      <Row className="wrap">
        <Column>
          <FilterTitle>{BRANCH_AREA}</FilterTitle>
          <Form>
            <SelectCont
              className={focused ? 'focused' : ''}
              onClick={(e) => handleClick(e)}
              open={false}
              displayEmpty
              renderValue={() => renderAreaName()}
              input={<Input />}
              IconComponent={() => <RiArrowDownSLine size="30px" color="#00B642" />}
            />
          </Form>
        </Column>
        {data?.company?.surveys?.[0]?.active_areas && (
          <PopoverCheckList
            data={data?.company?.surveys?.[0]?.active_areas}
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
      <Line />
    </ColumnContainer>
  );
};

export default ResultsDetailFilter;
