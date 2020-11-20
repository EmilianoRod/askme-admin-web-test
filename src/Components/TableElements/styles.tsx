import styled from 'styled-components';
import {
  TableHead,
  TableRow,
  TableCell,
  Chip,
  Divider,
  Select,
  FormControl,
  InputBase,
} from '@material-ui/core';

export const Head = styled(TableHead)`
  width: 100vw;
  height: 40px;
  background-color: ${(props): string => props.theme.palette.white[100]};
  font-size: 10px;
`;

export const Row = styled(TableRow)`
  width: 100vw;
  display: flex;
  background-color: ${(props): string => props.theme.palette.white[100]};
  align-items: center;
  &.head {
    &:hover {
      background-color: ${(props): string => props.theme.palette.white[100]};
    }
  }
  &:hover {
    background-color: ${(props): string => props.theme.palette.primary[15]};
  }
`;

export const Element = styled(TableCell)`
  &.MuiTableCell-paddingNone {
    padding: 15px;
  }
  &.MuiTableCell-root {
    font-size: 10px;
    font-family: ${(props): string => props.theme.typography.fontFamily.heading.normal};
  }
  align-self: center;
  height: 40px;
  text-transform: uppercase;
  &.MuiTableCell-paddingNone:last-child {
    padding: 16px;
  }
`;

export const AreaChip = styled(Chip)`
  &.MuiChip-root {
    font-family: ${(props): string => props.theme.typography.fontFamily.body.bold};
    font-size: 12px;
    border-radius: 3px;
    height: 19px;
    cursor: pointer;
  }
  align-self: center;
  margin: 5px 0px 5px 0px;
  max-width: 80%;
  &.margin {
    margin-right: 10px;
  }
  &.checked {
    background-color: ${(props): string => props.theme.palette.primary[75]};
    color: ${(props): string => props.theme.palette.white[100]};
  }
  &.link {
    background-color: ${(props): string => props.theme.palette.greenBackground[25]};
    color: ${(props): string => props.theme.palette.primary[25]};
    max-width: 25vw;
    margin-left: 3px;
  }
  &.ticket {
    max-width: 15vw;
  }
`;

export const RightChip = styled(Chip)`
  &.MuiChip-root {
    font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
    font-size: 12px;
    border-radius: 3px;
    height: 19px;
  }
  &.MuiChip-label {
    padding-left: 0px;
  }
  margin: 5px 10px 5px -10px;
  align-self: center;
`;

export const Cell = styled(TableCell)`
  min-width: 60px;
  &.MuiTableCell-root {
    font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
    font-size: 14px;
  }
  &.bold {
    font-family: ${(props): string => props.theme.typography.fontFamily.body.bold};
  }
  display: flex;
  align-items: center;
  &.large {
    min-width: 300px;
    flex-wrap: nowrap !important;
    overflow: auto !important;
  }
  &.underlined {
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.palette.primary[75]};
    }
  }
  &.pointer {
    cursor: pointer;
  }
  &.small {
    font-size: 12px;
  }
  &.cross {
    padding-right: 12px;
  }
  &.start {
    padding-top: 16px;
    vertical-align: top;
    cursor: pointer;
  }
  &.grey {
    color: ${(props): string => props.theme.palette.black[25]};
  }
  &.right {
    text-align: right;
  }
  &.noPadding {
    padding: 0px;
  }
  &.green {
    color: ${(props): string => props.theme.palette.primary[75]};
  }
  &.button {
    &:hover {
      text-decoration: underline;
    }
  }
  &.disabled {
    cursor: not-allowed;
    &:hover {
      color: ${(props) => props.theme.palette.black[100]};
    }
  }
  &.ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const TableDivider = styled(Divider)`
  &.MuiDivider-root {
    background-color: ${(props): string => props.theme.palette.primary[15]};
    height: 2px;
  }
  width: 100%;
`;

export const AddLink = styled.button`
  all: unset;
  font-family: ${(props): string => props.theme.typography.fontFamily.heading.normal};
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  &.margin {
    margin: 2vh 0px;
  }
  &.left {
    margin-left: 10px;
  }
  &.right {
    margin-right: 2vh;
  }
  &.green {
    color: ${(props): string => props.theme.palette.primary[75]};
    margin-right: 3px;
  }
  &:hover {
    color: ${(props): string => props.theme.palette.primary[75]};
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
  }
  &.MuiInputBase-root {
    padding: 10px;
    font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
    font-size: 14px;
    cursor: pointer;
  }
`;

export const HorizontalDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Form = styled(FormControl)`
  height: 38px;
  flex: 1;
`;

export const BranchButton = styled.button`
  cursor: pointer;
  width: 100%;
  align-self: flex-start;
  border: none;
  outline: none;
  text-align: left;
  background-color: transparent;
  &:hover {
    text-decoration: underline;
  }
  &.ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }
`;

export const Button = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;
export const PopperPage = styled.div`
  width: 128px;
  padding: 10px;
  height: 81px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0px 0px 40px ${(props): string => props.theme.palette.shadow[15]};
  background-color: ${(props): string => props.theme.palette.white[100]};
`;
export const Text = styled.label`
  font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
  font-size: 14px;
  cursor: pointer;
`;

export const RowContainer = styled.div`
  display: flex;
  margin: 10px;
  cursor: pointer;
  &.center {
    align-items: center;
  }
`;

export const Icon = styled.img`
  &.edit {
    height: 14.12px;
    width: 14.12px;
  }
  margin-right: 15px;
  height: 15.56px;
  width: 14px;
`;

export const Div = styled.div`
  display: inline-block;
`;

export const LoaderDiv = styled.div`
  display: inline-block;
  margin-left: 5px;
  width: 30px;
`;

export const Input = styled(InputBase)`
  color: ${(props): string => props.theme.palette.black[100]};
  border-radius: 3px;
  background-color: transparent;
  height: 29px;
  border-width: 0px;
  font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
  &.MuiInputBase-root.Mui-disabled {
    color: ${(props): string => props.theme.palette.black[100]};
  }
`;
