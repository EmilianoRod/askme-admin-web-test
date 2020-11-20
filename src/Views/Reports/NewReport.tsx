import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery, ApolloCache } from '@apollo/client';
import * as yup from 'yup';
import { IoIosClose } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { RiArrowDownSLine } from 'react-icons/ri';
import { decamelizeKeys } from 'humps';
import { BeatLoader } from 'react-spinners';

import { MainLayout } from 'Layouts';
import {
  REQUIRED_FIELD,
  INVALID_EMAIL,
  EMAIL_TEXT,
  COMPANY,
  DAILY,
  WEEKLY,
  MONTHLY,
  NAME,
  LAST_NAME,
  ASSIGN_BRANCH_OFFICE_AND_AREA,
  ADD_REPORT,
  REPORTS_TEXT,
  PERIOD,
  NAME_TEXT,
  LAST_NAME_TEXT,
  CONFIRM,
  ADD,
  ALL,
  ADD_ANOTHER,
  SELECT_BRANCH_OFFICES,
} from 'Utils/constants';
import { filterAreas, emailMatch } from 'Utils';
import { CancelButton } from 'Components/common/Form';
import useNavigation from 'Utils/navigation';
import {
  InputContainer,
  InputLabel,
  Error,
  Form,
  Input as TextInput,
  Button,
} from 'Components/common/Form/styles';
import { SelectCont, Form as SelectForm, Body, Input } from 'Views/Results/styles';
import PopoverList from 'Components/SelectList/PopoverList';
import PopoverBranchAndAreaList from 'Components/SelectList/PopoverBranchAndAreaList';
import { Background, Title, BackgroundContainer, Row } from 'Views/Admins/styles';
import { AddLink, AreaChip } from 'Components/TableElements/styles';
import {
  getCompanyBranches_company_branches,
  getCompanyBranches,
} from 'api/__generated__/getCompanyBranches';
import { GET_COMPANY_BRANCHES } from 'api/queries';
import { RightChip, StyledDiv, DivList, Div } from './styles';
import theme from '../../theme';

const PERIOD_TYPES = [
  { id: DAILY, name: DAILY },
  { id: WEEKLY, name: WEEKLY },
  { id: MONTHLY, name: MONTHLY },
];

