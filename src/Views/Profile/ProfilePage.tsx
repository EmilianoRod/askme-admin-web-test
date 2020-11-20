import React from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { BeatLoader } from 'react-spinners';

import {
  BackgroundContainer,
  FormContainer,
  Title,
  InputLabel,
} from 'Components/common/Form/styles';
import {
  EMAIL,
  PROFILE_INFO,
  PASSWORD,
  PROFILE_TEXT,
  EDIT_TEXT,
  VISUALIZATOR_USER,
} from 'Utils/constants';
import { ME } from 'api/queries';
import { me } from 'api/__generated__/me';
import useNavigation from 'Utils/navigation';
import { RowContainer } from 'Components/Charts/styles';
import theme from 'theme';

import { getEmail } from 'Utils';
import useSession from '../../Utils/session';
import { Background } from '../BranchOffices/styles';
import { Label, ColumnContainer } from './styles';
import MainLayout from '../../Layouts/mainLayout';
import { EditButton } from '../../Components/common/Buttons';

const ProfilePage = () => {
  const { data: meData, error, loading } = useQuery<me>(ME);
  const isVisualizator = localStorage.getItem('user') === VISUALIZATOR_USER;

  useSession([loading], [error]);
  const history = useHistory();
  useNavigation(true);
  return (
    <MainLayout>
      <Background>
        <BackgroundContainer className="small">
          <FormContainer>
            <Title>{PROFILE_INFO}</Title>
            {!loading ? (
              meData &&
              meData.me && (
                <ColumnContainer>
                  <ColumnContainer className="margin">
                    <InputLabel>{EMAIL}</InputLabel>
                    <Label>{getEmail()}</Label>
                  </ColumnContainer>
                  <ColumnContainer>
                    <InputLabel>{PASSWORD}</InputLabel>
                    <Label>********</Label>
                  </ColumnContainer>
                </ColumnContainer>
              )
            ) : (
              <RowContainer className="center large">
                <BeatLoader color={theme.palette.primary[75]} />
              </RowContainer>
            )}
          </FormContainer>
          <EditButton
            disabled={!isVisualizator}
            onClick={() => history.push(`/${PROFILE_TEXT}/${EDIT_TEXT}`)}
          />
        </BackgroundContainer>
      </Background>
    </MainLayout>
  );
};

export default ProfilePage;
