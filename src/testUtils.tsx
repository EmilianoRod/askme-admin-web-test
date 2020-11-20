import { render } from '@testing-library/react';
import React from 'react';

export const renderWithRedux = (ui: JSX.Element) => {
  return {
    ...render(<>{ui}</>),
  };
};
