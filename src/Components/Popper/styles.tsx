import styled from 'styled-components';

export const Button = styled.button`
  background-color: ${(props): string => props.theme.palette.white[100]};
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
