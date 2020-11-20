import React from 'react';
import Moment from 'react-moment';

import { ContactAnswers_contactAnswers } from 'api/__generated__/ContactAnswers';
import { DOCUMENT, PHONE_NUMBER_TYPE, EMAIL_TYPE } from 'Utils/constants';
import { Row, Cell } from './styles';

export interface RowProps {
  answer: ContactAnswers_contactAnswers;
}

const ContactQuestionRow = ({ answer }: RowProps) => {
  const getFieldData = (
    fieldType: typeof DOCUMENT | typeof PHONE_NUMBER_TYPE | typeof EMAIL_TYPE,
  ) => {
    const selectedQuestion = answer.answers?.find(
      (anAnswer) => anAnswer.question?.subtype === fieldType,
    );
    return selectedQuestion ? selectedQuestion.answer?.value : '-';
  };

  return (
    <Row>
      <Cell>{getFieldData(DOCUMENT)}</Cell>
      <Cell>{getFieldData(PHONE_NUMBER_TYPE)}</Cell>
      <Cell>{getFieldData(EMAIL_TYPE)}</Cell>
      <Cell>
        <Moment format="DD/MM/YYYY HH:mm:ss">{answer.answers?.[0].answer?.answered_at}</Moment>
      </Cell>
    </Row>
  );
};

export default ContactQuestionRow;
