/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */

import React, { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import Moment from 'react-moment';

import { surveyAnswers_surveyAnswers } from 'api/__generated__/surveyAnswers';
import { Row, Cell, TableDivider } from './styles';

export interface RowProps {
  answer: surveyAnswers_surveyAnswers;
  width: number;
}

const SummaryRow = ({ answer, width }: RowProps) => {
  const [expand, setExpand] = useState(false);

  const isWider = (value: string) =>
    answer.answers && value.length > (width * answer.answers.length) / 350;

  const renderValue = (value: string) => {
    if (answer.answers?.length) {
      return isWider(value)
        ? `${value.substring(0, (width * answer.answers?.length) / 350)}...`
        : value;
    }
  };

  const needsArrow = () =>
    answer.answers?.some(
      ({ answer: repeatedAnswer }) =>
        repeatedAnswer && answer.answers?.length && isWider(repeatedAnswer?.value),
    );

  return (
    <>
      <Row>
        <Cell onClick={() => needsArrow() && setExpand(!expand)} className="start">
          {needsArrow() && (
            <IoIosArrowForward
              style={expand ? { transform: 'rotate(90deg)' } : { transform: 'rotate(0deg)' }}
              color="#00B642"
            />
          )}
        </Cell>
        {answer.answers?.map((ans) =>
          expand ? (
            <Cell key={ans.question?.id}>{ans.answer ? ans.answer.value : '-'}</Cell>
          ) : (
            <Cell key={ans.question?.id}>{ans.answer ? renderValue(ans.answer.value) : '-'}</Cell>
          ),
        )}
        <Cell>
          <Moment format="DD/MM/YYYY HH:mm:ss">{answer.answers?.[0].answer?.answered_at}</Moment>
        </Cell>
      </Row>
      <TableDivider />
    </>
  );
};

export default SummaryRow;
