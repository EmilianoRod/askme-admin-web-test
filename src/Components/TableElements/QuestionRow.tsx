import React from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Draggable } from 'react-beautiful-dnd';

import {
  FACE_ESP,
  FACE_TYPE,
  SCALE_ESP,
  CONTACT_ESP,
  SCALE_TYPE,
  MULTIPLE_CHOICE_TYPE,
  MULTIPLE_CHOICE_ESP,
  CONTACT_TYPE,
  TEXT_TYPE,
  Text_ESP,
  ORDER,
  QUESTION,
} from 'Utils/constants';
import { getSurvey_survey_questions } from 'api/__generated__/getSurvey';
import PopperComponent from 'Components/Popper/PopperComponent';
import { Row, Cell } from './styles';
import { Order } from '../../Assets/Images';

export interface RowProps {
  data: getSurvey_survey_questions;
  index: number;
  widths: string[];
  id: string;
}

const QuestionRow = ({ data, index, widths, id }: RowProps) => {
  const getQuestionType = () => {
    switch (data.type) {
      case FACE_TYPE:
        return FACE_ESP;
      case SCALE_TYPE:
        return SCALE_ESP;
      case MULTIPLE_CHOICE_TYPE:
        return MULTIPLE_CHOICE_ESP;
      case CONTACT_TYPE:
        return CONTACT_ESP;
      case TEXT_TYPE:
        return Text_ESP;
      default:
        return FACE_ESP;
    }
  };

  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <Row
          innerRef={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Cell style={{ width: widths[0] }}>
            <img src={Order} alt={ORDER} />
          </Cell>
          <Cell style={{ width: widths[1] }}>{data.text}</Cell>
          <Cell style={{ width: widths[2] }}>{getQuestionType()}</Cell>
          <Cell style={{ width: widths[3] }}>{data.duration ? `${data.duration}"` : '-'}</Cell>
          <Cell>
            <PopperComponent type={QUESTION} id={id} button={<BsThreeDots size="20" />} />
          </Cell>
        </Row>
      )}
    </Draggable>
  );
};

export default QuestionRow;
