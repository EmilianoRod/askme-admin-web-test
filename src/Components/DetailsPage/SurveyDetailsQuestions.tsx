/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, TableBody } from '@material-ui/core';
import { useMutation, ApolloCache } from '@apollo/client';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import { Back, DotsButton } from 'Assets/Images';
import TableHeader from 'Components/TableElements/TableHeader';
import QuestionRow from 'Components/TableElements/QuestionRow';
import useNavigation from 'Utils/navigation';
import { getSurvey_survey_questions, getSurvey } from 'api/__generated__/getSurvey';
import PopperComponent from 'Components/Popper/PopperComponent';
import { UPDATE_QUESTION } from 'api/mutations';
import { updateQuestion } from 'api/__generated__/updateQuestion';
import { GET_SURVEY_QUESTIONS } from 'api/queries';
import useSession from '../../Utils/session';

import {
  SURVEYS_TEXT,
  SURVEYS,
  ADD_QUESTION,
  QUESTION,
  TYPE,
  DURATION,
  QUESTION_TEXT,
  NEW_TEXT,
  SURVEY,
  GO_BACK,
} from '../../Utils/constants';
import {
  Background,
  ColumnContainer,
  BackButton,
  RowContainer,
  Title,
  AddAreaButton,
  BranchesTable,
  DotsImg,
  Container,
} from './styles';

export interface SurveyDetailProps {
  loading: boolean;
  id: string;
  name: string;
  questions: getSurvey_survey_questions[];
}
const SURVEYS_FIELDS = ['', QUESTION, TYPE, DURATION, ''];
const CELL_WIDTH = ['5%', '50%', '20%', '20%', '5%'];

const SurveyDetailsQuestions = ({ loading, id, name, questions }: SurveyDetailProps) => {
  useNavigation();
  const history = useHistory();
  const [orderedQuestions, setOrderedQuestions] = useState(questions);

  const updateQuestionUpdate = (
    cache: ApolloCache<updateQuestion>,
    data?: updateQuestion | null,
  ) => {
    const updateQuestionData = data?.updateQuestion?.question;
    try {
      const cachedData = cache.readQuery<getSurvey>({
        query: GET_SURVEY_QUESTIONS,
        variables: {
          input: {
            survey_id: id,
          },
        },
      });
      if (cachedData?.survey && cachedData.survey.questions) {
        if (updateQuestionData) {
          const newQuestions = Array.from(cachedData.survey.questions);
          const source = newQuestions.findIndex(
            (question) => question.id === updateQuestionData.id,
          );
          const sourceQuestion = newQuestions.find(
            (question) => question.id === updateQuestionData.id,
          );
          newQuestions.splice(source, 1);
          if (sourceQuestion)
            newQuestions.splice(updateQuestionData.position - 1, 0, sourceQuestion);
          cache.writeQuery({
            query: GET_SURVEY_QUESTIONS,
            variables: {
              input: {
                survey_id: id,
              },
            },
            data: {
              ...cachedData,
              survey: {
                ...cachedData.survey,
                questions: newQuestions,
              },
            },
          });
        }
      }
    } catch (e) {
      return e;
    }
  };

  const [updateQuestionMutation, { error: hasError, loading: isLoading }] = useMutation<
    updateQuestion
  >(UPDATE_QUESTION, {
    update: (cache, { data: updateData }) => updateQuestionUpdate(cache, updateData),
  });

  useSession([isLoading], [hasError]);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId && destination.index === source.index)
    )
      return;
    const newQuestions = Array.from(orderedQuestions);
    newQuestions.splice(source.index, 1);
    const draggableQuestion = questions.find((question) => question.id === draggableId);
    if (draggableQuestion) {
      newQuestions.splice(destination.index, 0, draggableQuestion);
    }
    updateQuestionMutation({
      variables: {
        input: {
          id: draggableId,
          position: destination.index + 1,
        },
      },
    }).catch((e) => e);
    setOrderedQuestions(newQuestions);
  };

  useEffect(() => {
    setOrderedQuestions(questions);
  }, [questions]);

  return (
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
            <AddAreaButton
              onClick={() => history.push(`/${SURVEYS_TEXT}/${id}/${QUESTION_TEXT}/${NEW_TEXT}`)}
            >
              {`+ ${ADD_QUESTION}`}
            </AddAreaButton>
            <DragDropContext onDragEnd={handleDragEnd}>
              <BranchesTable className="small">
                <Table>
                  <TableHeader fields={SURVEYS_FIELDS} widths={CELL_WIDTH} />
                  {loading ? null : (
                    <Droppable droppableId="1">
                      {(provided) => (
                        <TableBody innerRef={provided.innerRef} {...provided.droppableProps}>
                          {orderedQuestions?.map((question, index) => (
                            <QuestionRow
                              widths={CELL_WIDTH}
                              data={question}
                              key={question.id}
                              index={index}
                              id={question.id}
                            />
                          ))}
                          {provided.placeholder}
                        </TableBody>
                      )}
                    </Droppable>
                  )}
                </Table>
              </BranchesTable>
            </DragDropContext>
          </Container>
        </RowContainer>
      </ColumnContainer>
    </Background>
  );
};
export default SurveyDetailsQuestions;
