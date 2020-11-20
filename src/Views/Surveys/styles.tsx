import styled from 'styled-components';
import { TableContainer, InputBase } from '@material-ui/core';

export const Title = styled.label`
  font-family: ${(props): string => props.theme.typography.fontFamily.heading.bold};
  font-size: ${(props): string => props.theme.typography.fontSizes[28]};
  color: ${(props) => props.theme.palette.black[100]};
  text-transform: capitalize;
  &.new {
    font-size: 18px;
    font-family: ${(props): string => props.theme.typography.fontFamily.heading.normal};
  }
`;

export const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props): string => props.theme.palette.primary[15]};
  padding: 3% 5%;
  &.flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  &.margin {
    margin-bottom: 5vh;
  }
  &.input {
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1vh;
  }
  &.self {
    align-self: flex-start;
  }
  &.full {
    width: 100%;
    height: 100%;
    justify-content: center;
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

export const SurveysTable = styled(TableContainer)`
  box-shadow: 0px 0px 20px rgba(1, 149, 54, 0.05);
  background-color: ${(props) => props.theme.palette.primary[15]};
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  min-width: 960px;
  &.small {
    flex: none;
    margin-top: 22px;
    min-width: 766px;
  }
`;

export const NoSurveysBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
  &.abs {
    align-self: center;
    text-align: right;
    padding-right: 15px;
  }
`;

export const Flex = styled.div`
  display: flex;
  box-sizing: border-box;
  background: ${(props) => props.theme.palette.white[100]};
  border: 1px solid ${(props) => props.theme.palette.black[10]};
  border-radius: 3px;
  color: ${(props) => props.theme.palette.black[100]};
  width: 244px;
  height: 38px;
  padding-left: 10px;
  &.error {
    border: 1px solid ${(props) => props.theme.palette.error[50]};
    color: ${(props) => props.theme.palette.error[50]};
  }
  &.questionName {
    width: 40vw;
  }
  outline: none;
  &.question {
    width: 18vw;
  }
  &.focus {
    border: 1px solid ${(props) => props.theme.palette.primary[75]};
  }
`;

export const EmptyInput = styled.input`
  background-color: transparent;
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  outline-style: none;
  color: ${(props) => props.theme.palette.black[100]};
  &.error {
    color: ${(props) => props.theme.palette.error[50]};
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.palette.white[100]};
  margin-top: 40px;
  min-width: 570px;
  min-height: 500px;
  padding: 5vh 5vw;
  width: 75vw;
  justify-content: space-between;
  overflow-y: auto;
`;

export const InputSelect = styled(InputBase)`
  color: ${(props): string => props.theme.palette.black[100]};
  border-radius: 3px;
  background-color: ${(props): string => props.theme.palette.white[100]};
  height: 29px;
  border-width: 0px;
  font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
  &.MuiInputBase-root.Mui-disabled {
    color: ${(props): string => props.theme.palette.black[100]};
  }
`;

export const CrossImg = styled.img`
  cursor: pointer;
  margin-left: 2%;
`;

export const ButtonDiv = styled.div`
  padding-top: 20px;
`;
