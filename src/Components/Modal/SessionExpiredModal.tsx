/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/camelcase */
import React from 'react';
import { useHistory } from 'react-router-dom';

import { SESSION_EXPIRED, SIGN_IN_TO_CONTINUE, ACCEPT, COMPANY } from 'Utils/constants';
import { Button } from 'Components/common/Form/styles';
import { Modal, ModalContainer, RowContainer, Title, Text } from './styles';

export interface ModalProps {
  isOpen: boolean;
  handleOpen: () => void;
}

const SessionExpiredModal = ({ isOpen, handleOpen }: ModalProps) => {
  const history = useHistory();

  const logIn = () => {
    localStorage.removeItem(COMPANY);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    handleOpen();
    history.push('/');
  };

  return (
    <Modal open={isOpen} onClose={handleOpen} disableBackdropClick>
      <ModalContainer>
        <Title>{SESSION_EXPIRED}</Title>
        <Text>{SIGN_IN_TO_CONTINUE}</Text>
        <RowContainer className="center">
          <Button onClick={logIn}>{ACCEPT}</Button>
        </RowContainer>
      </ModalContainer>
    </Modal>
  );
};

export default SessionExpiredModal;
