/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, ApolloCache, useQuery } from '@apollo/client';
import { BeatLoader } from 'react-spinners';

import useNavigation from 'Utils/navigation';
import { NAME, SURVEYS_TEXT, SAVE, EDIT, SURVEY, COMPANY } from 'Utils/constants';
import { MainLayout } from 'Layouts';
import { CancelButton } from 'Components/common/Form';
import { GET_SURVEY } from 'api/queries';
import {
  BackgroundContainer,
  FormContainer,
  Title,
  InputsContainer,
  InputContainer,
  InputLabel,
  Input,
  Error,
} from 'Components/common/Form/styles';
import { UPDATE_SURVEY } from 'api/mutations';
import { AddButton } from 'Components/common/Buttons';
import { updateSurvey } from 'api/__generated__/updateSurvey';
import { survey } from 'api/__generated__/survey';
import theme from 'theme';

import useSession from '../../Utils/session';
import { Background } from '../BranchOffices/styles';
import { Row } from './styles';

const EditSurvey = () => {
  useNavigation();
  const history = useHistory();
  const survey_id = window.location.pathname.split('/')[3];
  const [errorMessage, setErrorMessage] = useState(' ');
  const [name, setName] = useState('');

  const { data: questionData, error: errorSurvey, loading: loadingSurvey } = useQuery(GET_SURVEY, {
    variables: { input: { company_id: localStorage.getItem(COMPANY) }, id: survey_id },
  });

  useEffect(() => {
    if (questionData) setName(questionData.company.surveys[0].name);
  }, [questionData]);

  const updateCacheSurvey = (cache: ApolloCache<updateSurvey>, data?: updateSurvey | null) => {
    const updateSurveyData = data?.updateSurvey?.survey;
    try {
      const cachedData = cache.readQuery<survey>({
        query: GET_SURVEY,
        variables: {
          input: {
            company_id: localStorage.getItem(COMPANY),
          },
          id: survey_id,
        },
      });
      if (cachedData?.company?.surveys) {
        if (updateSurveyData) {
          cache.writeQuery({
            query: GET_SURVEY,
            variables: {
              input: {
                company_id: localStorage.getItem(COMPANY),
              },
              id: survey_id,
            },
            data: {
              ...cachedData,
              company: {
                surveys: [updateSurveyData],
              },
            },
          });
        }
      }
    } catch (error) {
      return error;
    }
  };

  const [updateSurveyMutation, { error, loading }] = useMutation(UPDATE_SURVEY, {
    update(cache, { data: updateData }) {
      updateCacheSurvey(cache, updateData);
    },
    onCompleted: ({ updateSurvey: newSurvey }) => {
      if (newSurvey && !newSurvey.success && newSurvey.errors)
        setErrorMessage(newSurvey?.errors[0]);
      if (newSurvey && newSurvey.success) history.push(`/${SURVEYS_TEXT}`);
    },
  });

  useSession([loading, loadingSurvey], [error, errorSurvey]);

  return (
    <MainLayout>
      <Background>
        {loadingSurvey ? (
          <Row className="full">
            <BeatLoader color={theme.palette.primary[75]} />
          </Row>
        ) : (
          <BackgroundContainer>
            <FormContainer>
              <Title>{`${EDIT} ${SURVEY}`}</Title>
              <InputsContainer>
                <InputContainer key={NAME}>
                  <InputLabel>{NAME}</InputLabel>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="off"
                  />
                </InputContainer>
              </InputsContainer>
              <Error className="start">{errorMessage}</Error>
              <div>
                <AddButton
                  loading={loading}
                  text={SAVE}
                  handleClick={() => {
                    updateSurveyMutation({ variables: { input: { id: survey_id, name } } }).catch(
                      (e) => e,
                    );
                  }}
                />
              </div>
            </FormContainer>
            <CancelButton onClick={() => history.push(`/${SURVEYS_TEXT}`)} />
          </BackgroundContainer>
        )}
      </Background>
    </MainLayout>
  );
};

export default EditSurvey;
