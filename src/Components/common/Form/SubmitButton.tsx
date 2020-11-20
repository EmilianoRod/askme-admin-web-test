import React from 'react';

import { Button } from './styles';

export interface ButtonsProps {
  text: string | JSX.Element;
  disabled: boolean;
}

const SubmitButton = ({ text, disabled }: ButtonsProps) => (
  <Button disabled={disabled} type="submit">
    {text}
  </Button>
);

export default SubmitButton;
