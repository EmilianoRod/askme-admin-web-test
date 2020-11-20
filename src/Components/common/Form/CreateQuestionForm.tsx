/* eslint-disable react/jsx-curly-newline */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import { RiArrowDownSLine } from 'react-icons/ri';

import {
  QUESTION_TEXT,
  TYPE,
  DURATION,
  SCALE,
  FACE,
  MULTIPLE_CHOICE,
  TEXT,
  CONTACT,
  SATISFACTION_INDEX,
  DESCRIPTION,
  CI,
  EMAIL,
  PHONE_NUMBER,
  SUBTYPE,
  OPTION,
  ADD_OPTION,
  SAVE,
  TEXT_CANT_BE_BLANK,
  REQUIRED_FIELD,
} from 'Utils/constants';
import { InputContainer, InputLabel, Input, Error, TextArea } from 'Components/common/Form/styles';
import { Form, SelectCont } from 'Views/Results/styles';
import PopoverList from 'Components/SelectList/PopoverList';
import { company_company_surveys } from 'api/__generated__/company';
import { BlackCross } from 'Assets/Images';
import { AddLink } from 'Components/TableElements/styles';
import { AddButton } from 'Components/common/Buttons';
import { createQuestion } from 'api/__generated__/createQuestion';
import {
  Row,
  Body,
  InputSelect,
  CrossImg,
  Flex,
  EmptyInput,
  ButtonDiv,
} from 'Views/Surveys/styles';
import { MutationFunctionOptions } from '@apollo/client';

const QUESTION_TYPES = [
  { id: SCALE, name: 'Escala' },
  { id: FACE, name: 'Caras' },
  { id: MULTIPLE_CHOICE, name: 'Múltiple Opción' },
  { id: TEXT, name: 'Texto' },
  { id: CONTACT, name: 'Contacto' },
];

export interface CreateQuestionFormProps {
  data: createQuestion;
  name: string;
  survey_id: string;
  setName: (newName: string) => void;
  focused: { type: boolean; subtype: boolean };
  handleClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>, isSubtype: boolean) => void;
  selectedQuestionType: { id: string; name: string };
  setSelectedQuestionType: (setSelectedQuetionType: { id: string; name: string }) => void;
  duration: string;
  handleDuration: (e: React.ChangeEvent<HTMLInputElement>) => void;
  durationError: boolean;
  setDurationError: (newDuration: boolean) => void;
  satisfaction: string;
  handleIndex: (e: React.ChangeEvent<HTMLInputElement>) => void;
  description: string;
  setDescription: (newDescription: string) => void;
  subType: { id: number; name: string };
  setSubType: (newSubtype: { id: number; name: string }) => void;
  options: { op: number; value: string }[];
  setOptions: (newOption: { op: number; value: string }[]) => void;
  mutation: (
    options?: MutationFunctionOptions<unknown, Record<string, unknown>> | undefined,
  ) => void;
  addOptions: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  handleOutsideClick: () => void;
  anchorRef?: HTMLDivElement | null;
  anchorRefSubType: HTMLDivElement | null;
  isNew: boolean;
  loading: boolean;
}

