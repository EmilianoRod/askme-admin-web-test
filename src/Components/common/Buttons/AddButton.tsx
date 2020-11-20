import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { BeatLoader } from 'react-spinners';

import theme from 'theme';
import { AddButton as Button } from './styles';

export interface ButtonProps {
  text: string;
  handleClick: () => void;
  loading: boolean;
  disabled?: boolean;
}

const AddButton = ({ text, handleClick, loading, disabled }: ButtonProps) => (
  <Button onClick={handleClick} disabled={disabled}>
    {loading ? (
      <BeatLoader size="5px" color={theme.palette.white[100]} />
    ) : (
      <>
        <FiPlus style={{ marginRight: 7 }} size="20px" />
        {text}
      </>
    )}
  </Button>
);

AddButton.defaultProps = {
  disabled: false,
};

export default AddButton;
