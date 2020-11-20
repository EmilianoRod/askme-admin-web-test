import React, { useState, useCallback } from 'react';
import { ClickAwayListener, ListItemText } from '@material-ui/core';
import { BeatLoader } from 'react-spinners';
import { FiArrowLeft } from 'react-icons/fi';

import { AreaChip, LoaderDiv } from 'Components/TableElements/styles';
import { SELECT_AN_AREA, SELECT_A_BRANCH_OFFICE, NO_AREAS_TO_ADD } from 'Utils/constants';
import {
  surveys_company_different_areas_branches,
  surveys_company_different_areas_colors,
} from 'api/__generated__/surveys';
import { StyledList, StyledPopover, ListRow, AddAreaInput, Label, Div, Body } from './styles';
import { UpdateAreaInput } from '../../../__generated__/globalTypes';
import theme from '../../theme';

export interface PopoverListProps {
  anchorRef: HTMLElement | null;
  handleOutsideClick: () => void;
  data: ({
    name: string;
    id: string;
    colors: surveys_company_different_areas_colors;
    branches: surveys_company_different_areas_branches[];
  } | null)[];
  assignArea: (vars: { variables: { input: UpdateAreaInput } }) => void;
  survey: string;
  loading: boolean;
}

const PopoverAreaAndBranch = ({
  anchorRef,
  handleOutsideClick,
  data,
  assignArea,
  survey,
  loading,
}: PopoverListProps) => {
  const [searchedTerm, setSearchedTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<{
    name: string;
    id: string;
    colors: { text: string; background: string };
    branches: surveys_company_different_areas_branches[];
  } | null>();
  const [isArea, setIsArea] = useState(true);
  const [ind, setInd] = useState(0);

  const filterData = useCallback(
    (dataToFilter) =>
      dataToFilter &&
      dataToFilter.filter(
        (
          filt:
            | {
                name: string;
                id: string;
                colors: { text: string; background: string };
                branches: surveys_company_different_areas_branches[];
              }
            | surveys_company_different_areas_branches,
        ) => filt?.name.toLowerCase().includes(searchedTerm.toLowerCase()),
      ),
    [data, searchedTerm, selectedArea],
  );

  const outsideClick = () => {
    handleOutsideClick();
    setSearchedTerm('');
  };

  const id = (aBranch: surveys_company_different_areas_branches) =>
    aBranch.areas?.find((area) => selectedArea?.name === area.name)?.id;

  const renderAreas = () =>
    filterData(data)?.length ? (
      filterData(data)?.map(
        (area: {
          name: string;
          id: string;
          colors: { text: string; background: string };
          branches: surveys_company_different_areas_branches[];
        }) => (
          <ListRow
            disabled={loading}
            button
            key={area?.name}
            onClick={() => {
              setIsArea(false);
              if (area) setSelectedArea(area);
              setSearchedTerm('');
            }}
          >
            <ListItemText>
              <AreaChip
                style={{
                  backgroundColor: area?.colors?.background,
                  color: area?.colors?.text,
                }}
                key={area?.name}
                label={area?.name}
              />
            </ListItemText>
          </ListRow>
        ),
      )
    ) : (
      <Body className="error">{NO_AREAS_TO_ADD}</Body>
    );

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
          <Div>
            {!isArea && (
              <Div className="center">
                <FiArrowLeft onClick={() => setIsArea(true)} size="20px" />
                <Body>{selectedArea?.name}</Body>
              </Div>
            )}
            <Label className="left">{isArea ? SELECT_AN_AREA : SELECT_A_BRANCH_OFFICE}</Label>
          </Div>
          <AddAreaInput
            className="survey"
            value={searchedTerm}
            onChange={(e) => setSearchedTerm(e.target.value)}
          />
          <StyledList>
            {isArea
              ? renderAreas()
              : filterData(selectedArea?.branches) &&
                filterData(selectedArea?.branches)?.map(
                  (aBranch: surveys_company_different_areas_branches, index: number) => (
                    <ListRow
                      disabled={loading}
                      button
                      key={aBranch?.name}
                      onClick={async () => {
                        setInd(index);
                        try {
                          await assignArea({
                            variables: { input: { id: id(aBranch) as string, survey_id: survey } },
                          });
                        } catch (e) {
                          return e;
                        }
                        setIsArea(true);
                        return null;
                      }}
                    >
                      <ListItemText>
                        <AreaChip key={aBranch?.name} label={aBranch?.name} />
                        {loading && index === ind && (
                          <LoaderDiv>
                            <BeatLoader size="5" color={theme.palette.primary[75]} />
                          </LoaderDiv>
                        )}
                      </ListItemText>
                    </ListRow>
                  ),
                )}
          </StyledList>
        </div>
      </ClickAwayListener>
    </StyledPopover>
  );
};

export default PopoverAreaAndBranch;
