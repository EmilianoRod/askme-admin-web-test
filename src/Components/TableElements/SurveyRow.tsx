/* eslint-disable consistent-return */
import React, { useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { BsThreeDots } from 'react-icons/bs';
import { useMutation, ApolloCache } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { ASSIGN, SURVEYS_TEXT, COMPANY, DETAILS_TEXT, SURVEY } from 'Utils/constants';
import {
  surveys_company_surveys_active_areas,
  surveys_company_surveys,
  surveys_company_different_areas,
  surveys,
  surveys_company_different_areas_colors,
  surveys_company_different_areas_branches,
} from 'api/__generated__/surveys';
import PopoverAreaAndBranch from 'Components/SelectList/PopoverAreaAndBranch';
import { UPDATE_AREA, DELETE_ACTIVE_AREA } from 'api/mutations';
import { updateArea } from 'api/__generated__/updateArea';
import { COMPANY_SURVEYS } from 'api/queries';
import PopperComponent from 'Components/Popper/PopperComponent';
import { deleteActiveSurvey } from 'api/__generated__/deleteActiveSurvey';

import useSession from '../../Utils/session';
import {
  Row,
  Cell,
  AreaChip,
  RightChip,
  Div,
  AddLink,
  Form,
  SelectCont,
  TableDivider,
  Input,
} from './styles';

export interface SurveyRowProps {
  survey: surveys_company_surveys;
  differentAreas: surveys_company_different_areas[];
  widths: string[];
}

const SurveyRow = ({
  survey: { name, active_areas, id },
  differentAreas,
  widths,
}: SurveyRowProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const history = useHistory();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!anchorEl) setAnchorEl(e.currentTarget);
  };

  const handleOutsideClick = () => {
    if (anchorEl) setAnchorEl(null);
  };

  const assignAreaUpdate = (cache: ApolloCache<updateArea>, data?: updateArea) => {
    const newArea = data?.updateArea?.area;
    try {
      const cachedData = cache.readQuery<surveys>({
        query: COMPANY_SURVEYS,
        variables: {
          input: {
            company_id: localStorage.getItem(COMPANY),
          },
        },
      });
      const newSurveys = cachedData?.company?.surveys?.map((survey) => {
        if (survey.id === newArea?.active_survey?.id) {
          return {
            ...survey,
            active_areas: survey.active_areas?.length
              ? [...survey.active_areas, newArea]
              : [newArea],
          };
        }
        if (survey.active_areas?.some((area) => area.id === newArea?.id)) {
          return {
            ...survey,
            active_areas: survey.active_areas.filter((area) => area.id !== newArea?.id),
          };
        }
        return survey;
      });
      cache.writeQuery({
        query: COMPANY_SURVEYS,
        variables: {
          input: {
            company_id: localStorage.getItem(COMPANY),
          },
        },
        data: {
          ...cachedData,
          company: {
            ...cachedData?.company,
            surveys: newSurveys,
          },
        },
      });
    } catch (e) {
      return e;
    }
  };

  const deleteAreaUpdate = (cache: ApolloCache<deleteActiveSurvey>, data?: deleteActiveSurvey) => {
    const deletedArea = data?.deleteActiveSurvey?.area;
    try {
      const cachedData = cache.readQuery<surveys>({
        query: COMPANY_SURVEYS,
        variables: {
          input: {
            company_id: localStorage.getItem(COMPANY),
          },
        },
      });
      const newSurveys = cachedData?.company?.surveys?.map((survey) => {
        if (!deletedArea?.active_survey) {
          return {
            ...survey,
            active_areas: survey.active_areas?.filter((area) => area.id !== deletedArea?.id),
          };
        }
        return survey;
      });
      cache.writeQuery({
        query: COMPANY_SURVEYS,
        variables: {
          input: {
            company_id: localStorage.getItem(COMPANY),
          },
        },
        data: {
          ...cachedData,
          company: {
            ...cachedData?.company,
            surveys: newSurveys,
          },
        },
      });
    } catch (e) {
      return e;
    }
  };

  const [assignArea, { data, error, loading }] = useMutation(UPDATE_AREA, {
    update: (cache, { data: updateData }) => assignAreaUpdate(cache, updateData),
  });

  const [deleteArea, { data: deleteData, loading: loadingDelete }] = useMutation(
    DELETE_ACTIVE_AREA,
    {
      update: (cache, { data: updateData }) => deleteAreaUpdate(cache, updateData),
    },
  );

  useSession([loading, loadingDelete], [error, deleteData]);

  const areasToRender = () => {
    return differentAreas.map((area) => {
      if (
        area.branches.filter(
          (branch) =>
            !active_areas?.some(
              (activeArea) =>
                activeArea.branch?.id === branch.id && area.ids.some((i) => i === activeArea.id),
            ),
        ).length
      )
        return {
          name: area.name,
          id: area.ids,
          colors: area.colors,
          branches: area.branches.filter(
            (branch) =>
              !active_areas?.some(
                (activeArea) =>
                  activeArea.branch?.id === branch.id && area.ids.some((i) => i === activeArea.id),
              ),
          ),
        };
      return null;
    });
  };

  if (data?.updateArea?.errors.length || deleteData?.deleteActiveSurvey?.errors.length) {
    // TODO handle error
  }

  return (
    <>
      <Row>
        <Cell
          style={{ maxWidth: widths[0] }}
          className="bold 14 pointer button ellipsis"
          onClick={() => history.push(`/${SURVEYS_TEXT}/${DETAILS_TEXT}/${id}`)}
        >
          {name}
        </Cell>
        <Cell className="large">
          <>
            <>
              {active_areas &&
                active_areas.map(
                  ({
                    name: areaName,
                    id: areaId,
                    branch,
                    colors,
                  }: surveys_company_surveys_active_areas) => (
                    <Div key={areaId}>
                      <AreaChip
                        disabled={loadingDelete}
                        style={{ backgroundColor: colors?.background, color: colors?.text }}
                        label={areaName}
                      />
                      <RightChip
                        disabled={loadingDelete}
                        style={{ backgroundColor: colors?.background, color: colors?.text }}
                        label={branch && branch.name}
                        deleteIcon={<IoIosClose color={colors?.text} />}
                        onDelete={() =>
                          deleteArea({ variables: { input: { id: areaId } } }).catch((e) => e)
                        }
                      />
                    </Div>
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
                  input={<Input readOnly disabled />}
                  renderValue={() => (
                    <>
                      <AddLink
                        style={{ visibility: anchorEl ? 'hidden' : 'visible' }}
                        type="button"
                        onClick={(e) => handleClick(e)}
                      >
                        {ASSIGN}
                      </AddLink>
                    </>
                  )}
                />
              </Form>
            </>
          </>
        </Cell>
        <Cell>
          <PopperComponent type={SURVEY} id={id} button={<BsThreeDots size="20" />} />
        </Cell>
        <PopoverAreaAndBranch
          data={
            areasToRender() as ({
              name: string;
              id: string;
              colors: surveys_company_different_areas_colors;
              branches: surveys_company_different_areas_branches[];
            } | null)[]
          }
          loading={loading}
          anchorRef={anchorEl}
          handleOutsideClick={handleOutsideClick}
          assignArea={assignArea}
          survey={id}
        />
      </Row>
      <TableDivider />
    </>
  );
};

export default SurveyRow;
