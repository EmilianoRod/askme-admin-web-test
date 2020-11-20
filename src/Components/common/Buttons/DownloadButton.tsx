import React from 'react';

import { AddButton as Button, Image } from './styles';
import { ArrowDown } from '../../../Assets/Images';

export interface ButtonProps {
  text: string;
  handleClick: () => void;
  disabled: boolean;
}

const DownloadButton = ({ text, handleClick, disabled }: ButtonProps) => (
  <Button disabled={disabled} className="download" onClick={handleClick}>
    <Image src={ArrowDown} />
    {text}
  </Button>
);

export default DownloadButton;
