/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import { ClickAwayListener } from '@material-ui/core';

import { company_company_surveys_active_areas } from 'api/__generated__/company';
import { StyledPopover, StyledList, Body, ListRow, GreenCheckBox, ItemText } from './styles';

export interface PopoverCheckListProps {
  anchorRef: HTMLElement | null;
  handleOutsideClick: () => void;
  data: company_company_surveys_active_areas[];
  setSelected: (branchArea: company_company_surveys_active_areas[] | []) => void;
  selected: company_company_surveys_active_areas[];
}

const PopoverCheckList = ({
  anchorRef,
  handleOutsideClick,
  data,
  setSelected,
  selected,
}: PopoverCheckListProps) => {
  const [hideBold, setHideBold] = useState(-1);
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
        <StyledList>
          {data.map((branchArea, index) => (
            <ListRow
              onClick={() => {
                setSelected(
                  selected.some((selectedArea) => selectedArea?.id === branchArea?.id)
                    ? selected.filter((selectedArea) => selectedArea?.id !== branchArea?.id)
                    : [...selected, branchArea],
                );
              }}
              button
              key={branchArea.id}
            >
              <ItemText
                onMouseEnter={() =>
                  branchArea?.branch &&
                  (branchArea?.branch?.name.length > 24 ||
                    branchArea.name.length + branchArea?.branch?.name.length > 30) &&
                  setHideBold(index)
                }
                onMouseLeave={() => setHideBold(-1)}
              >
                <Body className="bold">{hideBold !== index ? branchArea?.branch?.name : ''}</Body>
                <Body className={hideBold === index ? 'hidden-bold' : ''}>
                  {hideBold === index && branchArea?.branch?.name} {branchArea.name}
                </Body>
              </ItemText>
              <GreenCheckBox
                edge="end"
                checked={selected.some((selectedArea) => selectedArea?.id === branchArea?.id)}
              />
            </ListRow>
          ))}
        </StyledList>
      </ClickAwayListener>
    </StyledPopover>
  );
};

export default PopoverCheckList;
