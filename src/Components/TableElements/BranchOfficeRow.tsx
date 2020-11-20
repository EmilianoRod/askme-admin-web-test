/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import { IoIosClose } from 'react-icons/io';
import _ from 'lodash';
import { useMutation, ApolloCache } from '@apollo/client';

import { ADD, BRANCH_OFFICES_TEXT, DETAILS_TEXT, COMPANY, BRANCH_OFFICE } from 'Utils/constants';
import {
  Row,
  AreaChip,
  TableDivider,
  Cell,
  AddLink,
  SelectCont,
  Form,
  BranchButton,
  Input,
} from 'Components/TableElements/styles';
import { BRANCH_OFFICES_PAGE } from 'api/queries';
import { DELETE_AREA, CREATE_AREA } from 'api/mutations';
import { deleteArea } from 'api/__generated__/deleteArea';
import PopoverChipList from 'Components/SelectList/PopoverChipList';
import { createArea } from 'api/__generated__/createArea';
import PopperComponent from 'Components/Popper/PopperComponent';
import {
  getBranchOffices,
  getBranchOffices_company_different_areas,
  getBranchOffices_company_branches_areas,
  getBranchOffices_company_branches,
} from 'api/__generated__/getBranchOffices';

import useSession from '../../Utils/session';

export interface BranchOffice {
  data: getBranchOffices_company_branches;
  branchId: string;
  differentAreas?: getBranchOffices_company_different_areas[] | null;
  widths: string[];
}

