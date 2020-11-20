/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { Table, TableBody } from '@material-ui/core';

import { MainLayout } from 'Layouts';
import {
  AREAS,
  ASSIGN_REPORTS,
  BRANCH_OFFICES,
  NAME,
  NEW_ADMIN,
  SEARCH,
  REPORTS_TEXT,
  NEW_TEXT,
} from 'Utils/constants';
import useNavigation from 'Utils/navigation';
import { AddButton } from 'Components/common/Buttons';
import TableHeader from 'Components/TableElements/TableHeader';
import { Title, Background, Input, Row, BranchesTable, Container } from '../BranchOffices/styles';

const REPORTS_FIELDS = [NAME, `${BRANCH_OFFICES}/${AREAS}`, ''];
const CELL_WIDTH = ['35%', '60%', '5%'];

const ReportsPage = () => {
  useNavigation();
  const history = useHistory();
  const [searchedTerm, setSearchedTerm] = useState('');

  return (
    <MainLayout>
      <Background>
        <Container>
          <Row className="margin">
            <Title>{ASSIGN_REPORTS}</Title>
            {/* TODO: handleclick */}
            <AddButton
              loading={false}
              text={NEW_ADMIN}
              handleClick={() => history.push(`/${REPORTS_TEXT}/${NEW_TEXT}`)}
            />
          </Row>
          <Row className="input">
            <FiSearch size="20px" />
            <Input onChange={(e) => setSearchedTerm(e.target.value)} placeholder={SEARCH} />
          </Row>
          <BranchesTable>
            <Table style={{ tableLayout: 'fixed' }}>
              <TableHeader fields={REPORTS_FIELDS} widths={CELL_WIDTH} />
              <TableBody />
            </Table>
          </BranchesTable>
        </Container>
      </Background>
    </MainLayout>
  );
};

export default ReportsPage;
