import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Table, TableBody } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { decamelizeKeys } from 'humps';
import { useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

import useNavigation from 'Utils/navigation';
import {
  SURVEYS,
  ADD_SURVEY,
  SEARCH,
  NAME,
  BRANCH_OFFICE,
  AREA,
  NO_SURVEYS,
  ADD_NEW_ONE,
  SURVEYS_TEXT,
  NEW_TEXT,
} from 'Utils/constants';
import { AddButton } from 'Components/common/Buttons';
import TableHeader from 'Components/TableElements/TableHeader';
import SurveyRow from 'Components/TableElements/SurveyRow';
import { COMPANY_SURVEYS } from 'api/queries';
import { NoQuestions } from 'Assets/Images';
import { surveys_company_surveys } from 'api/__generated__/surveys';

import useSession from '../../Utils/session';
import MainLayout from '../../Layouts/mainLayout';
import {
  Background,
  Title,
  Row,
  Input,
  SurveysTable,
  NoSurveysBackground,
  Body,
  Column,
} from './styles';
import theme from '../../theme';

const SURVEYS_DATA = [NAME, `${BRANCH_OFFICE}/${AREA}`, ''];
const CELL_WIDTH = ['25%', '70%', '5%'];

const SurveysPage = () => {
  const history = useHistory();
  const [searchedTerm, setSearchedTerm] = useState('');
  useNavigation();

  const { data, error, loading } = useQuery(COMPANY_SURVEYS, {
    variables: { input: decamelizeKeys({ companyId: localStorage.getItem('company') }) },
  });

  useSession([loading], [error]);

  const renderNoSurveysPage = () =>
    loading ? (
      <NoSurveysBackground>
        <BeatLoader color={theme.palette.primary[75]} />
      </NoSurveysBackground>
    ) : (
      <NoSurveysBackground>
        <img alt={NO_SURVEYS} src={NoQuestions} />
        <Body className="bold marginTop">{NO_SURVEYS}</Body>
        <Body className="marginBottom">{ADD_NEW_ONE}</Body>
        <AddButton
          loading={false}
          text={ADD_SURVEY}
          handleClick={() => history.push(`/${SURVEYS_TEXT}/${NEW_TEXT}`)}
        />
      </NoSurveysBackground>
    );

  return (
    <MainLayout>
      <Background>
        {data?.company?.surveys?.length ? (
          <>
            <Row className="margin">
              <Title>{SURVEYS}</Title>
              <AddButton
                loading={false}
                text={ADD_SURVEY}
                handleClick={() => history.push(`/${SURVEYS_TEXT}/${NEW_TEXT}`)}
              />
            </Row>
            <Row className="input">
              <FiSearch size="20px" />
              <Input onChange={(e) => setSearchedTerm(e.target.value)} placeholder={SEARCH} />
            </Row>
            <SurveysTable>
              <Table style={{ tableLayout: 'fixed' }}>
                <TableHeader fields={SURVEYS_DATA} widths={CELL_WIDTH} />
                {loading ? null : (
                  <TableBody>
                    {data?.company?.surveys
                      ?.filter((survey: surveys_company_surveys) =>
                        survey.name.toLowerCase().includes(searchedTerm.toLowerCase()),
                      )
                      .map((survey: surveys_company_surveys) => (
                        <SurveyRow
                          widths={CELL_WIDTH}
                          key={survey.id}
                          survey={survey}
                          differentAreas={data.company.different_areas}
                        />
                      ))}
                  </TableBody>
                )}
              </Table>
            </SurveysTable>
          </>
        ) : (
          <Column>
            <Row className="self">
              <Title>{SURVEYS}</Title>
            </Row>
            {renderNoSurveysPage()}
          </Column>
        )}
      </Background>
    </MainLayout>
  );
};

export default SurveysPage;
