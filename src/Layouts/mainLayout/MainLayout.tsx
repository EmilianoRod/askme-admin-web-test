import React from 'react';

import Menu from 'Components/menu/Menu';
import { RowContainer } from './styles';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <RowContainer>
      <Menu />
      {children}
    </RowContainer>
  );
}
