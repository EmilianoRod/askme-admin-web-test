import React, { useEffect, useState, createContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import LogInPage from 'Views/LogIn/LogInPage';
import ResultsPage, { ResultsDetail, ContactDetail, TextDetail } from 'Views/Results';
import EditQuestion from 'Views/Surveys/EditQuestion';
import ProfilePage, { EditProfile } from 'Views/Profile';
import SurveySummary from 'Views/Results/SurveySummary';
import NewAdmin from 'Views/Admins/NewAdmin';
import EditAdmin from 'Views/Admins/EditAdmin';
import NewTablet from 'Views/Tablets/NewTablet';
import { ME } from 'api/queries';
import SessionExpiredModal from 'Components/Modal/SessionExpiredModal';
import EditTablet from 'Views/Tablets/EditTablet';
import ReportsPage from 'Views/Reports/ReportsPage';
import AdminsPage from './Views/Admins/AdminsPage';
import DesignPage from './Views/Design/DesignPage';
import NewReport from './Views/Reports/NewReport';
import OfficesPage, {
  NewBranchOffice,
  DetailBranchOffice,
  EditBranchOffice,
  NewArea,
} from './Views/BranchOffices';
import SurveysPage, { NewSurvey, SurveyDetails, NewQuestion, EditSurvey } from './Views/Surveys';
import TabletsPage from './Views/Tablets/TabletsPage';
import {
  ADMINS_TEXT,
  DESIGN_TEXT,
  SURVEYS_TEXT,
  RESULTS_TEXT,
  BRANCH_OFFICES_TEXT,
  TABLET_TEXT,
  NEW_TEXT,
  DETAILS_TEXT,
  EDIT_TEXT,
  AREAS,
  QUESTION_TEXT,
  TEXT,
  CONTACT_ES,
  PROFILE_TEXT,
  COMPANY,
  REPORTS_TEXT,
} from './Utils/constants';

export const SessionContext = createContext({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => {},
});

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { error, loading } = useQuery(ME);

  useEffect(() => {
    if (error !== undefined && localStorage.getItem(COMPANY)) setIsOpen(true);
  }, [loading]);

  return (
    <>
      <SessionContext.Provider value={{ isOpen, setIsOpen }}>
        <Switch>
          <Route exact path="/">
            <LogInPage />
          </Route>
          <Route exact path={`/${ADMINS_TEXT}`}>
            <AdminsPage />
          </Route>
          <Route exact path={`/${ADMINS_TEXT}/${NEW_TEXT}`}>
            <NewAdmin />
          </Route>
          <Route exact path={`/${ADMINS_TEXT}/${EDIT_TEXT}/:id`}>
            <EditAdmin />
          </Route>
          <Route exact path={`/${DESIGN_TEXT}`}>
            <DesignPage />
          </Route>
          <Route exact path={`/${SURVEYS_TEXT}`}>
            <SurveysPage />
          </Route>
          <Route exact path={`/${SURVEYS_TEXT}/${NEW_TEXT}`}>
            <NewSurvey />
          </Route>
          <Route exact path={`/${SURVEYS_TEXT}/${EDIT_TEXT}/:id`}>
            <EditSurvey />
          </Route>
          <Route exact path={`/${SURVEYS_TEXT}/${DETAILS_TEXT}/:id`}>
            <SurveyDetails />
          </Route>
          <Route exact path={`/${SURVEYS_TEXT}/:id/${QUESTION_TEXT}/${NEW_TEXT}`}>
            <NewQuestion />
          </Route>
          <Route exact path={`/${SURVEYS_TEXT}/:survey/${QUESTION_TEXT}/${EDIT_TEXT}/:id`}>
            <EditQuestion />
          </Route>
          <Route exact path={`/${RESULTS_TEXT}`}>
            <ResultsPage />
          </Route>
          <Route exact path={`/${RESULTS_TEXT}/${DETAILS_TEXT}/:surveyId/${CONTACT_ES}`}>
            <ContactDetail />
          </Route>
          <Route exact path={`/${RESULTS_TEXT}/${DETAILS_TEXT}/:surveyId/:questionId`}>
            <ResultsDetail />
          </Route>
          <Route exact path={`/${RESULTS_TEXT}/${DETAILS_TEXT}/:surveyId`}>
            <SurveySummary />
          </Route>
          <Route exact path={`/${RESULTS_TEXT}/${DETAILS_TEXT}/:surveyId/${TEXT}/:questionId`}>
            <TextDetail />
          </Route>
          <Route exact path={`/${BRANCH_OFFICES_TEXT}/${NEW_TEXT}`}>
            <NewBranchOffice />
          </Route>
          <Route exact path={`/${BRANCH_OFFICES_TEXT}/:id/${AREAS}/${NEW_TEXT}`}>
            <NewArea />
          </Route>
          <Route exact path={`/${BRANCH_OFFICES_TEXT}`}>
            <OfficesPage />
          </Route>
          <Route exact path={`/${BRANCH_OFFICES_TEXT}/${DETAILS_TEXT}/:id`}>
            <DetailBranchOffice />
          </Route>
          <Route exact path={`/${BRANCH_OFFICES_TEXT}/${EDIT_TEXT}/:id`}>
            <EditBranchOffice />
          </Route>
          <Route exact path={`/${PROFILE_TEXT}`}>
            <ProfilePage />
          </Route>
          <Route exact path={`/${PROFILE_TEXT}/${EDIT_TEXT}`}>
            <EditProfile />
          </Route>
          <Route exact path={`/${TABLET_TEXT}`}>
            <TabletsPage />
          </Route>
          <Route exact path={`/${TABLET_TEXT}/${NEW_TEXT}`}>
            <NewTablet />
          </Route>
          <Route exact path={`/${TABLET_TEXT}/${EDIT_TEXT}/:id`}>
            <EditTablet />
          </Route>
          {/*
          <Route exact path={`/${REPORTS_TEXT}`}>
            <ReportsPage />
          </Route>
          <Route exact path={`/${REPORTS_TEXT}/${NEW_TEXT}`}>
            <NewReport />
          </Route>
          */}
        </Switch>
        <SessionExpiredModal isOpen={isOpen} handleOpen={() => setIsOpen(false)} />
      </SessionContext.Provider>
    </>
  );
}

export default App;
