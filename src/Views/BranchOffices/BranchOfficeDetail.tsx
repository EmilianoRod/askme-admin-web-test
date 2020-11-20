import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { decamelizeKeys } from 'humps';

import { MainLayout } from 'Layouts';
import { GET_BRANCH_AREAS } from 'api/queries';
import { branch } from 'api/__generated__/branch';
import useNavigation from 'Utils/navigation';

import useSession from '../../Utils/session';
import BranchOfficeDetailNoArea from './BranchOfficeDetailNoArea';
import BranchOfficeDetailArea from './BranchOfficeDetailAreas';

const BranchOfficeDetail = () => {
  const branchId = window.location.pathname.split('/')[3];
  useNavigation();

  const { data, loading, error } = useQuery<branch>(GET_BRANCH_AREAS, {
    variables: {
      input: decamelizeKeys({
        branchId,
      }),
    },
  });

  useSession([loading], [error]);

  useEffect(() => {
    if (error) {
      // TODO: handle error
    }
  });

  const areas = data?.branch?.areas;

  return (
    <MainLayout>
      {!loading && areas && areas.length > 0 ? (
        <BranchOfficeDetailArea
          name={data?.branch?.name}
          id={branchId}
          data={areas}
          loading={loading}
        />
      ) : (
        <BranchOfficeDetailNoArea
          loading={loading}
          name={data?.branch?.name}
          id={branchId}
          address={data?.branch?.address}
        />
      )}
    </MainLayout>
  );
};

export default BranchOfficeDetail;
