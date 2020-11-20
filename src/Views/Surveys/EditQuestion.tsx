/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, ApolloCache, useQuery } from '@apollo/client';
import { BeatLoader } from 'react-spinners';

import { MainLayout } from 'Layouts';
import {
  QUESTION_TEXT,
  SCALE,
  FACE,
  MULTIPLE_CHOICE,
  TEXT,
  CONTACT,
  CI,
  SURVEYS_TEXT,
  DETAILS_TEXT,
  EDIT_TEXT,
  FACE_TYPE,
  SCALE_TYPE,
  MULTIPLE_CHOICE_TYPE,
  TEXT_TYPE,
  CONTACT_TYPE,
  DOCUMENT_TYPE,
  EMAIL_TYPE,
  PHONE_NUMBER_TYPE,
  EMAIL,
  PHONE_NUMBER,
} from 'Utils/constants';
import { CancelButton } from 'Components/common/Form';
import { UPDATE_QUESTION } from 'api/mutations';
import { GET_SURVEY_QUESTIONS, GET_QUESTION } from 'api/queries';
import { getSurvey } from 'api/__generated__/getSurvey';
import CreateQuestionForm from 'Components/common/Form/CreateQuestionForm';
import { updateQuestion } from 'api/__generated__/updateQuestion';
import theme from 'theme';

import useSession from '../../Utils/session';
import { Background, Title, BackgroundContainer, Row } from './styles';

const QUESTION_TYPES = [
  { id: SCALE, name: 'Escala' },
  { id: FACE, name: 'Caras' },
  { id: MULTIPLE_CHOICE, name: 'Múltiple Opción' },
  { id: TEXT, name: 'Texto' },
  { id: CONTACT, name: 'Contacto' },
];

const EditQuestion = () => {
  const history = useHistory();
  const survey_id = window.location.pathname.split('/')[2];
  const question_id = window.location.pathname.split('/')[5];
  const [focused, setFocused] = useState({ type: false, subtype: false });
  const [name, setName] = useState('');
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

  const updateQuestionUpdate = (cache: ApolloCache<updateQuestion>, data?: updateQuestion) => {
    const updateQuestionData = data?.updateQuestion?.question;
    try {
      const cachedData = cache.readQuery<getSurvey>({
        query: GET_SURVEY_QUESTIONS,
        variables: {
          input: {
            survey_id,
          },
        },
      });
      if (cachedData?.survey) {
        if (updateQuestionData) {
          const newQuestions = cachedData.survey.questions?.map((question) => {
            if (question.id === question_id) return updateQuestionData;
            return question;
          });
          cache.writeQuery({
            query: GET_SURVEY_QUESTIONS,
            variables: {
              input: {
                survey_id,
              },
            },
            data: {
              ...cachedData,
              survey: {
                ...cachedData.survey,
                questions: newQuestions,
              },
            },
          });
        }
      }
    } catch (e) {
      return e;
    }
  };

  const [updateQuestionMutation, { data, error, loading }] = useMutation(UPDATE_QUESTION, {
    update: (cache, { data: updateData }) => updateQuestionUpdate(cache, updateData),
    onCompleted: () => history.push(`/${SURVEYS_TEXT}/${DETAILS_TEXT}/${survey_id}`),
  });

  const { data: questionData, error: errorQuestion, loading: loadingQuestion } = useQuery(
    GET_QUESTION,
    {
      variables: { input: { survey_id }, id: question_id },
    },
  );

  useSession([loading, loadingQuestion], [errorQuestion, error]);

  const questionType = () => {
    switch (questionData.survey.questions[0].type) {
      case SCALE_TYPE:
        return QUESTION_TYPES[0];
      case FACE_TYPE:
        return QUESTION_TYPES[1];
      case MULTIPLE_CHOICE_TYPE:
        return QUESTION_TYPES[2];
      case TEXT_TYPE:
        return QUESTION_TYPES[3];
      case CONTACT_TYPE:
        return QUESTION_TYPES[4];
      default:
        return QUESTION_TYPES[0];
    }
  };

  const questionSubtype = () => {
    switch (questionData.survey.questions[0].subtype) {
      case DOCUMENT_TYPE:
        return { id: 0, name: CI };
      case EMAIL_TYPE:
        return { id: 1, name: EMAIL };
      case PHONE_NUMBER_TYPE:
        return { id: 2, name: PHONE_NUMBER };
      default:
        return { id: 0, name: CI };
    }
  };

  useEffect(() => {
    if (questionData) {
      setName(questionData.survey.questions[0].text);
      setSelectedQuestionType(questionType());
      setDuration(questionData.survey.questions[0].duration.toString());
      setDescription(questionData.survey.questions[0].description);
      if (questionData.survey.questions[0].satisfaction_index)
        setSatisfaction(questionData.survey.questions[0].satisfaction_index.toString());
      setSubType(questionSubtype());
      if (questionData.survey.questions[0].options.length) {
        setOptions(
          questionData.survey.questions[0].options.map(
            (option: { text: string }, index: number) => {
              return { op: index + 1, value: option.text };
            },
          ),
        );
      }
    }
  }, [questionData]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, isSubtype: boolean) => {
    if (isSubtype) {
      if (anchorRefSubType) setAnchorRefSubType(null);
      setFocused({ ...focused, subtype: true });
      setAnchorRefSubType(e.currentTarget);
    }
  };

  const handleOutsideClick = () => {
    if (anchorRefSubType) {
      setAnchorRefSubType(null);
      setFocused({ ...focused, subtype: false });
    }
  };

  const handleIndex = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reg = /^[1-5]$/;
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
    if (data?.createQuestion?.success)
      history.push(`/${SURVEYS_TEXT}/${DETAILS_TEXT}/${survey_id}`);
  }, [data?.createQuestion?.success]);

  // TODO handle errors

  return (
    <MainLayout>
      <Background>
        {loadingQuestion ? (
          <Row className="full">
            <BeatLoader color={theme.palette.primary[75]} />
          </Row>
        ) : (
          <BackgroundContainer>
            <Row>
              <Title className="new">{`${EDIT_TEXT} ${QUESTION_TEXT}`}</Title>
              <CancelButton
                onClick={() => history.push(`/${SURVEYS_TEXT}/${DETAILS_TEXT}/${survey_id}`)}
              />
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
              mutation={updateQuestionMutation}
              addOptions={addOptions}
              setDurationError={setDurationError}
              handleOutsideClick={handleOutsideClick}
              setSelectedQuestionType={setSelectedQuestionType}
              setSubType={setSubType}
              anchorRefSubType={anchorRefSubType}
              survey_id={survey_id}
              isNew={false}
              loading={loading}
            />
          </BackgroundContainer>
        )}
      </Background>
    </MainLayout>
  );
};

export default EditQuestion;
