/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState, ReactText, useCallback } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';
import { Dayjs } from 'dayjs';
import { decamelizeKeys } from 'humps';

import { RowContainer, ColumnContainer, Title, Container } from 'Views/BranchOffices/styles';
import useNavigation from 'Utils/navigation';
import { RESULTS, COMPANY, BRANCH_AREA, PERIOD, DOWNLOAD, AREA } from 'Utils/constants';
import { useLazyQuery } from '@apollo/client';
import { GET_SURVEY } from 'api/queries';
import { DateRangePicker } from 'Components';
import {
  company_company_surveys_active_areas,
  company_company_surveys,
} from 'api/__generated__/company';
import PopoverList from 'Components/SelectList/PopoverList';

import useSession from '../../Utils/session';
import { DownloadButton } from '../../Components/common/Buttons';
import { survey } from '../../api/__generated__/survey';
import { FilterTitle, SelectCont, Input, Form, Column, Row, Body } from './styles';

export interface FiltersProps {
  branchArea?: company_company_surveys_active_areas;
  setBranchArea: (branchArea: company_company_surveys_active_areas) => void;
  date: [Dayjs | null, Dayjs | null] | null;
  setDate: (date: [Dayjs | null, Dayjs | null] | null) => void;
  question: string;
  href?: string;
}

const TextDetailsFilters = ({
  branchArea,
  setBranchArea,
  date,
  setDate,
  question,
  href,
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
      if (!branchArea && data?.company?.surveys?.[0]?.active_areas)
        setBranchArea(data?.company?.surveys?.[0]?.active_areas[0]);
    }
  };

  const renderAreaName = () =>
    branchArea && (
      <>
        <Body className="bold">{branchArea?.branch?.name}</Body> <Body>{branchArea?.name}</Body>
      </>
    );

  useEffect(() => {
    if (data?.company?.surveys?.[0]?.active_areas) {
      setBranchArea(data?.company?.surveys?.[0]?.active_areas[0]);
    }
  }, [data?.company?.surveys?.[0]?.active_areas]);

  const handleDownload = useCallback(() => {
    if (href) {
      fetch(href as RequestInfo, {
        method: 'GET',
        headers: {},
      }).then((response) => {
        response.arrayBuffer().then((buffer) => {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${data?.company?.surveys?.[0].name}.pdf`);
          document.body.appendChild(link);
          link.click();
        });
      });
    }
  }, [href]);

  if (surveyError || data === undefined) return null;

  return (
    <ColumnContainer className="background start">
      <RowContainer>
        <Container className="min">
          <RowContainer>
            <Title className="small">{RESULTS}</Title>
          </RowContainer>
          <RowContainer className="top space">
            {question && <Title>{question}</Title>}
            <DownloadButton disabled={false} text={DOWNLOAD} handleClick={handleDownload} />
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
          <PopoverList
            data={data?.company?.surveys?.[0]?.active_areas}
            handleOutsideClick={handleOutsideClick}
            anchorRef={anchorRefBranchAreas}
            setSelected={
              (setBranchArea as unknown) as (
                item: company_company_surveys | { id: ReactText; name: string },
              ) => void
            }
            className={AREA}
          />
        )}
        <Column>
          <FilterTitle>{PERIOD}</FilterTitle>
          <Form>
            <DateRangePicker date={date} setDate={setDate} />
          </Form>
        </Column>
      </Row>
    </ColumnContainer>
  );
};

export default TextDetailsFilters;
