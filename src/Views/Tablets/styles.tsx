import styled from 'styled-components';
import { TableContainer } from '@material-ui/core';

export const Title = styled.label`
  font-family: ${(props): string => props.theme.typography.fontFamily.heading.bold};
  font-size: ${(props): string => props.theme.typography.fontSizes[28]};
  color: ${(props) => props.theme.palette.black[100]};
  &.small {
    font-family: ${(props): string => props.theme.typography.fontFamily.heading.normal};
    font-size: 11px;
    text-transform: uppercase;
    &.underlined {
      text-decoration: underline;
      margin-right: 3px;
    }
  }
`;

export const Background = styled.div`
  background-color: ${(props): string => props.theme.palette.primary[15]};
  min-height: 100%;
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 3% 5%;
  &.small {
    padding-left: 60px;
    padding-right: 60px;
  }
  &.left {
    margin-left: -15px;
  }
  &.center {
    align-items: center;
  }
`;

export const Input = styled.input`
  all: unset;
  cursor: pointer;
  color: ${(props): string => props.theme.palette.black[100]};
  font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
  margin-left: 10px;
  &:focus {
    cursor: text;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: space-between;
  &.margin {
    margin-bottom: 5vh;
  }
  &.input {
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 3vh;
  }
  &.self {
    align-self: flex-start;
  }
  &.separated {
    margin-bottom: 10px;
  }
`;

export const Container = styled.div`
  width: 100%;
  &.min {
    min-width: 766px;
  }
`;

export const UsersTable = styled(TableContainer)`
  box-shadow: 0px 0px 20px rgba(1, 149, 54, 0.05);
  background-color: ${(props) => props.theme.palette.primary[15]};
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  &.small {
    flex: none;
    margin-top: 22px;
    min-width: 766px;
  }
`;

export const NoUsersBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Body = styled.span`
  font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
  font-size: 14px;
  color: ${(props): string => props.theme.palette.black[100]};
  &.bold {
    font-family: ${(props): string => props.theme.typography.fontFamily.body.bold};
  }
  &.lower {
    text-transform: lowercase;
  }
  &.marginTop {
    margin-top: 30px;
  }
  &.marginBottom {
    margin-bottom: 30px;
  }
  &.eleven {
    font-size: 11px;
  }
  &.large {
    font-size: 30px;
    margin-top: 10px;
    margin-left: 10px;
  }
  &.space {
    margin-left: 5px;
  }
`;
