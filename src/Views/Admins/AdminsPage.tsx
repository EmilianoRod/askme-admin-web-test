/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useQuery } from '@apollo/client';
import { Table, TableBody } from '@material-ui/core';
import { decamelizeKeys } from 'humps';
import { useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

import {
  SEARCH,
  NEW_TEXT,
  COMPANY,
  EMAIL_TEXT,
  ACCESS,
  ADMINS_ES,
  NEW_ADMIN,
  ADMINS_TEXT,
  NO_ADMINS,
  ADD_ONE,
} from 'Utils/constants';
import TableHeader from 'Components/TableElements/TableHeader';
import { GET_ADMINS, ME } from 'api/queries';
import { me } from 'api/__generated__/me';
import useNavigation from 'Utils/navigation';
import { AddButton } from 'Components/common/Buttons';
import { NoArea } from 'Assets/Images';
import { getAdmins, getAdmins_company_admin_users } from 'api/__generated__/getAdmins';
import AdminUserRow from 'Components/TableElements/AdminUserRow';

import useSession from '../../Utils/session';
import MainLayout from '../../Layouts/mainLayout';
import {
  Title,
  Background,
  Input,
  Row,
  BranchesTable,
  Container,
  NoBranchOfficesBackground,
  Body,
  Column,
} from './styles';
import theme from '../../theme';

const BRANCH_OFFICES_FIELDS = [EMAIL_TEXT, ACCESS, ''];
const CELL_WIDTH = ['45%', '50%', '5%'];

const BranchOffices = () => {
  const [searchedTerm, setSearchedTerm] = useState('');
  const history = useHistory();
  useNavigation();

  const { data: meData, error: meError, loading: meLoading } = useQuery<me>(ME);
  const { data, error: adminsError, loading } = useQuery<getAdmins>(GET_ADMINS, {
    variables: {
      input: decamelizeKeys({
        companyId: localStorage.getItem(COMPANY),
      }),
    },
  });

  useSession([loading, meLoading], [meError, adminsError]);

  if (adminsError) {
    // TODO: handle error case
  }

  const renderNoAdminsPage = () =>
    loading ? (
      <NoBranchOfficesBackground>
        <BeatLoader color={theme.palette.primary[75]} />
      </NoBranchOfficesBackground>
    ) : (
      <NoBranchOfficesBackground>
        <img alt={NO_ADMINS} src={NoArea} />
        <Body className="bold marginTop">{NO_ADMINS}</Body>
        <Body className="marginBottom">{ADD_ONE}</Body>
        <AddButton
          loading={false}
          text={NEW_ADMIN}
          handleClick={() => history.push(`/${ADMINS_TEXT}/${NEW_TEXT}`)}
        />
      </NoBranchOfficesBackground>
    );

  return (
    <MainLayout>
      <Background>
        {data?.company?.admin_users?.length ? (
          <Container>
            <Row className="margin">
              <Title>{ADMINS_ES}</Title>
              <AddButton
                loading={false}
                text={NEW_ADMIN}
                handleClick={() => history.push(`${ADMINS_TEXT}/${NEW_TEXT}`)}
              />
            </Row>
            <Row className="input">
              <FiSearch size="20px" />
              <Input onChange={(e) => setSearchedTerm(e.target.value)} placeholder={SEARCH} />
            </Row>
            <BranchesTable>
              <Table>
                <TableHeader fields={BRANCH_OFFICES_FIELDS} widths={CELL_WIDTH} />
                {loading || meLoading ? null : (
                  <TableBody>
                    {meData?.me &&
                      data?.company?.admin_users &&
                      data?.company?.admin_users.map(
                        (adminsToRender: getAdmins_company_admin_users) => {
                          if (
                            adminsToRender.email
                              .toLowerCase()
                              .includes(searchedTerm.toLowerCase()) &&
                            !(adminsToRender.email.toLowerCase() === meData.me?.email)
                          )
                            return <AdminUserRow data={adminsToRender} />;
                        },
                      )}
                  </TableBody>
                )}
              </Table>
            </BranchesTable>
          </Container>
        ) : (
          <Column>
            <Row className="self">
              <Title>{ADMINS_ES}</Title>
            </Row>
            {renderNoAdminsPage()}
          </Column>
        )}
      </Background>
    </MainLayout>
  );
};

export default BranchOffices;
