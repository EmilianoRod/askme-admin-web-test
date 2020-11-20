import React, { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import Moment from 'react-moment';

import { textAnswers_textAnswers } from 'api/__generated__/textAnswers';
import { Row, Cell } from './styles';

export interface RowProps {
  answer: textAnswers_textAnswers;
  windowWidth: number;
}

const TextQuestionRow = ({ answer, windowWidth }: RowProps) => {
  const [expand, setExpand] = useState(false);

  const isWider = () => answer.answer.value.length > windowWidth * 0.046;

  const renderText = () =>
    isWider() ? `${answer.answer.value.substring(0, windowWidth * 0.045)}...` : answer.answer.value;

  return (
    <Row>
      <Cell onClick={() => isWider() && setExpand(!expand)} className="start">
        {isWider() && (
          <IoIosArrowForward
            style={expand ? { transform: 'rotate(90deg)' } : { transform: 'rotate(0deg)' }}
            color="#00B642"
          />
        )}
      </Cell>
      <Cell>{expand ? answer.answer.value : renderText()}</Cell>
      <Cell>{answer.contact_answer?.value}</Cell>
      <Cell>
        <Moment format="DD/MM/YYYY HH:mm:ss">{answer.answer.answered_at}</Moment>
      </Cell>
    </Row>
  );
};

export default TextQuestionRow;
