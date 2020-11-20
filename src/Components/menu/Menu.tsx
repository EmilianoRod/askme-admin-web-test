import React, { useState } from 'react';
import { Motion, spring } from 'react-motion';

import SideBar from './SideBar';
import {
  SURVEYS,
  RESULTS,
  BRANCH_OFFICES,
  ADMINS,
  TABLET,
  DESIGN,
  SURVEYS_TEXT,
  RESULTS_TEXT,
  BRANCH_OFFICES_TEXT,
  ADMINS_TEXT,
  TABLET_TEXT,
  DESIGN_TEXT,
  VISUALIZATOR_USER,
  REPORTS_TEXT,
  REPORTS,
} from '../../Utils/constants';
import { RowContainer } from './styles';
import { Admins, Design, Offices, Results, Surveys, Tablet, Reports } from '../../Assets/Images';

const icons = [
  { src: Results, name: RESULTS, path: `/${RESULTS_TEXT}`, disabledIcon: false },
  { src: Offices, name: BRANCH_OFFICES, path: `/${BRANCH_OFFICES_TEXT}`, disabledIcon: false },
  { src: Surveys, name: SURVEYS, path: `/${SURVEYS_TEXT}`, disabledIcon: false },
  { src: Admins, name: ADMINS, path: `/${ADMINS_TEXT}`, disabledIcon: false },
  { src: Tablet, name: TABLET, path: `/${TABLET_TEXT}`, disabledIcon: false },
  /* { src: Design, name: DESIGN, path: `/${DESIGN_TEXT}`, disabledIcon: true },
  { src: Reports, name: REPORTS, path: `/${REPORTS_TEXT}`, disabledIcon: true },
  */
];

const visualizatorIcons = [
  { src: Results, name: RESULTS, path: `/${RESULTS_TEXT}`, disabledIcon: false },
];
export interface MenuProps {
  icons: {
    src: string;
    name: string;
    path: string;
    disabledIcon: boolean;
  }[];
  handleOpen: () => void;
  isSelected: string;
  isOpen: boolean;
}

const Menu = () => {
  const [isOpen, setOpen] = useState(localStorage.getItem('sideBar') !== 'closed');
  const selectedIcon = `/${window.location.pathname.split('/')[1]}`;
  const isVisualizator = localStorage.getItem('user') === VISUALIZATOR_USER;

  const toggleSideBar = () => {
    localStorage.setItem('sideBar', isOpen ? 'closed' : 'open');
    setOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <Motion
      defaultStyle={{ width: isOpen ? 200 : 78 }}
      style={{ width: spring(isOpen ? 200 : 78) }}
    >
      {(theStyle: object) => (
        <div style={theStyle}>
          <Motion
            defaultStyle={{ width: isOpen ? 200 : 78 }}
            style={{ width: spring(isOpen ? 200 : 78) }}
          >
            {(myStyle: object) => (
              <div style={myStyle}>
                <RowContainer>
                  <SideBar
                    isOpen={isOpen}
                    handleOpen={toggleSideBar}
                    icons={isVisualizator ? visualizatorIcons : icons}
                    isSelected={selectedIcon}
                  />
                </RowContainer>
              </div>
            )}
          </Motion>
        </div>
      )}
    </Motion>
  );
};

export default Menu;
