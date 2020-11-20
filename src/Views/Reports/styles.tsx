import styled from 'styled-components';
import { Chip } from '@material-ui/core';

export const StyledDiv = styled.div`
  display: inline-block;
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
  &.link {
    background-color: ${(props): string => props.theme.palette.greenBackground[25]};
    color: ${(props): string => props.theme.palette.primary[25]};
    font-weight: 'bold';
    max-width: 15vw;
  }
  margin: 5px 10px 5px -10px;
  align-self: center;
`;

export const DivList = styled.div`
  border: 1px solid ${(props): string => props.theme.palette.black[10]};
  min-height: 40px;
  width: 40vw;
  display: flex;
`;

export const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
