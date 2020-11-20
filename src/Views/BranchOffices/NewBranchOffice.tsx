/* eslint-disable consistent-return */
import React, { useState } from 'react';
import * as yup from 'yup';
import { useMutation, ApolloCache } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { BRANCH_OFFICES_PAGE } from 'api/queries';
import { createBranch as createBranchType } from 'api/__generated__/createBranch';
import { company } from 'api/__generated__/company';
import useNavigation from 'Utils/navigation';

import useSession from '../../Utils/session';
import { CREATE_BRANCH_OFFICE } from '../../api/mutations';
import MainLayout from '../../Layouts/mainLayout';
import Form from '../../Components/common/Form';
import {
  NEW_BRANCH_OFFICE,
  SAVE,
  NAME,
  ADDRESS,
  NAME_TEXT,
  ADDRESS_TEXT,
  BRANCH_OFFICES_TEXT,
  DETAILS_TEXT,
  COMPANY,
} from '../../Utils/constants';
import { Background } from './styles';

export interface NewBranch {
  name: string;
  address: string;
}

const NewBranchOffice = () => {
  const history = useHistory();
  useNavigation();
  const [errorMessage, setErrorMessage] = useState(' ');
  const [hasBeenSubmited, setHasBeenSubmited] = useState(false);

  const updateQuery = (
    cache: ApolloCache<createBranchType>,
    data: createBranchType | null | undefined,
  ) => {
    const createBranchData = data?.createBranch;
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
        if (createBranchData && createBranchData.branch) {
          cache.writeQuery({
            query: BRANCH_OFFICES_PAGE,
            variables: {
              input: {
                company_id: localStorage.getItem(COMPANY),
              },
            },
            data: {
              ...cachedData,
              company: { branches: [...cachedData.company.branches, createBranchData.branch] },
            },
          });
        }
      }
    } catch (e) {
      return e;
    }
  };

  const [createBranchOffice, { error: createBranchOfficeError, loading }] = useMutation<
    createBranchType
  >(CREATE_BRANCH_OFFICE, {
    update(cache, { data }) {
      updateQuery(cache, data);
    },
    onCompleted: ({ createBranch }) => {
      if (createBranch && !createBranch.success && createBranch?.errors) {
        setHasBeenSubmited(false);
        setErrorMessage(createBranch?.errors[0]);
      }
      if (createBranch && createBranch.success && createBranch.branch)
        history.push(`/${BRANCH_OFFICES_TEXT}/${DETAILS_TEXT}/${createBranch.branch.id}`);
    },
  });

  useSession([loading], [createBranchOfficeError]);

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
    name: '',
    address: '',
  };

  if (createBranchOfficeError) {
    // TODO: handle error
  }

  const submitForm = async ({ name, address }: NewBranch) =>
    createBranchOffice({
      variables: { input: { name, address, company_id: localStorage.getItem(COMPANY) } },
    }).catch((e) => e);

  const onCancel = () => {
    history.push(`/${BRANCH_OFFICES_TEXT}`);
  };

  return (
    <MainLayout>
      <Background>
        <Form
          data={data}
          onCancel={onCancel}
          title={NEW_BRANCH_OFFICE}
          submitText={SAVE}
          hasBeenSubmited={hasBeenSubmited}
          setHasBeenSubmited={setHasBeenSubmited}
          schema={yup.object().shape({
            name: yup.string().required(),
            address: yup.string().required(),
          })}
          submitForm={submitForm}
          errorMessage={errorMessage}
          initialValues={initialValues}
          loading={loading}
        />
      </Background>
    </MainLayout>
  );
};

export default NewBranchOffice;
