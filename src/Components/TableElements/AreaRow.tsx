/* eslint-disable consistent-return */
import React, { useState, useCallback } from 'react';

import { BlackCross } from 'Assets/Images';
import { QR_CODE, EDIT, NOT_ASSIGNED, SAVE, URL } from 'Utils/constants';
import { branch_branch_areas, branch } from 'api/__generated__/branch';
import { ApolloCache, useMutation } from '@apollo/client';
import { deleteArea } from 'api/__generated__/deleteArea';
import { GET_BRANCH_AREAS } from 'api/queries';
import { DELETE_AREA, UPDATE_AREA } from 'api/mutations';
import { decamelizeKeys } from 'humps';
import { Input } from 'Components/common/Form/styles';
import { Row, Cell, AddLink } from './styles';
import useSession from '../../Utils/session';

export interface RowProps {
  data: branch_branch_areas;
}

const WIDTHS = ['15%', '10%', '45%', '15%', '5%'];

const AreaRow = ({ data }: RowProps) => {
  const branchId = window.location.pathname.split('/')[3];
  const [clicked, setClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [friendlyToken, setFriendlyToken] = useState(data.friendly_token);

  const download = useCallback(() => {
    fetch(data.qr_code as RequestInfo, {
      method: 'GET',
      headers: {},
    }).then((response) => {
      response.arrayBuffer().then((buffer) => {
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${data.name}.png`);
        document.body.appendChild(link);
        link.click();
      });
    });
  }, [data]);

  const deleteAreaUpdate = (
    cache: ApolloCache<deleteArea>,
    deleteData: deleteArea | null | undefined,
  ) => {
    const deleteAreaData = deleteData?.deleteArea;
    try {
      const cachedData = cache.readQuery<branch>({
        query: GET_BRANCH_AREAS,
        variables: {
          input: decamelizeKeys({
            branchId,
          }),
        },
      });
      if (cachedData?.branch?.areas) {
        if (deleteAreaData && deleteAreaData.area) {
          const newBranch = {
            ...cachedData.branch,
            areas: cachedData.branch.areas.filter((area) => area.id !== deleteAreaData.area?.id),
          };
          cache.writeQuery({
            query: GET_BRANCH_AREAS,
            variables: {
              input: decamelizeKeys({
                branchId,
              }),
            },
            data: {
              branch: newBranch,
            },
          });
        }
      }
    } catch (e) {
      return e;
    }
  };

  const [deleteAreaMutation, { error: deleteAreaError, loading: deleteAreaLoading }] = useMutation(
    DELETE_AREA,
    {
      update: (cache, { data: updateData }) => {
        deleteAreaUpdate(cache, updateData);
      },
    },
  );

  const [editArea, { error: editAreaError, loading: editAreaLoading }] = useMutation(UPDATE_AREA);

  useSession([deleteAreaLoading, editAreaLoading], [deleteAreaError, editAreaError]);

  if (deleteAreaError) return null;

  const editFriendlyToken = () => {
    if (isEditing) {
      editArea({ variables: { input: { id: data.id, friendly_token: friendlyToken } } }).catch(
        (e) => e,
      );
    }
    setIsEditing(!isEditing);
  };

  return (
    <Row>
      <Cell style={{ width: WIDTHS[0] }} className="bold">
        {data.name}
      </Cell>
      <Cell style={{ width: WIDTHS[1] }} className="underlined bold" onClick={download}>
        {QR_CODE}
      </Cell>
      <Cell style={{ width: WIDTHS[2] }} className="noPadding">
        {isEditing ? (
          <>
            <span>www.app.webaskme.com/ </span>
            <Input
              value={friendlyToken}
              onChange={(e) => setFriendlyToken(e.target.value)}
              className="height"
              placeholder={URL}
            />
            <AddLink
              className={isEditing ? 'green left' : 'left'}
              onClick={() => editFriendlyToken()}
            >
              {isEditing ? SAVE : EDIT}
            </AddLink>
          </>
        ) : (
          <>
            <span>{`www.app.webaskme.com/${friendlyToken}`}</span>
            <AddLink
              onClick={() => editFriendlyToken()}
              className={isEditing ? 'green left' : 'left'}
            >
              {isEditing ? SAVE : EDIT}
            </AddLink>
          </>
        )}
      </Cell>
      <Cell
        style={{ width: WIDTHS[3] }}
        className={data.active_survey ? 'small right' : 'small right grey'}
      >
        {data.active_survey ? data.active_survey.name : NOT_ASSIGNED}
      </Cell>
      <Cell
        style={{ width: WIDTHS[4] }}
        className="cross"
        onClick={async () => {
          if (!clicked) {
            setClicked(true);
            await deleteAreaMutation({ variables: { input: { id: data.id } } }).catch((e) => e);
          }
          setClicked(false);
        }}
      >
        <img style={{ cursor: 'pointer' }} src={BlackCross} alt="cancel" />
      </Cell>
    </Row>
  );
};

export default AreaRow;
