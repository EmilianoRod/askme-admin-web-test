import React, { useState, useCallback } from 'react';
import { ClickAwayListener, ListItemText } from '@material-ui/core';
import { BeatLoader } from 'react-spinners';

import { AreaChip, LoaderDiv } from 'Components/TableElements/styles';
import { SELECT_OR_CREATE_AREA, EXISTING_AREA } from 'Utils/constants';
import {
  getBranchOffices_company_different_areas,
  getBranchOffices_company_branches_areas,
} from 'api/__generated__/getBranchOffices';
import { StyledList, StyledPopover, ListRow, AddAreaInput, Label, Error } from './styles';
import { CreateAreaInput } from '../../../__generated__/globalTypes';
import theme from '../../theme';

export interface PopoverListProps {
  anchorRef: HTMLElement | null;
  handleOutsideClick: () => void;
  data?: getBranchOffices_company_different_areas[] | null;
  createArea: (vars: { variables: { input: CreateAreaInput } }) => void;
  branch: string;
  loading: boolean;
  areas: getBranchOffices_company_branches_areas[] | null;
}

const PopoverChipList = ({
  anchorRef,
  handleOutsideClick,
  data,
  createArea,
  branch,
  areas,
  loading,
}: PopoverListProps) => {
  const [searchedTerm, setSearchedTerm] = useState('');
  const [ind, setInd] = useState(0);
  const [message, setErrorMessage] = useState('');

  const filterAreas = useCallback(
    () =>
      data && data.filter((area) => area.name.toLowerCase().includes(searchedTerm.toLowerCase())),
    [data, searchedTerm],
  );
  const outsideClick = () => {
    handleOutsideClick();
    setSearchedTerm('');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchedTerm(e.target.value);
    if (areas?.some((area) => area.name === e.target.value)) setErrorMessage(EXISTING_AREA);
    else setErrorMessage('');
  };

  return (
    <StyledPopover
      anchorEl={anchorRef}
      open={Boolean(anchorRef)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <ClickAwayListener onClickAway={outsideClick}>
        <div>
          <Label>{SELECT_OR_CREATE_AREA}</Label>
          <AddAreaInput value={searchedTerm} onChange={handleChange} />
          <StyledList>
            {filterAreas() &&
              filterAreas()?.map((area, index) => (
                <ListRow
                  disabled={loading}
                  button
                  key={area?.name}
                  onClick={() => {
                    setInd(index);
                    try {
                      createArea({
                        variables: {
                          input: { name: area.name, branch_id: branch },
                        },
                      });
                    } catch (e) {
                      return e;
                    }
                    setSearchedTerm('');
                    return null;
                  }}
                >
                  <ListItemText>
                    <AreaChip
                      style={{ backgroundColor: area.colors?.background, color: area.colors?.text }}
                      key={area?.name}
                      label={area.name}
                    />
                    {loading && index === ind && (
                      <LoaderDiv>
                        <BeatLoader size="5" color={theme.palette.primary[75]} />
                      </LoaderDiv>
                    )}
                  </ListItemText>
                </ListRow>
              ))}
            {searchedTerm && (
              <ListRow
                button
                disabled={loading}
                onClick={async () => {
                  if (data?.length) setInd(data?.length);
                  if (!message) {
                    try {
                      await createArea({
                        variables: {
                          input: { name: searchedTerm, branch_id: branch },
                        },
                      });
                    } catch (e) {
                      return e;
                    }
                    setSearchedTerm('');
                  }
                  return null;
                }}
              >
                <ListItemText>
                  <AreaChip label={searchedTerm} />
                  {loading && (
                    <LoaderDiv>
                      <BeatLoader size="5" color={theme.palette.primary[75]} />
                    </LoaderDiv>
                  )}
                  {message && <Error>{message}</Error>}
                </ListItemText>
              </ListRow>
            )}
          </StyledList>
        </div>
      </ClickAwayListener>
    </StyledPopover>
  );
};

export default PopoverChipList;
