import styled from 'styled-components';

export const RowContainer = styled.div`
  display: flex;
  background-color: ${(props): string => props.theme.palette.primary[15]};
  min-height: 100vh;
`;
