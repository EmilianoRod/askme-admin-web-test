import styled from 'styled-components';

export const AddButton = styled.button`
  all: unset;
  min-width: 115px;
  color: ${(props): string => props.theme.palette.white[100]};
  -webkit-text-fill-color: ${(props): string => props.theme.palette.white[100]}; /* Safari */
  background-color: ${(props): string => props.theme.palette.primary[75]};
  font-family: ${(props): string => props.theme.typography.fontFamily.heading.normal};
  font-size: ${(props): string => props.theme.typography.fontSizes[14]};
  border-radius: 5px;
  padding: 8px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 25px;
  &.download {
    width: 125px;
    height: 25px;
    justify-content: center;
    align-self: flex-end;
  }
  &.end {
    align-self: flex-end;
    margin-top: 10px;
  }
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.palette.primary[100]};
  }
  &:disabled {
    background-color: ${(props) => props.theme.palette.primary[75]};
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
export const Button = styled.button`
  background: ${(props) => props.theme.palette.error[50]};
  border-radius: 5px;
  width: 112px;
  height: 40px;
  font-size: 14px;
  font-family: ${(props): string => props.theme.typography.fontFamily.heading.normal};
  font-weight: bold;
  color: ${(props) => props.theme.palette.white[100]};
  border: none;
  padding-top: 2px;
  outline: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.palette.error[60]};
  }
  &:disabled {
    opacity: 0.5;
  }
`;

export const Image = styled.img`
  size: 20px;
  margin-right: 7px;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &.space {
    justify-content: space-between;
  }
`;