const CreateQuestionForm = ({
  data,
  name,
  setName,
  focused,
  handleClick,
  selectedQuestionType,
  duration,
  durationError,
  handleDuration,
  satisfaction,
  handleIndex,
  description,
  setDescription,
  subType,
  options,
  setOptions,
  mutation,
  addOptions,
  setDurationError,
  handleOutsideClick,
  anchorRef,
  setSelectedQuestionType,
  setSubType,
  anchorRefSubType,
  survey_id,
  isNew,
  loading,
}: CreateQuestionFormProps) => {
  const [durationFocused, setFocus] = useState(false);

  const setClassName = () => {
    if (durationError) return 'error question';
    if (durationFocused) return 'focus question';
    return 'question';
  };

  return (
    <>
      <div>
        <InputContainer className="questionName">
          <InputLabel className="capitalize">{`${QUESTION_TEXT}*`}</InputLabel>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={
              data?.createQuestion?.errors && data?.createQuestion?.errors[0] === TEXT_CANT_BE_BLANK
                ? 'error questionName'
                : 'questionName'
            }
            autoComplete="off"
          />
          <Error>
            {data?.createQuestion?.errors && data?.createQuestion?.errors[0] === TEXT_CANT_BE_BLANK
              ? REQUIRED_FIELD
              : ''}
          </Error>
        </InputContainer>
        <Row className="input">
          <InputContainer className="question margin">
            <InputLabel>{`${TYPE}*`}</InputLabel>
            <Form className="question" disabled={!isNew}>
              <SelectCont
                disabled={!isNew}
                className={focused.type ? 'focused question' : 'question'}
                onClick={(e) => handleClick(e, false)}
                open={false}
                displayEmpty
                renderValue={() => <Body>{selectedQuestionType.name}</Body>}
                value={selectedQuestionType.name}
                input={<InputSelect />}
                IconComponent={() =>
                  isNew ? <RiArrowDownSLine size="30px" color="#00B642" /> : null
                }
              />
            </Form>
            <Error />
          </InputContainer>
          <InputContainer className="question">
            <InputLabel>{`${DURATION}*`}</InputLabel>
            <Flex className={setClassName()}>
              <EmptyInput
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                value={duration}
                onChange={(e) => handleDuration(e)}
                className="question"
                autoComplete="off"
              />
              <Body className="abs">s</Body>
            </Flex>
            <Error>{durationError ? REQUIRED_FIELD : ''}</Error>
          </InputContainer>
        </Row>
        {selectedQuestionType.id === FACE && (
          <InputContainer className="question">
            <InputLabel>{SATISFACTION_INDEX}</InputLabel>
            <Input
              className="question"
              type="text"
              value={satisfaction}
              onChange={(e) => handleIndex(e)}
              autoComplete="off"
            />
          </InputContainer>
        )}
        {selectedQuestionType.id === CONTACT && (
          <>
            <InputContainer>
              <InputLabel>{DESCRIPTION}</InputLabel>
              <TextArea
                className="questionName"
                placeholder={DESCRIPTION}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </InputContainer>
            <InputContainer className="question margin">
              <InputLabel>{`${SUBTYPE}*`}</InputLabel>
              <Form className="question">
                <SelectCont
                  className={focused.subtype ? 'focused question' : 'question'}
                  onClick={(e) => handleClick(e, true)}
                  open={false}
                  displayEmpty
                  renderValue={() => <Body>{subType.name}</Body>}
                  value={subType.name}
                  input={<InputSelect />}
                  IconComponent={() => <RiArrowDownSLine size="30px" color="#00B642" />}
                />
              </Form>
            </InputContainer>
          </>
        )}
        {selectedQuestionType.id === MULTIPLE_CHOICE && (
          <>
            {options.map(({ value }, index) => (
              <InputContainer>
                <InputLabel>{`${OPTION} ${index + 1}${index < 2 ? '*' : ''}`}</InputLabel>
                <Row className="input">
                  <Input
                    value={value}
                    className="questionName"
                    placeholder={`${OPTION} ${index + 1}`}
                    onChange={(e) => addOptions(e, index)}
                  />
                  {index !== 0 && index !== 1 && (
                    <CrossImg
                      onClick={() => {
                        if (options.length > 2)
                          setOptions(options.filter((_opt, ind) => index !== ind));
                      }}
                      src={BlackCross}
                    />
                  )}
                </Row>
              </InputContainer>
            ))}
            {options.length < 6 && (
              <AddLink
                onClick={() => setOptions([...options, { op: options.length + 1, value: '' }])}
                className="margin"
              >
                {ADD_OPTION}
              </AddLink>
            )}
          </>
        )}
      </div>
      <ButtonDiv>
        {data && data?.createQuestion?.errors && data?.createQuestion?.errors[0] && (
          <Error>{data?.createQuestion?.errors[0]}</Error>
        )}
        <AddButton
          loading={loading}
          text={SAVE}
          handleClick={() => {
            if (duration) {
              try {
                mutation(
                  isNew
                    ? {
                        variables: {
                          input: {
                            survey_id,
                            text: name,
                            type: selectedQuestionType.id,
                            duration: parseInt(duration, 10),
                            description,
                            satisfaction_index: parseInt(satisfaction, 10),
                            subtype: subType.id,
                            multiple_choice_answers: options.map(({ value }) => {
                              if (value) return value;
                            }),
                          },
                        },
                      }
                    : {
                        variables: {
                          input: {
                            id: window.location.pathname.split('/')[5],
                            text: name,
                            duration: parseInt(duration, 10),
                            description,
                            satisfaction_index: parseInt(satisfaction, 10),
                            subtype: subType.id,
                            multiple_choice_answers: options.map(({ value }) => {
                              if (value) return value;
                            }),
                          },
                        },
                      },
                );
              } catch (e) {
                return e;
              }
            } else {
              setDurationError(true);
            }
          }}
        />
      </ButtonDiv>
      {anchorRef && (
        <PopoverList
          data={QUESTION_TYPES}
          handleOutsideClick={handleOutsideClick}
          anchorRef={anchorRef}
          setSelected={
            setSelectedQuestionType as (
              item: company_company_surveys | { id: string | number; name: string },
            ) => void
          }
          className="question"
        />
      )}
      <PopoverList
        data={[
          { id: 0, name: CI },
          { id: 1, name: EMAIL },
          { id: 2, name: PHONE_NUMBER },
        ]}
        handleOutsideClick={handleOutsideClick}
        anchorRef={anchorRefSubType}
        setSelected={
          setSubType as (
            item: company_company_surveys | { id: string | number; name: string },
          ) => void
        }
        className="question"
      />
    </>
  );
};

export default CreateQuestionForm;
