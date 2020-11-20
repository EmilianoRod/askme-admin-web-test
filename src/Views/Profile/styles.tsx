import styled from 'styled-components';

export const Label = styled.label`
  font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
  font-size: 14px;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  &.margin {
    margin-bottom: 30px;
  }
  &.maxHeight {
    max-height: 100%;
  }
`;
