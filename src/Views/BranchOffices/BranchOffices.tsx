import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useQuery } from '@apollo/client';
import { Table, TableBody } from '@material-ui/core';
import { decamelizeKeys } from 'humps';
import { useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

import {
  BRANCH_OFFICES,
  SEARCH,
  NEW_BRANCH_OFFICE,
  BRANCH_OFFICE,
  ADDRESS,
  AREAS,
  BRANCH_OFFICES_TEXT,
  NEW_TEXT,
  COMPANY,
  NO_BRANCH_OFFICES,
  ADD_NEW_ONE,
} from 'Utils/constants';
import TableHeader from 'Components/TableElements/TableHeader';
import BranchOfficeRow from 'Components/TableElements/BranchOfficeRow';
import { BRANCH_OFFICES_PAGE } from 'api/queries';
import useNavigation from 'Utils/navigation';
import { AddButton } from 'Components/common/Buttons';
import { NoArea } from 'Assets/Images';
import {
  getBranchOffices_company_branches,
  getBranchOffices,
} from 'api/__generated__/getBranchOffices';

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

const BRANCH_OFFICES_FIELDS = [BRANCH_OFFICE, ADDRESS, AREAS, ''];
const CELL_WIDTH = ['30%', '20%', '45%', '5%'];

const BranchOffices = () => {
  const [searchedTerm, setSearchedTerm] = useState('');
  const history = useHistory();
  useNavigation();

  const { data, loading, error: officesError } = useQuery<getBranchOffices>(BRANCH_OFFICES_PAGE, {
    variables: {
      input: decamelizeKeys({
        companyId: localStorage.getItem(COMPANY),
      }),
    },
  });

  useSession([loading], [officesError]);

  if (officesError) {
    // TODO: handle error case
  }

  const renderNoBranchOfficesPage = () =>
    loading ? (
      <NoBranchOfficesBackground>
        <BeatLoader color={theme.palette.primary[75]} />
      </NoBranchOfficesBackground>
    ) : (
      <NoBranchOfficesBackground>
        <img alt={NO_BRANCH_OFFICES} src={NoArea} />
        <Body className="bold marginTop">{NO_BRANCH_OFFICES}</Body>
        <Body className="marginBottom">{ADD_NEW_ONE}</Body>
        <AddButton
          loading={false}
          text={NEW_BRANCH_OFFICE}
          handleClick={() => history.push(`/${BRANCH_OFFICES_TEXT}/${NEW_TEXT}`)}
        />
      </NoBranchOfficesBackground>
    );

  return (
    <MainLayout>
      <Background>
        {data?.company?.branches?.length ? (
          <Container>
            <Row className="margin">
              <Title>{BRANCH_OFFICES}</Title>
              <AddButton
                loading={false}
                text={NEW_BRANCH_OFFICE}
                handleClick={() => history.push(`/${BRANCH_OFFICES_TEXT}/${NEW_TEXT}`)}
              />
            </Row>
            <Row className="input">
              <FiSearch size="20px" />
              <Input onChange={(e) => setSearchedTerm(e.target.value)} placeholder={SEARCH} />
            </Row>
            <BranchesTable>
              <Table style={{ tableLayout: 'fixed' }}>
                <TableHeader fields={BRANCH_OFFICES_FIELDS} widths={CELL_WIDTH} />
                {loading ? null : (
                  <TableBody>
                    {data?.company?.branches &&
                      data?.company?.branches
                        .filter((branchToRender: getBranchOffices_company_branches) =>
                          branchToRender.name.toLowerCase().includes(searchedTerm.toLowerCase()),
                        )
                        .map((branch: getBranchOffices_company_branches) => (
                          <BranchOfficeRow
                            widths={CELL_WIDTH}
                            key={branch.id}
                            data={branch}
                            branchId={branch.id}
                            differentAreas={data?.company?.different_areas}
                          />
                        ))}
                  </TableBody>
                )}
              </Table>
            </BranchesTable>
          </Container>
        ) : (
          <Column>
            <Row className="self">
              <Title>{BRANCH_OFFICES}</Title>
            </Row>
            {renderNoBranchOfficesPage()}
          </Column>
        )}
      </Background>
    </MainLayout>
  );
};

export default BranchOffices;
