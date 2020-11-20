/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/camelcase */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, ApolloCache, useQuery } from '@apollo/client';
import * as yup from 'yup';

import Form from 'Components/common/Form';
import { updateBranchOffice } from 'api/__generated__/updateBranchOffice';
import { MainLayout } from 'Layouts';
import {
  NAME_TEXT,
  ADDRESS_TEXT,
  NAME,
  EDIT_BRANCH_OFFICE,
  ADDRESS,
  BRANCH_OFFICES_TEXT,
  SAVE,
  DETAILS_TEXT,
  COMPANY,
} from 'Utils/constants';
import { company } from 'api/__generated__/company';
import { BRANCH_OFFICES_PAGE, GET_BRANCH_AREAS } from 'api/queries';
import useNavigation from 'Utils/navigation';

import useSession from '../../Utils/session';
import { UPDATE_BRANCH_OFFICE } from '../../api/mutations';
import { Background } from './styles';
import { NewBranch } from './NewBranchOffice';

const EditBranchOffice = () => {
  const history = useHistory();
  const branchId = window.location.pathname.split('/')[3];
  const [errorMessage, setErrorMessage] = useState(' ');
  const [hasBeenSubmited, setHasBeenSubmited] = useState(false);

  useNavigation();

  const updateQuery = (
    cache: ApolloCache<updateBranchOffice>,
    data: updateBranchOffice | null | undefined,
  ) => {
    const updateBranchData = data?.updateBranch;
    try {
      const cachedData = cache.readQuery<company>({
        query: BRANCH_OFFICES_PAGE,
        variables: {
          input: {
            company_id: localStorage.getItem(COMPANY),
          },
        },
      });
      if (cachedData?.company?.branches) {
        if (updateBranchData && updateBranchData.branch) {
          cache.writeQuery({
            query: BRANCH_OFFICES_PAGE,
            variables: {
              input: {
                company_id: localStorage.getItem(COMPANY),
              },
            },
            data: {
              ...cachedData,
              company: {
                branches: [
                  ...cachedData.company.branches.filter(
                    (branch) => branch.id !== updateBranchData.branch?.id,
                  ),
                  updateBranchData.branch,
                ],
              },
            },
          });
        }
      }
    } catch (e) {
      return e;
    }
  };

  const [updateOffice, { error: loadingError, loading: loadingUpdate }] = useMutation<
    updateBranchOffice
  >(UPDATE_BRANCH_OFFICE, {
    onCompleted: ({ updateBranch }) => {
      if (updateBranch && updateBranch?.errors && !updateBranch?.success) {
        setErrorMessage(updateBranch?.errors[0]);
        setHasBeenSubmited(false);
      } else if (updateBranch && updateBranch.branch)
        history.push(`/${BRANCH_OFFICES_TEXT}/${DETAILS_TEXT}/${updateBranch.branch.id}`);
    },
    update(cache, { data }) {
      updateQuery(cache, data);
    },
  });

  const { data: branchData, loading, error } = useQuery(GET_BRANCH_AREAS, {
    variables: {
      input: {
        branch_id: branchId,
      },
    },
  });

  useSession([loading, loadingUpdate], [error, loadingError]);

  const data = [
    {
      name: NAME_TEXT,
      labelText: NAME,
    },
    {
      name: ADDRESS_TEXT,
      labelText: ADDRESS,
    },
  ];

  const initialValues = {
    name: branchData?.branch?.name,
    address: branchData?.branch?.address,
  };

  const submitForm = async ({ name, address }: NewBranch) =>
    updateOffice({
      variables: { input: { name, address, id: branchId } },
    }).catch((e) => e);

  return (
    <MainLayout>
      <Background>
        {!loading && !error && (
          <Form
            hasBeenSubmited={hasBeenSubmited}
            setHasBeenSubmited={setHasBeenSubmited}
            data={data}
            onCancel={() => history.push(`/${BRANCH_OFFICES_TEXT}`)}
            title={EDIT_BRANCH_OFFICE}
            submitText={SAVE}
            schema={yup.object().shape({
              name: yup.string().required(),
              address: yup.string().required(),
            })}
            submitForm={submitForm}
            errorMessage={errorMessage}
            initialValues={initialValues}
            loading={loadingUpdate}
          />
        )}
      </Background>
    </MainLayout>
  );
};

export default EditBranchOffice;
