import styled from 'styled-components';
import MaterialModal from '@material-ui/core/Modal';

export const Modal = styled(MaterialModal)`
  display: flex;
  text-align: center;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  outline: none;
`;
export const ModalContainer = styled.div`
  background: ${(props): string => props.theme.palette.white[100]};
  border-radius: 3px;
  padding: 50px 70px 50px 70px;
  align-self: center;
  outline: none;
  width: 400px;
  min-width: 334px;
`;
export const RowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 50px;
  padding: 10px;
  &.center {
    justify-content: center;
  }
`;
export const Title = styled.label`
  font-family: ${(props): string => props.theme.typography.fontFamily.heading.bold};
  font-size: 20px;
  margin-bottom: 22px;
  display: block;
`;

export const Text = styled.label`
  font-family: ${(props): string => props.theme.typography.fontFamily.body};
  font-size: 17px;
`;
