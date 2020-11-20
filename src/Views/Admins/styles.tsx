import styled from 'styled-components';
import { TableContainer } from '@material-ui/core';

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
  &.start {
    align-items: self-start;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

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

export const Container = styled.div`
  width: 100%;
  &.min {
    min-width: 766px;
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

export const AddButton = styled.button`
  all: unset;
  color: ${(props): string => props.theme.palette.white[100]};
  -webkit-text-fill-color: ${(props): string => props.theme.palette.white[100]}; /* Safari */
  background-color: ${(props): string => props.theme.palette.primary[75]};
  font-family: ${(props): string => props.theme.typography.fontFamily.heading.light};
  font-size: ${(props): string => props.theme.typography.fontSizes[14]};
  border-radius: 5px;
  padding: 8px 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const BranchesTable = styled(TableContainer)`
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

export const RowContainer = styled.div`
  display: flex;
  width: 100%;
  &.wrap {
    flex-wrap: wrap;
  }
  &.space {
    justify-content: space-between;
  }
  &.center {
    align-items: center;
  }
  &.separated {
    margin-top: 20px;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 40px;
  }
  align-self: flex-start;
  &.top {
    margin-top: 18px;
  }
  &.reference {
    min-width: 155px;
  }
  &.space {
    justify-content: space-between;
  }
  &.doughnut {
    min-width: 715px;
    height: 30vw;
  }
  &.reference {
    min-width: 160px;
  }
`;

export const BackButton = styled.button`
  height: 20px;
  width: 10px;
  border: none;
  outline: none;
  background-color: ${(props) => props.theme.palette.primary[15]};
  margin-right: 30px;
  cursor: pointer;
  margin-bottom: 30px;
  &.details {
    margin-top: 44px;
    margin-right: 50px;
  }
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  justify-content: center;
  align-items: flex-start;
  &.fullScreen {
    height: 100%;
  }
  &.bottomMargin {
    margin-bottom: 50px;
  }
  &.background {
    height: 100%;
    justify-content: flex-start;
    width: 100%;
    margin-left: -50px;
    margin-left: -30px;
    &.start {
      align-items: flex-start;
    }
  }
  &.margin {
    margin-top: 50px;
  }
  &.center {
    align-items: center;
  }
`;

export const Text = styled.label`
  font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
  font-size: 18px;
  &.bold {
    font-family: ${(props): string => props.theme.typography.fontFamily.body.bold};
  }
  color: ${(props) => props.theme.palette.black[100]};
`;

export const DotsImg = styled.img`
  height: 40px;
  width: 40px;
  margin-left: 20px;
`;

export const Image = styled.img`
  margin: 25px;
`;

export const AddAreaButton = styled.button`
  font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
  text-decoration: underline;
  font-size: 14px;
  align-self: flex-start;
  cursor: pointer;
  border: none;
  outline: none;
  background-color: ${(props) => props.theme.palette.primary[15]};
  color: ${(props) => props.theme.palette.black[100]};
`;

export const NoBranchOfficesBackground = styled.div`
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
`;

export const BackgroundContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.palette.white[100]};
  margin-top: 40px;
  min-width: 570px;
  min-height: 500px;
  padding: 5vh 5vw;
  width: 70vw;
  justify-content: space-between;
  overflow-y: auto;
  &.start {
    justify-content: flex-start;
  }
`;
