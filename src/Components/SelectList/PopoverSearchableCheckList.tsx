/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { ClickAwayListener } from '@material-ui/core';

import {
  StyledPopover,
  StyledList,
  Body,
  ListRow,
  GreenCheckBox,
  ItemText,
  AddAreaInput,
} from './styles';

export interface PopoverCheckListProps {
  anchorRef: HTMLElement | null;
  handleOutsideClick: () => void;
  data: { branchName: string; areaName: string; id: string }[];
  setSelected: (branchArea: { branchName: string; areaName: string; id: string }[] | []) => void;
  selected: { branchName: string; areaName: string; id: string }[];
}

const PopoverSearchableCheckList = ({
  anchorRef,
  handleOutsideClick,
  data,
  setSelected,
  selected,
}: PopoverCheckListProps) => {
  const [searchedTerm, setSearchedTerm] = useState('');

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
      <ClickAwayListener onClickAway={handleOutsideClick}>
        <div>
          <AddAreaInput value={searchedTerm} onChange={(e) => setSearchedTerm(e.target.value)} />
          <StyledList>
            <ListRow button>
              <ItemText>
                <Body>Todas</Body>
              </ItemText>
              <GreenCheckBox
                edge="end"
                onChange={() => {
                  setSelected(selected.length === data.length ? [] : data);
                }}
                checked={selected.length === data.length}
              />
            </ListRow>
            {data.map((branchArea) => {
              if (
                branchArea.branchName.toLowerCase().includes(searchedTerm.toLowerCase()) ||
                branchArea.areaName.toLowerCase().includes(searchedTerm.toLowerCase())
              ) {
                return (
                  <ListRow button key={branchArea.id}>
                    <ItemText>
                      <Body className="bold">{branchArea?.branchName} </Body>
                      <Body>{branchArea.areaName}</Body>
                    </ItemText>
                    <GreenCheckBox
                      edge="end"
                      onChange={() => {
                        setSelected(
                          selected.some((selectedArea) => selectedArea?.id === branchArea?.id)
                            ? selected.filter((selectedArea) => selectedArea?.id !== branchArea?.id)
                            : [...selected, branchArea],
                        );
                      }}
                      checked={selected.some((selectedArea) => selectedArea?.id === branchArea?.id)}
                    />
                  </ListRow>
                );
              }
            })}
          </StyledList>
        </div>
      </ClickAwayListener>
    </StyledPopover>
  );
};

export default PopoverSearchableCheckList;
