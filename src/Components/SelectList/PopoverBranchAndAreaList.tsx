/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import { ClickAwayListener, ListItemText } from '@material-ui/core';
import _ from 'lodash';
import { FiArrowLeft } from 'react-icons/fi';

import { getCompanyBranches_company_branches } from 'api/__generated__/getCompanyBranches';
import { AreaChip, AddLink } from 'Components/TableElements/styles';
import {
  SELECT_AREAS,
  SELECT_BRANCH_OFFICES,
  NO_AREAS_TO_ADD,
  SAVE,
  NO_BRANCH_OFFICES,
  ALL,
  NEXT,
} from 'Utils/constants';
import { Error } from 'Components/common/Form/styles';
import { filterAreas } from 'Utils';
import { StyledList, StyledPopover, ListRow, StyledDivider, Label, Div, Body } from './styles';

export interface PopoverListProps {
  anchorRef: HTMLElement | null;
  handleOutsideClick: () => void;
  handleSaveClick: () => void;
  data: Array<getCompanyBranches_company_branches>;
  setSelectedBranchOffice: React.Dispatch<
    React.SetStateAction<getCompanyBranches_company_branches[]>
  >;
  selectedBranchOffice: Array<getCompanyBranches_company_branches>;
  setSelectedAreas: React.Dispatch<React.SetStateAction<{ name: string; ids: string[] }[]>>;
  selectedAreas: { name: string; ids: string[] }[];
  alreadyselectedBranchAreas: {
    branches: getCompanyBranches_company_branches[];
    areas: {
      name: string;
      ids: string[];
    }[];
  }[];
}

const PopoverBranchAndAreaList = ({
  anchorRef,
  handleOutsideClick,
  data,
  setSelectedBranchOffice,
  selectedBranchOffice,
  setSelectedAreas,
  selectedAreas,
  handleSaveClick,
  alreadyselectedBranchAreas,
}: PopoverListProps) => {
  const [isBranchOffice, setIsBranchOffice] = useState(true);
  const [errors, setErrors] = useState({ save: '', next: '' });

  const filteredAreas = useMemo(
    () => filterAreas(selectedBranchOffice, alreadyselectedBranchAreas, false),
    [selectedBranchOffice, alreadyselectedBranchAreas],
  );

  const isChecked = () =>
    isBranchOffice
      ? selectedBranchOffice.length === data.length
      : selectedAreas.length && selectedAreas.length === filteredAreas.length;

  const handleAllButtonClick = () =>
    isBranchOffice
      ? setSelectedBranchOffice(selectedBranchOffice.length === data.length ? [] : data)
      : setSelectedAreas(selectedAreas.length === filteredAreas.length ? [] : filteredAreas);

  const renderAllButton = () => (
    <ListRow button onClick={handleAllButtonClick}>
      <ListItemText>
        <AreaChip key={ALL} label={ALL} className={isChecked() ? 'checked' : 'link'} />
        <StyledDivider />
      </ListItemText>
    </ListRow>
  );

  const hasError = () => (isBranchOffice ? errors.next : errors.save);

  const handleNextButton = () =>
    selectedBranchOffice.length
      ? setIsBranchOffice(false)
      : setErrors({ ...errors, next: SELECT_BRANCH_OFFICES });

  const handleSaveButton = () =>
    selectedAreas.length ? handleSaveClick() : setErrors({ ...errors, save: SELECT_AREAS });

  const renderFinishedButton = () => (
    <ListRow button onClick={isBranchOffice ? handleNextButton : handleSaveButton}>
      <ListItemText>
        <StyledDivider />
        <AddLink type="button" className="green right">
          {isBranchOffice ? NEXT : SAVE}
        </AddLink>
        <Error>{hasError() && (isBranchOffice ? errors.next : errors.save)}</Error>
      </ListItemText>
    </ListRow>
  );

  const renderBranches = () =>
    data.length ? (
      <div>
        {renderAllButton()}
        {data.map((branch) => (
          <ListRow
            button
            key={branch.name}
            onClick={() => {
              setSelectedBranchOffice(
                selectedBranchOffice.some(({ id }) => id === branch.id)
                  ? selectedBranchOffice.filter(({ id }) => id !== branch.id)
                  : [...selectedBranchOffice, branch],
              );
            }}
          >
            <ListItemText>
              <AreaChip
                key={branch?.name}
                label={branch?.name}
                className={
                  selectedBranchOffice.some((selectedBranch) => selectedBranch?.id === branch?.id)
                    ? 'checked'
                    : 'link'
                }
              />
            </ListItemText>
          </ListRow>
        ))}
        {renderFinishedButton()}
      </div>
    ) : (
      <Body className="error">{NO_BRANCH_OFFICES}</Body>
    );

  const handleAreaClick = (anArea: SelectedAreasInterface) => {
    if (anArea)
      setSelectedAreas(
        selectedAreas?.some((area) => anArea?.ids[0] === area?.ids[0])
          ? selectedAreas?.filter((area) => area?.ids[0] !== anArea?.ids[0])
          : [...selectedAreas, anArea],
      );
  };

  const renderAreas = () =>
    filteredAreas.length ? (
      // eslint-disable-next-line react/jsx-indent
      <>
        {renderAllButton()}
        {filteredAreas.map((anArea) => (
          <ListRow button key={anArea?.name} onClick={() => handleAreaClick(anArea)}>
            <ListItemText>
              <AreaChip
                className={
                  selectedAreas.some((selectedArea) => selectedArea?.ids[0] === anArea?.ids[0])
                    ? 'checked'
                    : 'link'
                }
                key={anArea?.name}
                label={anArea?.name}
              />
            </ListItemText>
          </ListRow>
        ))}
        {renderFinishedButton()}
      </>
    ) : (
      <Body className="error">{NO_AREAS_TO_ADD}</Body>
    );

  const handleArrowClick = () => {
    setIsBranchOffice(true);
    setSelectedAreas([]);
    setErrors({ ...errors, next: '' });
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
      <ClickAwayListener onClickAway={handleOutsideClick}>
        <div>
          <Div>
            {!isBranchOffice && (
              <Div className="center">
                <FiArrowLeft onClick={handleArrowClick} size="20px" />
              </Div>
            )}
            <Label className="left">{!isBranchOffice ? SELECT_AREAS : SELECT_BRANCH_OFFICES}</Label>
          </Div>
          <StyledList>{isBranchOffice ? renderBranches() : renderAreas()}</StyledList>
        </div>
      </ClickAwayListener>
    </StyledPopover>
  );
};

export default PopoverBranchAndAreaList;
