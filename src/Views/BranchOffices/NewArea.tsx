/* eslint-disable consistent-return */
import React, { useState } from 'react';
import * as yup from 'yup';
import { useMutation, ApolloCache } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { GET_BRANCH_AREAS, BRANCH_OFFICES_PAGE } from 'api/queries';
import { createArea } from 'api/__generated__/createArea';
import { branch } from 'api/__generated__/branch';
import { getBranchOffices } from 'api/__generated__/getBranchOffices';

import useSession from '../../Utils/session';
import { CREATE_AREA } from '../../api/mutations';
import MainLayout from '../../Layouts/mainLayout';
import Form from '../../Components/common/Form';
import {
  SAVE,
  NAME,
  NAME_TEXT,
  BRANCH_OFFICES_TEXT,
  DETAILS_TEXT,
  NEW_AREA,
  URL_TEXT,
  URL,
  COMPANY,
} from '../../Utils/constants';
import { Background } from './styles';

export interface FormProps {
  name: string;
  url: string;
}

const NewArea = () => {
  const id = window.location.pathname.split('/')[2];
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState(' ');
  const [hasBeenSubmited, setHasBeenSubmited] = useState(false);

  const createAreaUpdate = (cache: ApolloCache<createArea>, data?: createArea) => {
    const createAreaData = data?.createArea;
    try {
      const cachedData = cache.readQuery<branch>({
        query: GET_BRANCH_AREAS,
        variables: {
          input: {
            branch_id: id,
          },
        },
      });
      if (cachedData?.branch && cachedData?.branch?.areas) {
        if (createAreaData && createAreaData.area) {
          cache.writeQuery({
            query: GET_BRANCH_AREAS,
            variables: {
              input: {
                branch_id: id,
              },
            },
            data: {
              branch: {
                ...cachedData?.branch,
                areas: [...cachedData?.branch?.areas, createAreaData.area],
              },
            },
          });
        }
      }
    } catch (e) {
      return e;
    }
    try {
      const cachedDataBranchOffices = cache.readQuery<getBranchOffices>({
        query: BRANCH_OFFICES_PAGE,
        variables: {
          input: {
            company_id: localStorage.getItem(COMPANY),
          },
        },
      });
      if (cachedDataBranchOffices?.company?.branches) {
        if (createAreaData && createAreaData.area) {
          const newBranches = cachedDataBranchOffices?.company?.branches?.map((aBranch) => {
            if (aBranch.id === createAreaData?.area?.branch?.id) {
              return {
                ...aBranch,
                areas: aBranch.areas?.length
                  ? [...aBranch.areas, createAreaData]
                  : [createAreaData],
              };
            }
            return aBranch;
          });
          const newDifferentAreas = !cachedDataBranchOffices.company.different_areas?.some(
            ({ name: areaName }) => areaName === createAreaData?.area?.name,
          )
            ? cachedDataBranchOffices?.company?.different_areas && [
                ...cachedDataBranchOffices?.company?.different_areas,
                createAreaData.area?.name,
              ]
            : cachedDataBranchOffices.company.different_areas;
          cache.writeQuery({
            query: BRANCH_OFFICES_PAGE,
            variables: {
              input: {
                company_id: localStorage.getItem(COMPANY),
              },
            },
            data: {
              ...cachedDataBranchOffices,
              company: {
                ...cachedDataBranchOffices.company,
                branches: newBranches,
                different_areas: newDifferentAreas,
              },
            },
          });
        }
      }
    } catch (e) {
      return e;
    }
  };

  const [createAreaMutation, { error: createAreaError, loading }] = useMutation(CREATE_AREA, {
    update: (cache, { data: updateData }) => {
      createAreaUpdate(cache, updateData);
    },
    onCompleted: ({ createArea: area }) => {
      if (area && !area.success && area?.errors) {
        setHasBeenSubmited(false);
        setErrorMessage(area?.errors[0]);
      }
      if (area && area.success) history.push(`/${BRANCH_OFFICES_TEXT}/${DETAILS_TEXT}/${id}`);
    },
  });

  useSession([loading], [createAreaError]);

  const data = [
    {
      name: NAME_TEXT,
      labelText: NAME,
    },
    {
      name: URL_TEXT,
      labelText: URL,
    },
  ];
  const initialValues = {
    name: '',
    url: '',
  };

  if (createAreaError) {
    // TODO: handle error
  }

  const submitForm = async ({ name, url }: FormProps) =>
    createAreaMutation(
      url
        ? {
            variables: { input: { name, friendly_token: url, branch_id: id } },
          }
        : {
            variables: { input: { name, branch_id: id } },
          },
    ).catch((e) => e);

  const onCancel = () => {
    history.push(`/${BRANCH_OFFICES_TEXT}/${DETAILS_TEXT}/${id}`);
  };

  return (
    <MainLayout>
      <Background>
        <Form
          hasBeenSubmited={hasBeenSubmited}
          setHasBeenSubmited={setHasBeenSubmited}
          data={data}
          onCancel={onCancel}
          title={NEW_AREA}
          submitText={SAVE}
          schema={yup.object().shape({
            name: yup.string().required(),
            url: yup.string(),
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

export default NewArea;