const BranchOfficeRow = ({
  data: { name, address, areas, id },
  branchId,
  differentAreas,
  widths,
}: BranchOffice) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [clicked, setClicked] = useState(false);
  const history = useHistory();

  const sortDesc = (
    a: getBranchOffices_company_branches_areas,
    b: getBranchOffices_company_branches_areas,
  ) => {
    if (a.created_at > b.created_at) return 1;
    if (a.created_at < b.created_at) return -1;
    return 0;
  };

  const createAreaUpdate = (cache: ApolloCache<createArea>, data?: createArea) => {
    const createAreaData = data?.createArea?.area;
    const cachedData = cache.readQuery<getBranchOffices>({
      query: BRANCH_OFFICES_PAGE,
      variables: {
        input: {
          company_id: localStorage.getItem(COMPANY),
        },
      },
    });
    if (cachedData?.company?.branches) {
      if (createAreaData) {
        const newBranches = cachedData?.company?.branches?.map((branch) => {
          if (branch.id === createAreaData?.branch?.id) {
            return {
              ...branch,
              areas: branch.areas?.length ? [...branch.areas, createAreaData] : [createAreaData],
            };
          }
          return branch;
        });
        const newDifferentAreas = !cachedData.company.different_areas?.some(
          ({ name: areaName }) => areaName === createAreaData.name,
        )
          ? cachedData?.company?.different_areas && [
              ...cachedData?.company?.different_areas,
              createAreaData.name,
            ]
          : cachedData.company.different_areas;
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
              ...cachedData.company,
              different_areas: newDifferentAreas,
              branches: newBranches,
            },
          },
        });
      }
    }
  };

  const deleteAreaUpdate = (cache: ApolloCache<deleteArea>, data?: deleteArea) => {
    const deleteAreaData = data?.deleteArea;
    const cachedData = cache.readQuery<getBranchOffices>({
      query: BRANCH_OFFICES_PAGE,
      variables: {
        input: {
          company_id: localStorage.getItem(COMPANY),
        },
      },
    });
    if (cachedData?.company?.branches) {
      if (deleteAreaData && deleteAreaData.area) {
        const newDifferentAreas = () => {
          const area =
            cachedData?.company?.different_areas &&
            cachedData?.company?.different_areas.find(
              (anArea) => anArea.name === deleteAreaData.area?.name,
            );
          if (area && area.ids && area.ids.length === 1) {
            return (
              cachedData.company?.different_areas &&
              cachedData.company?.different_areas.filter((diff) => diff.name !== area.name)
            );
          }
          return cachedData.company?.different_areas;
        };
        const newBranches = cachedData?.company?.branches.map((branch) => {
          return {
            ...branch,
            areas: branch.areas?.filter((area) => area.id !== deleteAreaData?.area?.id),
          };
        });
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
              ...cachedData.company,
              branches: newBranches,
              different_areas: newDifferentAreas(),
            },
          },
        });
      }
    }
  };

  const [createAreaMutation, { error: createAreaError, loading: createAreaLoading }] = useMutation(
    CREATE_AREA,
    {
      update: (cache, { data: updateData }) => createAreaUpdate(cache, updateData),
    },
  );

  const [deleteAreaMutation, { error: deleteAreaError, loading: deleteAreaLoading }] = useMutation(
    DELETE_AREA,
    {
      update: (cache, { data: updateData }) => deleteAreaUpdate(cache, updateData),
    },
  );

  useSession([createAreaLoading, deleteAreaLoading], [createAreaError, deleteAreaError]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!anchorEl) setAnchorEl(e.currentTarget);
  };

  const handleOutsideClick = () => {
    if (anchorEl) setAnchorEl(null);
  };

  if (deleteAreaError || createAreaError) {
    // TODO: handle error
    return null;
  }
  return (
    <>
      <Row>
        <Cell style={{ maxWidth: widths[0] }} className="bold 14">
          <BranchButton
            className="ellipsis"
            onClick={() => history.push(`/${BRANCH_OFFICES_TEXT}/${DETAILS_TEXT}/${branchId}`)}
          >
            {name}
          </BranchButton>
        </Cell>
        <Cell style={{ maxWidth: widths[1] }}>{address}</Cell>
        <Cell style={{ maxWidth: widths[2] }} className="large">
          <>
            <>
              {areas &&
                areas
                  ?.slice()
                  ?.sort(sortDesc)
                  ?.map(
                    ({
                      name: areaName,
                      id: areaId,
                      colors,
                    }: getBranchOffices_company_branches_areas) => (
                      <AreaChip
                        disabled={clicked}
                        style={{ backgroundColor: colors?.background, color: colors?.text }}
                        className="margin"
                        key={areaName}
                        label={areaName}
                        onDelete={async () => {
                          setClicked(true);
                          try {
                            await deleteAreaMutation({ variables: { input: { id: areaId } } });
                          } catch (e) {
                            return e;
                          }
                          setClicked(false);
                        }}
                        deleteIcon={
                          <IoIosClose style={{ minWidth: 20 }} color={colors?.text} size={50} />
                        }
                      />
                    ),
                  )}
            </>
            <>
              <Form>
                <SelectCont
                  open={false}
                  displayEmpty
                  IconComponent={() => null}
                  multiple
                  value={areas}
                  input={<Input readOnly disabled />}
                  renderValue={() => (
                    <>
                      <AddLink
                        style={{ visibility: anchorEl ? 'hidden' : 'visible' }}
                        type="button"
                        onClick={(e) => handleClick(e)}
                      >
                        {ADD}
                      </AddLink>
                    </>
                  )}
                />
              </Form>
            </>
          </>
        </Cell>
        <Cell style={{ maxWidth: widths[3] }}>
          <PopperComponent type={BRANCH_OFFICE} id={id} button={<BsThreeDots size="20" />} />
        </Cell>
        <PopoverChipList
          data={
            differentAreas &&
            _.xorBy(
              differentAreas,
              (areas as unknown) as getBranchOffices_company_different_areas[],
              'name',
            )
          }
          areas={areas}
          loading={createAreaLoading}
          anchorRef={anchorEl}
          handleOutsideClick={handleOutsideClick}
          createArea={createAreaMutation}
          branch={id}
        />
      </Row>
      <TableDivider />
    </>
  );
};

export default BranchOfficeRow;
