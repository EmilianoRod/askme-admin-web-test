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
      cursor: pointer;
      &:hover {
        color: ${(props) => props.theme.palette.primary[75]};
      }
    }
  }
`;

export const Image = styled.img`
  margin: 25px;
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
  &.margin {
    margin-top: 44px;
  }
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  justify-content: center;
  align-items: center;
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
  &:hover {
    color: ${(props) => props.theme.palette.primary[75]};
  }
`;

export const NoBranchOfficesBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  width: 100%;
  min-width: 766;
`;