const NewReport = () => {
  useNavigation();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    validationSchema: yup.object().shape({
      email: yup.string().required(REQUIRED_FIELD).matches(emailMatch, INVALID_EMAIL),
      name: yup.string().required(REQUIRED_FIELD),
      lastName: yup.string().required(REQUIRED_FIELD),
    }),
    defaultValues: { email: '', name: '', lastName: '' },
  });

  const [selectedPeriod, setSelectedPeriod] = useState(PERIOD_TYPES[0]);
  const [branchError, setBranchError] = useState('');
  const [focused, setFocused] = useState({ period: false, branchArea: false });
  const [anchorRefPeriod, setAnchorRefPeriod] = useState<HTMLDivElement | null>(null);
  const [anchorRefBranchArea, setAnchorRefBranchArea] = useState<HTMLDivElement | null>(null);
  const [companyBranches, setCompanyBranches] = useState<getCompanyBranches_company_branches[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<getCompanyBranches_company_branches[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<{ name: string; ids: string[] }[]>([]);
  const [alreadySelectedAreasAndBranches, setAlreadySelectedAreasAndBranches] = useState<
    {
      branches: getCompanyBranches_company_branches[];
      areas: SelectedAreasInterface[];
    }[]
  >([]);

  const handleClick = (e: any, isPeriod: boolean) => {
    if (isPeriod) {
      if (anchorRefPeriod) setAnchorRefPeriod(null);
      setFocused({ ...focused, period: true });
      setAnchorRefPeriod(e.currentTarget);
    } else {
      if (anchorRefBranchArea) setAnchorRefBranchArea(null);
      setFocused({ ...focused, branchArea: true });
      setAnchorRefBranchArea(e.currentTarget);
    }
  };

  const handleOutsideClick = (isSaved: boolean) => {
    if (anchorRefPeriod) {
      setAnchorRefPeriod(null);
      setFocused({ ...focused, period: false });
    } else if (anchorRefBranchArea) {
      setAnchorRefBranchArea(null);
      setFocused({ ...focused, branchArea: false });
      if (isSaved) {
        const selectedAreasBranches = { branches: selectedBranch, areas: selectedAreas };
        setAlreadySelectedAreasAndBranches([
          ...alreadySelectedAreasAndBranches,
          selectedAreasBranches,
        ]);
      }
      setSelectedBranch([]);
      setSelectedAreas([]);
    }
  };

  const onSubmit = handleSubmit((formValues) => {
    if (!alreadySelectedAreasAndBranches.length) setBranchError(SELECT_BRANCH_OFFICES);

    // TODO handle submit
  });

  const { data: branches } = useQuery<getCompanyBranches>(GET_COMPANY_BRANCHES, {
    variables: {
      input: decamelizeKeys({
        companyId: localStorage.getItem(COMPANY),
      }),
    },
    onCompleted: () => {
      setCompanyBranches(
        (branches?.company?.branches
          ?.map(({ name, areas, id }) => {
            return { name, areas, id };
          })
          .flat() as unknown) as getCompanyBranches_company_branches[],
      );
    },
  });

  const inputData: { label: string; name: 'name' | 'email' | 'lastName' }[] = [
    {
      label: NAME,
      name: NAME_TEXT,
    },
    {
      label: LAST_NAME,
      name: LAST_NAME_TEXT,
    },
    {
      label: EMAIL_TEXT,
      name: EMAIL_TEXT,
    },
  ];

  const handleDelete = (id: string) => {
    setAlreadySelectedAreasAndBranches(
      alreadySelectedAreasAndBranches?.filter(
        (selectedBranchArea) => selectedBranchArea.areas[0].ids[0] !== id,
      ),
    );
  };

  const addNames = (
    namesToRender: (SelectedAreasInterface | getCompanyBranches_company_branches)[],
    isArea: boolean,
  ) => {
    let allNames = isArea ? '/ ' : '';
    namesToRender.forEach(({ name }, index) => {
      allNames += `${name}${index + 1 === namesToRender.length ? '' : ', '}`;
    });
    return allNames;
  };

  const renderBranchOfficeAreaName = (
    branchesToRender: getCompanyBranches_company_branches[],
    areasToRender: SelectedAreasInterface[],
  ) => {
    let branchNames = '';
    let areaNames = '';
    if (branchesToRender.length) {
      branchNames = addNames(branchesToRender, false);
      areaNames = addNames(areasToRender, true);
    }
    return branchesToRender.length ? (
      <StyledDiv>
        <AreaChip
          className="link ticket"
          label={branchesToRender.length === companyBranches.length ? ALL : branchNames}
        />
        <RightChip
          className="link"
          label={
            areasToRender.length &&
            areasToRender.length ===
              filterAreas(branchesToRender, alreadySelectedAreasAndBranches, true).length
              ? `/ ${ALL}`
              : areaNames
          }
          deleteIcon={<IoIosClose color={theme.palette.primary[100]} style={{ width: '50px' }} />}
          onDelete={() => handleDelete(areasToRender[0].ids[0])}
        />
      </StyledDiv>
    ) : (
      <div />
    );
  };

  const renderBranchAreaNames = () => (
    <Div>
      {alreadySelectedAreasAndBranches.map((branchArea) =>
        renderBranchOfficeAreaName(branchArea.branches, branchArea.areas),
      )}
      {renderBranchOfficeAreaName(selectedBranch, selectedAreas)}
    </Div>
  );

  const hasError = (name: string) => Object.keys(errors).find((error) => error === name);

  const renderInput = ({ label, name }: { label: string; name: 'name' | 'email' | 'lastName' }) => (
    <InputContainer className="question margin">
      <InputLabel className="capitalize">{label}</InputLabel>
      <TextInput
        className={hasError(name) ? 'error question' : 'question'}
        type="text"
        name={name}
        autoComplete="off"
        ref={register()}
      />
      <Error>{hasError(name) && errors[name]?.message}</Error>
    </InputContainer>
  );
  return (
    <MainLayout>
      <Background>
        <BackgroundContainer className="start">
          <Row className="margin">
            <Title className="new">{ADD_REPORT}</Title>
            <CancelButton onClick={() => history.push(`/${REPORTS_TEXT}`)} />
          </Row>
          <Form className="start">
            <Row className="input">
              {renderInput(inputData[0])}
              {renderInput(inputData[1])}
            </Row>
            <Row className="input start">
              {renderInput(inputData[2])}
              <InputContainer className="question margin">
                <InputLabel>{PERIOD}</InputLabel>
                <SelectForm className="question">
                  <SelectCont
                    className={focused.period ? 'focused' : 'question'}
                    open={false}
                    displayEmpty
                    onClick={(e) => handleClick(e, true)}
                    renderValue={() => <Body>{selectedPeriod.name}</Body>}
                    value={selectedPeriod.name}
                    input={<Input />}
                    IconComponent={() => (
                      <RiArrowDownSLine size="30px" color={theme.palette.primary[75]} />
                    )}
                  />
                </SelectForm>
              </InputContainer>
              {anchorRefPeriod && (
                <PopoverList
                  data={PERIOD_TYPES}
                  anchorRef={anchorRefPeriod}
                  setSelected={
                    setSelectedPeriod as (item: { id: string | number; name: string }) => void
                  }
                  handleOutsideClick={() => handleOutsideClick(false)}
                  className="question"
                />
              )}
            </Row>
            <Row className="input start">
              <InputContainer className="question margin minWidth">
                <InputLabel>{ASSIGN_BRANCH_OFFICE_AND_AREA}</InputLabel>
                <DivList className="bold lower">
                  <SelectCont
                    className="fullWidth"
                    open={false}
                    IconComponent={() => null}
                    displayEmpty
                    multiple
                    input={<Input readOnly disabled />}
                    renderValue={renderBranchAreaNames}
                  />
                  <AddLink
                    style={{ visibility: anchorRefBranchArea ? 'hidden' : 'visible' }}
                    type="button"
                    className="green"
                    onClick={(e) => handleClick(e, false)}
                  >
                    {alreadySelectedAreasAndBranches.length ? ADD_ANOTHER : ADD}
                  </AddLink>
                </DivList>
                <Error>{branchError}</Error>
              </InputContainer>
              {anchorRefBranchArea && (
                <PopoverBranchAndAreaList
                  anchorRef={anchorRefBranchArea}
                  handleOutsideClick={() => handleOutsideClick(false)}
                  handleSaveClick={() => handleOutsideClick(true)}
                  data={companyBranches}
                  alreadyselectedBranchAreas={alreadySelectedAreasAndBranches}
                  setSelectedBranchOffice={setSelectedBranch}
                  selectedBranchOffice={selectedBranch}
                  selectedAreas={selectedAreas}
                  setSelectedAreas={setSelectedAreas}
                />
              )}
            </Row>
            <Button type="button" onClick={onSubmit}>
              {CONFIRM}
            </Button>
          </Form>
        </BackgroundContainer>
      </Background>
    </MainLayout>
  );
};
export default NewReport;
