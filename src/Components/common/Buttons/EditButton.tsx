import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';

import { EDIT } from 'Utils/constants';
import theme from 'theme';
import { CancelButton as Button } from '../Form/styles';
import { Container } from './styles';

export interface Props {
  disabled: boolean;
  onClick: () => void;
}

const EditButton = ({ disabled, onClick }: Props) => {
  const [hover, setHover] = useState(false);
  return disabled ? (
    <Button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      className="padding"
    >
      <Container className="space">
        <FiEdit size="15" color={hover ? theme.palette.white[100] : theme.palette.primary[100]} />
        {EDIT}
      </Container>
    </Button>
  ) : null;
};

export default EditButton;
