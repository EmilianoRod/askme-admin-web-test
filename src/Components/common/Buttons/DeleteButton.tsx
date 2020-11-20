import React from 'react';

import { Button } from './styles';

export interface ButtonsProps {
  text: string;
  onDelete: () => void;
}

const DeleteButton = ({ text, onDelete }: ButtonsProps) => (
  <Button onClick={onDelete} type="submit">
    {text}
  </Button>
);

export default DeleteButton;
