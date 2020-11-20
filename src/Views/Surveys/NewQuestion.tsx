/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, ApolloCache } from '@apollo/client';

import { MainLayout } from 'Layouts';
import {
  NEW_TEXT,
  QUESTION_TEXT,
  SCALE,
  FACE,
  MULTIPLE_CHOICE,
  TEXT,
  CONTACT,
  CI,
  SURVEYS_TEXT,
  DETAILS_TEXT,
} from 'Utils/constants';
import { CancelButton } from 'Components/common/Form';
import { CREATE_QUESTION } from 'api/mutations';
import { createQuestion } from 'api/__generated__/createQuestion';
import { GET_SURVEY_QUESTIONS } from 'api/queries';
import { getSurvey } from 'api/__generated__/getSurvey';
import CreateQuestionForm from 'Components/common/Form/CreateQuestionForm';

import useSession from '../../Utils/session';
import { Background, Title, BackgroundContainer, Row } from './styles';

const QUESTION_TYPES = [
  { id: SCALE, name: 'Escala' },
  { id: FACE, name: 'Caras' },
  { id: MULTIPLE_CHOICE, name: 'Múltiple Opción' },
  { id: TEXT, name: 'Texto' },
  { id: CONTACT, name: 'Contacto' },
];

const NewQuestion = () => {
  const history = useHistory();
  const id = window.location.pathname.split('/')[2];
  const [focused, setFocused] = useState({ type: false, subtype: false });
  const [name, setName] = useState('');
  const [anchorRef, setAnchorRef] = useState<HTMLDivElement | null>(null);
  const [anchorRefSubType, setAnchorRefSubType] = useState<HTMLDivElement | null>(null);
  const [selectedQuestionType, setSelectedQuestionType] = useState(QUESTION_TYPES[0]);
  const [duration, setDuration] = useState('30');
  const [durationError, setDurationError] = useState(false);
  const [description, setDescription] = useState('');
  const [satisfaction, setSatisfaction] = useState<string>('');
  const [subType, setSubType] = useState<{ id: number; name: string }>({ id: 0, name: CI });
  const [options, setOptions] = useState([
    { op: 1, value: '' },
    { op: 2, value: '' },
  ]);

  useEffect(() => {
    setSatisfaction('');
  }, [selectedQuestionType]);

  const createQuestionUpdate = (cache: ApolloCache<createQuestion>, data?: createQuestion) => {
    const createQuestionData = data?.createQuestion?.question;
    try {
      const cachedData = cache.readQuery<getSurvey>({
        query: GET_SURVEY_QUESTIONS,
        variables: {
          input: {
            survey_id: id,
          },
        },
      });
      if (cachedData?.survey) {
        if (createQuestionData) {
          cache.writeQuery({
            query: GET_SURVEY_QUESTIONS,
            variables: {
              input: {
                survey_id: id,
              },
            },
            data: {
              ...cachedData,
              survey: {
                ...cachedData.survey,
                questions: cachedData?.survey?.questions?.length
                  ? [...cachedData?.survey?.questions, createQuestionData]
                  : [createQuestionData],
              },
            },
          });
        }
      }
    } catch (e) {
      return e;
    }
  };

  const [createQuestionMutation, { data, error, loading }] = useMutation(CREATE_QUESTION, {
    update: (cache, { data: createData }) => createQuestionUpdate(cache, createData),
  });

  useSession([loading], [error]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, isSubtype: boolean) => {
    if (isSubtype) {
      if (anchorRefSubType) setAnchorRefSubType(null);
      setFocused({ ...focused, subtype: true });
      setAnchorRefSubType(e.currentTarget);
    } else {
      if (anchorRef) setAnchorRef(null);
      setFocused({ ...focused, type: true });
      setAnchorRef(e.currentTarget);
    }
  };

  const handleOutsideClick = () => {
    if (anchorRef) {
      setAnchorRef(null);
      setFocused({ ...focused, type: false });
    }
    if (anchorRefSubType) {
      setAnchorRefSubType(null);
      setFocused({ ...focused, subtype: false });
    }
  };

  const handleIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = selectedQuestionType.id === SCALE ? /^(1[0]|[0-9])$/ : /^[1-5]$/;
    if (!e.target.value) setSatisfaction('');
    if (reg.test(e.target.value)) setSatisfaction(e.target.value);
  };

  const handleDuration = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = /^[0-9]*$/;
    if (reg.test(e.target.value)) {
      if (!e.target.value) setDuration('');
      setDuration(e.target.value);
    }
  };

  const addOptions = (e: React.ChangeEvent<HTMLInputElement>, index: number) =>
    setOptions(
      options.map((option, ind) => {
        return ind === index ? { op: index + 2, value: e.target.value } : option;
      }),
    );

  useEffect(() => {
    if (data?.createQuestion?.success) history.push(`/${SURVEYS_TEXT}/${DETAILS_TEXT}/${id}`);
  }, [data?.createQuestion?.success]);

  return (
    <MainLayout>
      <Background>
        <BackgroundContainer>
          <Row>
            <Title className="new">{`${NEW_TEXT} ${QUESTION_TEXT}`}</Title>
            <CancelButton onClick={() => history.push(`/${SURVEYS_TEXT}/${DETAILS_TEXT}/${id}`)} />
          </Row>
          <CreateQuestionForm
            data={data}
            name={name}
            setName={setName}
            focused={focused}
            handleClick={handleClick}
            selectedQuestionType={selectedQuestionType}
            duration={duration}
            durationError={durationError}
            handleDuration={handleDuration}
            satisfaction={satisfaction}
            handleIndex={handleIndex}
            description={description}
            setDescription={setDescription}
            subType={subType}
            options={options}
            setOptions={setOptions}
            mutation={createQuestionMutation}
            addOptions={addOptions}
            setDurationError={setDurationError}
            handleOutsideClick={handleOutsideClick}
            anchorRef={anchorRef}
            setSelectedQuestionType={setSelectedQuestionType}
            setSubType={setSubType}
            anchorRefSubType={anchorRefSubType}
            survey_id={id}
            isNew
            loading={loading}
          />
        </BackgroundContainer>
      </Background>
    </MainLayout>
  );
};

export default NewQuestion;
