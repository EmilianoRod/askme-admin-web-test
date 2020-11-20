import styled from 'styled-components';

export const SideMenu = styled.div`
  display: flex;
  background-color: ${(props): string => props.theme.palette.primary[75]};
  flex-direction: column;
  align-items: center;
  padding: 20px 7px 30px 7px;
  min-height: 100vh;
  max-width: 200px;
`;

export const Button = styled.button`
  background-color: ${(props): string => props.theme.palette.primary[75]};
  border: none;
  outline: none;
  &.open {
    margin-left: 5px;
  }
`;
export const Icon = styled.img`
  width: 20px;
`;

export const Logo = styled.img`
  width: 25px;
  height: 13px;
  &.open {
    width: 69px;
    height: 19px;
  }
`;
export const RowContainer = styled.div`
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 10;
  &.logo {
    margin-left: 3px;
    position: relative;
  }
  &.logout {
    align-self: center;
    margin-top: 30px;
    position: relative;
  }
`;

export const LogoContainer = styled.button`
  all: unset;
  border-radius: 25px;
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  &.selected {
    background-color: ${(props): string => props.theme.palette.primary[100]};
  }
  &.open {
    min-width: 160px;
    padding-left: 15px;
    justify-content: flex-start;
  }
  &:hover {
    cursor: pointer;
    background-color: ${(props): string => props.theme.palette.primary[100]};
  }
  &:disabled {
    background-color: ${(props): string => props.theme.palette.primary[75]};
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const IconsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  align-self: center;
  margin: 0px 12px;
  height: 45%;
  min-height: 200px;
  &.open {
    margin: 0px;
  }
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 55px;
  flex: 1;
  &.open {
    align-items: flex-start;
    margin: 0px 8px;
    margin-bottom: 0px;
    margin-top: 55px;
    width: 100%;
  }
  &.bottom {
    justify-content: flex-end;
    margin-top: 0px;
    align-self: center;
  }
`;
export const AdminLogo = styled.img`
  margin: 5px;
  margin-top: 10px;
`;

export const Label = styled.label`
  font-family: ${(props) => props.theme.typography.fontFamily.heading.normal};
  font-size: 14px;
  color: ${(props): string => props.theme.palette.white[100]};
  margin-left: 15px;
  margin-top: 2px;
  &.email {
    margin-left: 0px;
    font-size: 13px;
    font-family: ${(props) => props.theme.typography.fontFamily.body.normal};
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    cursor: not-allowed;
  }
  &.logout {
    font-family: ${(props) => props.theme.typography.fontFamily.heading.bold};
  }
  &.closed {
    display: none;
  }
`;
