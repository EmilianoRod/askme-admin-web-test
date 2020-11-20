/* eslint-disable react/prop-types */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

import useNavigation from 'Utils/navigation';
import PopperComponent from 'Components/Popper/PopperComponent';
import { Back, DotsButton, NoQuestions } from '../../Assets/Images';
import { AddButton } from '../common/Buttons';
import {
  ADD_NEW_ONE,
  NEW_TEXT,
  SURVEYS_TEXT,
  SURVEYS,
  ADD_QUESTION,
  QUESTION_TEXT,
  SURVEY_NO_QUESTIONS,
  SURVEY,
  GO_BACK,
} from '../../Utils/constants';
import {
  RowContainer,
  Title,
  Container,
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
    <Background className="left">
      <ColumnContainer className="background">
        <RowContainer>
          <BackButton className="margin" onClick={() => history.push(`/${SURVEYS_TEXT}`)}>
            <img src={Back} alt={GO_BACK} />
          </BackButton>
          <Container>
            <RowContainer>
              <Title className="small underlined" onClick={() => history.push(`/${SURVEYS_TEXT}`)}>
                {SURVEYS}
              </Title>
              <Title className="small">{`> ${name}`}</Title>
            </RowContainer>
            <RowContainer className="separated">
              <RowContainer>
                <Title>{name}</Title>
              </RowContainer>
              <PopperComponent type={SURVEY} id={id} button={<DotsImg src={DotsButton} />} />
            </RowContainer>
          </Container>
        </RowContainer>
        <ColumnContainer className="fullScreen">
          <Image src={NoQuestions} />
          <ColumnContainer className="bottomMargin">
            <Text className="bold">{SURVEY_NO_QUESTIONS}</Text>
            <Text>{ADD_NEW_ONE}</Text>
          </ColumnContainer>
          <AddButton
            loading={false}
            text={ADD_QUESTION}
            handleClick={() => history.push(`/${SURVEYS_TEXT}/${id}/${QUESTION_TEXT}/${NEW_TEXT}`)}
          />
        </ColumnContainer>
      </ColumnContainer>
    </Background>
  );
};

export default BranchOfficeDetailNoArea;
