/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { ClickAwayListener } from '@material-ui/core';

import {
  company_company_surveys,
  company_company_surveys_active_areas,
} from 'api/__generated__/company';
import { AREA } from 'Utils/constants';
import { getCompanyBranches_company_branches } from 'api/__generated__/getCompanyBranches';
import { StyledList, StyledPopover, Body, ListRow, ItemText, AddAreaInput } from './styles';

export interface PopoverListProps {
  anchorRef: HTMLElement | null;
  handleOutsideClick: () => void;
  data: (
    | company_company_surveys
    | { id: string | number; name: string }
    | company_company_surveys_active_areas
    | { branch: getCompanyBranches_company_branches; id: string; name: string }
  )[];
  setSelected: (
    item:
      | company_company_surveys
      | { id: string | number; name: string }
      | { branch: getCompanyBranches_company_branches; id: string; name: string },
  ) => void;
  setBranchArea?: (branchArea: company_company_surveys_active_areas[]) => void;
  className: string;
  searchable: boolean;
}

const PopoverList = ({
  anchorRef,
  handleOutsideClick,
  data,
  setSelected,
  setBranchArea,
  className,
  searchable,
}: PopoverListProps) => {
  const [searchedTerm, setSearchedTerm] = useState('');
  const handleClick = (item: any) => {
    setSelected(item);
    if (setBranchArea) setBranchArea([]);
    handleOutsideClick();
  };

  return (
    <StyledPopover
      className={className}
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
          {searchable && (
            <AddAreaInput value={searchedTerm} onChange={(e) => setSearchedTerm(e.target.value)} />
          )}
          <StyledList className={className}>
            {data &&
              data.map((item: any) => {
                if (
                  item?.branch?.name?.toLowerCase().includes(searchedTerm.toLowerCase()) ||
                  item.name.toLowerCase().includes(searchedTerm.toLowerCase())
                ) {
                  return (
                    <ListRow button key={item.id} onClick={() => handleClick(item)}>
                      <ItemText>
                        <>
                          {className.includes(AREA) && (
                            <Body className="bold">{`${item?.branch?.name} `}</Body>
                          )}
                          <Body>{item?.name}</Body>
                        </>
                      </ItemText>
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

PopoverList.defaultProps = {
  searchable: false,
};

export default PopoverList;
