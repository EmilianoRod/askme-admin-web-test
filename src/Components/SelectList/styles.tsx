import styled from 'styled-components';
import {
  List,
  Popover,
  ListItem,
  Checkbox,
  InputBase,
  ListItemText,
  Divider,
} from '@material-ui/core';

export const StyledPopover = styled(Popover)`
  font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
  margin-top: 5px;
  &.MuiPopover-paper {
    width: 270px;
    min-width: 200px;
    &.question {
      width: 18vw;
      min-width: 50px;
    }
  }
  &.MuiPaper-elevation8 {
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2);
  }
`;

export const StyledList = styled(List)`
  width: 270px;
  min-width: 200px;
  border-radius: 3px;
  &.question {
    width: 18vw;
    min-width: 50px;
  }
`;

export const StyledDivider = styled(Divider)`
  align-self: center;
  margin: 5px 0px 5px 0px;
  max-width: 80%;
`;

export const Body = styled.span`
  font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
  font-size: 14px;
  &.bold {
    font-family: ${(props): string => props.theme.typography.fontFamily.body.bold};
  }
  &.error {
    margin: 0% 5%;
    color: ${(props): string => props.theme.palette.error[50]};
  }
  &.hidden-bold {
    position: absolute;
    white-space: nowrap;
    transform: translateX(0);
    transition: 2s;
    line-height: 24px;
  }
  &.hidden-bold:hover {
    text-overflow: unset;
    transform: translateX(calc(195px - 100%));
  }
`;

export const Error = styled.label`
  margin-left: 3px;
  font-family: ${(props): string => props.theme.typography.fontFamily.body.bold};
  font-size: 10px;
  color: ${(props): string => props.theme.palette.error[50]};
`;

export const ListRow = styled(ListItem)`
  all: unset;
  &.MuiListItem-gutters {
    padding: 0px 10px;
  }
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  .MuiTypography-body1 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const GreenCheckBox = styled(Checkbox)`
  &.MuiCheckbox-colorSecondary.Mui-checked {
    color: ${(props): string => props.theme.palette.primary[75]};
  }
  width: 16px !important;
  height: 16px !important;
  &.MuiIconButton-edgeEnd {
    margin-right: 0px;
  }
`;

export const AddAreaInput = styled(InputBase)`
  margin: 5%;
  padding: 5%;
  width: 90%;
  border: 1px solid ${(props): string => props.theme.palette.black[85]};
  border-radius: 2px;
  height: 28px;
  &.MuiInputBase-root {
    font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
    font-size: 12px;
    &:focus-within {
      border-color: ${(props): string => props.theme.palette.primary[75]};
    }
  }
  &.survey {
    margin: 2% 5%;
  }
`;

export const Label = styled.div`
  font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
  font-size: 12px;
  text-align: center;
  margin-top: 10px;
  &.left {
    text-align: left;
  }
`;

export const ItemText = styled(ListItemText)`
  width: 90%;
  max-width: 90%;
  padding: 0px 10px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-transform: capitalize;
  line-height: 30px;
  position: relative;
  height: 24px;
`;

export const Div = styled.div`
  padding: 3% 5% 0% 5%;
  &.center {
    padding: 0%;
    display: flex;
    align-items: center;
  }
`;
