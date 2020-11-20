import React from 'react';

import useNavigation from 'Utils/navigation';
import MainLayout from '../../Layouts/mainLayout';

const DesignPage = () => {
  useNavigation();

  return (
    <MainLayout>
      <div>DesignPage</div>
    </MainLayout>
  );
};

export default DesignPage;
