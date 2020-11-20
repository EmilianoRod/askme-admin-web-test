import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { SIGN_OUT } from 'api/mutations';
import { MenuProps } from './Menu';
import { LOGOUT, PROFILE_TEXT } from '../../Utils/constants';

import {
  SideMenu,
  RowContainer,
  IconsContainer,
  Button,
  Logo,
  ColumnContainer,
  LogoContainer,
  AdminLogo,
  Label,
  Icon,
} from './styles';
import { Arrow, CollapseArrow, SmallLogo, LargeLogo, Logout, LogoAdmin } from '../../Assets/Images';

const SideBar = ({ handleOpen, icons, isSelected, isOpen }: MenuProps) => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);

  const [signOut, { data }] = useMutation(SIGN_OUT, {
    variables: { input: { clientMutationId: null } },
  });

  useEffect(() => {
    if (data && data.signOut.success) {
      localStorage.removeItem('token');
      localStorage.removeItem('company');
      localStorage.removeItem('user');
      localStorage.removeItem('email');
      history.push('/');
    }
  }, [data]);

  const handleLogout = () => {
    if (!disabled) {
      signOut();
      setDisabled(true);
    }
  };

  const getClassName = (path: string) => {
    let res = '';
    if (isSelected === path) res += 'selected';
    if (isOpen) res += ' open';
    return res;
  };
  const renderIcons = () =>
    icons.map((icon) => {
      const { src, name, path, disabledIcon } = icon;
      return (
        <LogoContainer
          disabled={disabledIcon}
          className={getClassName(path)}
          onClick={() => history.push(path)}
          key={name}
        >
          <Icon src={src} alt={name} />
          <Label className={isOpen ? '' : 'closed'}>{name}</Label>
        </LogoContainer>
      );
    });

  const getEmail = () => {
    const email = localStorage.getItem('email');
    if (email) {
      const separatedEmail = email?.split('@') || ['', ''];
      let emailText = separatedEmail[0];
      if (separatedEmail[0].length > 7) {
        emailText = `${separatedEmail[0].substring(0, 7)}...`;
      }
      const domain = separatedEmail[1].split('.');
      if (domain[0].length > 7) {
        emailText = `${emailText}@${domain[0].substring(0, 5)}...${domain[1]}`;
      } else {
        emailText = `${emailText}@${separatedEmail[1]}`;
      }
      return emailText;
    }
    return '';
  };

  return (
    <SideMenu>
      <RowContainer className={isOpen ? 'logo open' : 'logo'}>
        <Logo src={isOpen ? LargeLogo : SmallLogo} alt="logo" className={isOpen ? 'open' : ''} />
        {isOpen && <AdminLogo src={LogoAdmin} alt="Admin" />}
        <Button className={isOpen ? 'open' : ''} onClick={handleOpen}>
          <Icon src={isOpen ? CollapseArrow : Arrow} alt="arrow" />
        </Button>
      </RowContainer>
      <ColumnContainer className={isOpen ? 'open' : ''}>
        <IconsContainer className={isOpen ? 'open' : ''}>{renderIcons()}</IconsContainer>
        <ColumnContainer className="bottom">
          {isOpen && (
            <Label onClick={() => history.push(`/${PROFILE_TEXT}`)} className="email">
              {getEmail()}
            </Label>
          )}
          <RowContainer onClick={handleLogout} className="logout">
            <Icon src={Logout} alt={LOGOUT} />
            <Label className={isOpen ? 'logout' : ' logout closed'}>{LOGOUT}</Label>
          </RowContainer>
        </ColumnContainer>
      </ColumnContainer>
    </SideMenu>
  );
};
export default SideBar;
