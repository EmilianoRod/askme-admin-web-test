import React, { useState } from 'react';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { useHistory } from 'react-router-dom';

import ModalComponent from 'Components/Modal/DeleteBranchModal';
import {
  EDIT,
  DELETE,
  BRANCH_OFFICES_TEXT,
  EDIT_TEXT,
  SURVEYS_TEXT,
  QUESTION_TEXT,
  BRANCH_OFFICE,
  QUESTION,
  SURVEY,
  ADMINS,
  ADMINS_TEXT,
  USER,
  TABLET_TEXT,
} from 'Utils/constants';
import { Button, PopperPage, Text, RowContainer, Icon } from 'Components/TableElements/styles';
import { DeleteIcon, EditIcon } from 'Assets/Images';
import { ClickAwayListener } from '@material-ui/core';

const PopperComponent = ({
  button,
  id,
  type,
}: {
  button: JSX.Element;
  id: string;
  type: string;
}) => {
  const history = useHistory();
  const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const myId = open ? 'transitions-popper' : undefined;
  const survey = window.location.pathname.split('/')[3];
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const handleOutsideClick = () => {
    if (anchorEl) setAnchorEl(null);
  };
  return (
    <div>
      <Button aria-describedby={myId} type="button" onClick={handleClick}>
        {button}
      </Button>
      <Popper placement="bottom-end" id={myId} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <ClickAwayListener onClickAway={handleOutsideClick}>
              <PopperPage>
                <RowContainer
                  className="center"
                  onClick={() => {
                    switch (type) {
                      case BRANCH_OFFICE:
                        history.push(`/${BRANCH_OFFICES_TEXT}/${EDIT_TEXT}/${id}`);
                        break;
                      case QUESTION:
                        history.push(
                          `/${SURVEYS_TEXT}/${survey}/${QUESTION_TEXT}/${EDIT_TEXT}/${id}`,
                        );
                        break;
                      case SURVEY:
                        history.push(`/${SURVEYS_TEXT}/${EDIT_TEXT}/${id}`);
                        break;
                      case ADMINS:
                        history.push(`/${ADMINS_TEXT}/${EDIT_TEXT}/${id}`);
                        break;
                      case USER:
                        history.push(`/${TABLET_TEXT}/${EDIT_TEXT}/${id}`);
                        break;
                      default:
                        history.push(`/${BRANCH_OFFICES_TEXT}/${EDIT_TEXT}/${id}`);
                    }
                  }}
                >
                  <Icon className="edit" src={EditIcon} alt={EDIT} />
                  <Text>{EDIT}</Text>
                </RowContainer>
                <RowContainer className="center" onClick={() => setOpen(true)}>
                  <Icon src={DeleteIcon} alt={DELETE} />
                  <Text>{DELETE}</Text>
                </RowContainer>
              </PopperPage>
            </ClickAwayListener>
          </Fade>
        )}
      </Popper>
      <ModalComponent type={type} id={id} isOpen={isOpen} handleOpen={() => setOpen(false)} />
    </div>
  );
};
export default PopperComponent;
