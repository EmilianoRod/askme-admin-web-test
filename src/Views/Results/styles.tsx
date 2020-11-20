import styled from 'styled-components';
import { Select, InputBase, FormControl, MenuList, TableContainer } from '@material-ui/core';

export const Title = styled.label`
  font-family: ${(props): string => props.theme.typography.fontFamily.heading.bold};
  font-size: ${(props): string => props.theme.typography.fontSizes[28]};
  color: ${(props) => props.theme.palette.black[100]};
`;

export const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${(props): string => props.theme.palette.primary[15]};
  padding: 3% 5%;
`;

export const FilterTitle = styled.div`
  font-family: ${(props): string => props.theme.typography.fontFamily.heading.light};
  text-transform: uppercase;
  font-size: 10px;
  margin: 5px 0px;
  color: ${(props): string => props.theme.palette.black[75]};
`;

export const Form = styled(FormControl)`
  width: 270px;
  height: 38px;
  min-width: 200px !important;
  &.question {
    width: 100%;
    min-width: 50px !important;
  }
`;

export const SelectCont = styled(Select)`
  &.MuiOutlinedInput-root {
    border-radius: 3px;
    box-shadow: 0px 0px 40px rgba(1, 149, 54, 0.05);
    background-color: ${(props): string => props.theme.palette.white[100]};
    height: 38px;
    border-width: 0px;
    font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
  }
  &.MuiSelect-selectMenu {
    height: 38px;
    min-height: auto !important;
  }
  &.MuiInputBase-root {
    padding: 10px;
    font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
    font-size: 14px;
    cursor: pointer;
  }
  text-transform: capitalize;
  z-index: 0;
  &.question {
    border: 1px solid ${(props): string => props.theme.palette.black[10]};
    height: 38px;
  }
  &.focused {
    border: 1px solid ${(props): string => props.theme.palette.primary[75]};
  }
  &.fullWidth {
    width: 32vw;
    min-height: 38px;
    height: 100%;
    padding: 0;
  }
`;

export const Input = styled(InputBase)`
  color: ${(props): string => props.theme.palette.black[100]};
  border-radius: 3px;
  background-color: ${(props): string => props.theme.palette.white[100]};
  height: 38px;
  border-width: 0px;
  font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
  &.MuiInputBase-root.Mui-disabled {
    color: ${(props): string => props.theme.palette.black[100]};
  }
`;

export const List = styled(MenuList)`
  background-color: ${(props): string => props.theme.palette.white[100]};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  &.space {
    margin: 5px 0px;
  }
  &.wrap {
    flex-wrap: wrap;
  }
  flex-wrap: wrap;
  justify-content: space-between;
  &.start {
    justify-content: flex-start;
  }
  &.space {
    justify-content: space-between;
  }
`;

export const Column = styled.div`
  display: inline-block;
  padding-right: 16px;
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  &.colors {
    margin-left: 20px;
    &.doughnut {
      min-width: 100px;
    }
  }
  &.wrap {
    max-height: 150px;
    flex-wrap: wrap;
  }
  &.padding {
    padding-top: 20px;
  }
  &.hidden {
    visibility: hidden;
  }
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
  &.margin {
    margin: 30px;
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

export const NoResultsBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const AddSurvey = styled.button`
  all: unset;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: 5px;
  -webkit-text-fill-color: ${(props): string => props.theme.palette.white[100]};
  background-color: ${(props): string => props.theme.palette.primary[75]};
  color: ${(props): string => props.theme.palette.white[100]};
  font-family: ${(props): string => props.theme.typography.fontFamily.heading.light};
`;

export const SeeMoreLink = styled.button`
  all: unset;
  text-decoration: underline;
  font-family: ${(props): string => props.theme.typography.fontFamily.heading.normal};
  color: ${(props): string => props.theme.palette.black[100]};
  text-transform: uppercase;
  font-size: 10px;
  cursor: pointer;
  align-self: flex-end;
`;
export const Grid = styled.div`
  display: grid;
  grid-column-gap: 50px;
  grid-row-gap: 50px;
`;

export const Line = styled.hr`
  border: 0.1px solid ${(props): string => props.theme.palette.primary[75]};
  margin-top: 20px;
  width: 100%;
  &.space {
    margin-top: 80px;
  }
`;

export const CardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.margin {
    margin-top: 40px;
    height: 100%;
  }
  &.hidden {
    display: none;
  }
`;

export const Label = styled.label`
  font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
  font-size: 21px;
  &.big {
    font-family: ${(props): string => props.theme.typography.fontFamily.body.bold};
    font-size: 28px;
    align-self: center;
  }
  &.bold {
    font-family: ${(props): string => props.theme.typography.fontFamily.body.bold};
    margin-right: 14px;
  }
  &.small {
    font-size: 14px;
  }
  &.answers {
    width: 190px;
  }
  &.margin {
    margin-right: 8px;
  }
`;

export const Square = styled.div`
  width: 25px !important;
  height: 25px !important;
  margin-right: 5px;
  border-radius: 4px;
`;

export const DetailsContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  &.unique {
    width: 70%;
    justify-content: center;
  }
  &.doughnut {
    width: 80%;
    height: 70%;
  }
`;

export const TextAnswersTable = styled(TableContainer)`
  box-shadow: 0px 0px 20px rgba(1, 149, 54, 0.05);
  background-color: ${(props) => props.theme.palette.primary[15]};
  display: flex;
  height: 100%;
  justify-content: center;
  margin-top: 30px;
  margin-left: 30px;
  width: 90%;
  &.small {
    flex: none;
    margin-top: 22px;
    min-width: 766px;
  }
  &.contact {
    margin-left: -30px;
    width: 100%;
  }
  &.height {
    height: 80%;
  }
`;
