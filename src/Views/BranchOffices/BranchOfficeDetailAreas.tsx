import React from 'react';
import { useHistory } from 'react-router-dom';
import { Table, TableBody } from '@material-ui/core';

import { Back, DotsButton } from 'Assets/Images';
import AreaRow from 'Components/TableElements/AreaRow';
import { branch_branch_areas } from 'api/__generated__/branch';
import PopperComponent from 'Components/Popper/PopperComponent';
import useNavigation from 'Utils/navigation';
import {
  ColumnContainer,
  RowContainer,
  Title,
  BackButton,
  DotsImg,
  AddAreaButton,
  Background,
  BranchesTable,
} from './styles';
import {
  BRANCH_OFFICES,
  BRANCH_OFFICES_TEXT,
  ADD_AREA,
  AREAS,
  NEW_TEXT,
  BRANCH_OFFICE,
  GO_BACK,
} from '../../Utils/constants';

export interface PropType {
  name?: string;
  data?: branch_branch_areas[];
  loading: boolean;
  id: string;
}

const BranchOfficeDetailAreas = ({ name, data, id, loading }: PropType) => {
  const history = useHistory();
  useNavigation();

  const sortDesc = (a: branch_branch_areas, b: branch_branch_areas) => b.created_at - a.created_at;

  return (
    <Background className="left">
      <ColumnContainer className="background">
        <RowContainer>
          <BackButton
            style={{ marginTop: 44 }}
            onClick={() => history.push(`/${BRANCH_OFFICES_TEXT}`)}
          >
            <img src={Back} alt={GO_BACK} />
          </BackButton>
          <div style={{ width: '100%', minWidth: 766 }}>
            <RowContainer>
              <Title
                onClick={() => history.push(`/${BRANCH_OFFICES_TEXT}`)}
                className="small underlined"
              >
                {BRANCH_OFFICES}
              </Title>
              <Title className="small fixedWidth">{`> ${name}`}</Title>
            </RowContainer>
            <RowContainer className="separated">
              <RowContainer>
                <Title>{name}</Title>
              </RowContainer>
              <PopperComponent type={BRANCH_OFFICE} id={id} button={<DotsImg src={DotsButton} />} />
            </RowContainer>
            <AddAreaButton
              onClick={() => history.push(`/${BRANCH_OFFICES_TEXT}/${id}/${AREAS}/${NEW_TEXT}`)}
            >
              {`+ ${ADD_AREA}`}
            </AddAreaButton>
            <BranchesTable className="small">
              <Table>
                {loading ? null : (
                  <TableBody>
                    {data
                      ?.slice()
                      .sort(sortDesc)
                      .map((area) => (
                        <AreaRow data={area} key={area.id} />
                      ))}
                  </TableBody>
                )}
              </Table>
            </BranchesTable>
          </div>
        </RowContainer>
      </ColumnContainer>
    </Background>
  );
};
export default BranchOfficeDetailAreas;
