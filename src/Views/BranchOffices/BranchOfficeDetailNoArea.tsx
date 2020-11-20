/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router-dom';

import PopperComponent from 'Components/Popper/PopperComponent';
import useNavigation from 'Utils/navigation';
import { BeatLoader } from 'react-spinners';
import { Back, DotsButton, NoArea } from '../../Assets/Images';
import { AddButton } from '../../Components/common/Buttons';
import {
  NO_AREAS,
  ADD_AREA,
  ADD_NEW_ONE,
  BRANCH_OFFICES_TEXT,
  AREAS,
  NEW_TEXT,
  BRANCH_OFFICE,
  GO_BACK,
  BRANCH_OFFICES,
} from '../../Utils/constants';
import {
  RowContainer,
  Title,
  BackButton,
  Text,
  ColumnContainer,
  DotsImg,
  Background,
  Image,
} from './styles';
import theme from '../../theme';

export interface PropsType {
  name?: string;
  address?: string | null;
  id: string;
  loading: boolean;
}

const BranchOfficeDetailNoArea = ({ name, id, loading }: PropsType) => {
  const history = useHistory();
  useNavigation();

  return loading ? (
    <Background className="center">
      <BeatLoader color={theme.palette.primary[75]} />
    </Background>
  ) : (
    <Background className="small">
      <ColumnContainer className="background">
        <RowContainer className="center">
          <BackButton
            style={{ marginTop: 20 }}
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
                <Title className="fixedWidth">{name}</Title>
              </RowContainer>
              <PopperComponent type={BRANCH_OFFICE} id={id} button={<DotsImg src={DotsButton} />} />
            </RowContainer>
          </div>
        </RowContainer>
        <ColumnContainer className="fullScreen center">
          <Image src={NoArea} />
          <ColumnContainer className="bottomMargin center">
            <Text className="bold">{NO_AREAS}</Text>
            <Text>{ADD_NEW_ONE}</Text>
          </ColumnContainer>
          <AddButton
            loading={false}
            text={ADD_AREA}
            handleClick={() => history.push(`/${BRANCH_OFFICES_TEXT}/${id}/${AREAS}/${NEW_TEXT}`)}
          />
        </ColumnContainer>
      </ColumnContainer>
    </Background>
  );
};

export default BranchOfficeDetailNoArea;
