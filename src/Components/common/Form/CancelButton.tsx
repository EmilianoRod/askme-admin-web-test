import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

import { CancelButton as Button, ContentDiv } from './styles';
import { CANCEL } from '../../../Utils/constants';

export interface CancelButtonProps {
  onClick: () => void;
}

const CancelButton = ({ onClick }: CancelButtonProps) => {
  const [hover, setHover] = useState(false);
  return (
    <Button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
    >
      <ContentDiv>
        <MdClose color={hover ? '#ffffff' : '#008630'} size="27" />
        {CANCEL}
      </ContentDiv>
    </Button>
  );
};

export default CancelButton;
