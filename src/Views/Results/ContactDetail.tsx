import React, { useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { decamelizeKeys } from 'humps';
import { useHistory, useLocation } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Table, TableBody } from '@material-ui/core';
import { BeatLoader } from 'react-spinners';

import { Background, RowContainer, BackButton, ColumnContainer } from 'Views/BranchOffices/styles';
import { Back } from 'Assets/Images';
import useNavigation from 'Utils/navigation';
import {
  RESULTS_TEXT,
  COMPANY,
  NO_ANSWERS,
  PERIOD,
  CONTACT_ESP,
  CI,
  PHONE,
  EMAIL_TEXT,
  DATE,
  GO_BACK,
} from 'Utils/constants';
import { MainLayout } from 'Layouts';
import { GET_SURVEY, CONTACT_ANSWERS } from 'api/queries';
import { company_company_surveys_active_areas } from 'api/__generated__/company';
import { ContactAnswers } from 'api/__generated__/ContactAnswers';
import TableHeader from 'Components/TableElements/TableHeader';
import theme from 'theme';

import useSession from '../../Utils/session';
import { survey } from '../../api/__generated__/survey';
import { Label as NoAnswersLabel } from '../../Components/Charts/styles';
import TextDetailsFilters from './TextDetailsFilters';
import ContactRow from '../../Components/TableElements/ContactRow';
import { TextAnswersTable } from './styles';

const ContactDetail = () => {
  const location = useLocation<{ date: any }>();
  const [date, setDate] = useState<[Dayjs | null, Dayjs | null] | null>([dayjs(), dayjs()]);
  const [branchArea, setBranchArea] = useState<company_company_surveys_active_areas>();
  const history = useHistory();
  const selectedDate = location.state?.date;
  useNavigation();

  const surveyId = window.location.pathname.split('/')[3];
  const TEXT_DETAIL_FIELDS = [CI, PHONE, EMAIL_TEXT, DATE];
  const WIDTHS = ['25%', '25%', '30%', '20%'];

  const { data, error: surveyError, loading: loadingSurvey } = useQuery<survey>(GET_SURVEY, {
    variables: {
      input: decamelizeKeys({
        companyId: localStorage.getItem(COMPANY),
      }),
      id: surveyId,
    },
  });

  useEffect(() => {
    if (selectedDate) setDate([dayjs(selectedDate[0].$d), dayjs(selectedDate[1].$d)]);
  }, []);

  useEffect(() => {
    if (data?.company?.surveys?.[0]?.active_areas) {
      setBranchArea(data?.company?.surveys?.[0]?.active_areas[0]);
    }
  }, [data?.company?.surveys?.[0]?.active_areas]);

  const [getContactAnswers, { data: contactData, error, loading }] = useLazyQuery<ContactAnswers>(
    CONTACT_ANSWERS,
  );

  useSession([loading, loadingSurvey], [error, surveyError]);

  useEffect(() => {
    if (branchArea && date) {
      getContactAnswers({
        variables: {
          input: {
            survey_id: surveyId,
            area_id: branchArea.id,
            start_date: date?.[0]?.format('DD/MM/YYYY'),
            end_date: date?.[1]?.format('DD/MM/YYYY'),
          },
        },
      });
    }
  }, [branchArea, date]);

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
            <ColumnContainer className="fullScreen">
              <TextDetailsFilters
                branchArea={branchArea}
                setBranchArea={setBranchArea}
                date={date}
                setDate={setDate}
                question={CONTACT_ESP}
              />
              {!loading && !contactData?.contactAnswers?.length ? (
                <ColumnContainer className="center margin">
                  <NoAnswersLabel className="answers">{NO_ANSWERS}</NoAnswersLabel>
                  <NoAnswersLabel className="answers lowerCase">{PERIOD}</NoAnswersLabel>
                </ColumnContainer>
              ) : (
                <TextAnswersTable className="contact">
                  {loading ? (
                    <BeatLoader color={theme.palette.primary[75]} />
                  ) : (
                    <Table>
                      <TableHeader fields={TEXT_DETAIL_FIELDS} widths={WIDTHS} />
                      <TableBody>
                        {contactData &&
                          contactData.contactAnswers &&
                          contactData.contactAnswers.map((contact) => (
                            <ContactRow answer={contact} key={contact.group_id as string} />
                          ))}
                      </TableBody>
                    </Table>
                  )}
                </TextAnswersTable>
              )}
            </ColumnContainer>
          </RowContainer>
        )}
      </Background>
    </MainLayout>
  );
};
export default ContactDetail;
