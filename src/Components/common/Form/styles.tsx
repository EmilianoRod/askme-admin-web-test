import styled from 'styled-components';

export const BackgroundContainer = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.palette.white[100]};
  margin-top: 40px;
  height: 70vh;
  justify-content: space-between;
  min-width: 570px;
  min-height: 550px;
  padding-right: 48px;
  padding-top: 66px;
  width: 75%;
  &.small {
    height: 50vh;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 90px;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  &.login {
    margin-bottom: 10px;
  }
  &.question {
    width: 18vw;
  }
  &.margin {
    margin-right: 4vw;
  }
  &.questionName {
    width: 40vw;
  }
  &.minWidth {
    min-width: 200px;
  }
`;

export const InputsContainer = styled.div`
  margin-bottom: 10px;
`;

export const Input = styled.input`
  color: ${(props) => props.theme.palette.black[100]};
  box-sizing: border-box;
  background: ${(props) => props.theme.palette.white[100]};
  border: 1px solid ${(props) => props.theme.palette.black[10]};
  box-sizing: border-box;
  border-radius: 3px;
  color: ${(props) => props.theme.palette.black[100]};
  width: 244px;
  height: 38px;
  padding-left: 10px;
  &.error {
    border: 1px solid ${(props) => props.theme.palette.error[50]};
    color: ${(props) => props.theme.palette.error[50]};
  }
  &.questionName {
    width: 40vw;
  }
  outline: none;
  &.question {
    width: 18vw;
  }
  &.height {
    height: 29px;
  }
  &:focus {
    border: 1px solid ${(props) => props.theme.palette.primary[75]};
  }
`;

export const TextArea = styled.textarea`
  color: ${(props) => props.theme.palette.black[100]};
  resize: none;
  box-sizing: border-box;
  background: ${(props) => props.theme.palette.white[100]};
  border: 1px solid ${(props) => props.theme.palette.black[10]};
  box-sizing: border-box;
  border-radius: 3px;
  color: ${(props) => props.theme.palette.black[100]};
  width: 244px;
  height: 76px;
  padding-left: 10px;
  &.error {
    border: 1px solid ${(props) => props.theme.palette.error[50]};
    color: ${(props) => props.theme.palette.error[50]};
  }
  &.questionName {
    width: 40vw;
  }
  outline: none;
  &.question {
    width: 18vw;
  }
  &:focus {
    border: 1px solid ${(props) => props.theme.palette.primary[75]};
  }
`;

export const InputLabel = styled.label`
  color: ${(props) => props.theme.palette.black[100]};
  font-family: ${(props): string => props.theme.typography.fontFamily.body.bold};
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 10px;
  margin-top: 10px;
  &.capitalize {
    text-transform: capitalize;
  }
`;

export const Title = styled.label`
  font-family: ${(props): string => props.theme.typography.fontFamily.heading.bold};
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 24px;
  color: ${(props) => props.theme.palette.black[100]};
`;

export const Button = styled.button`
  background: ${(props) => props.theme.palette.primary[75]};
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
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.palette.primary[100]};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background: ${(props) => props.theme.palette.primary[75]};
  }
`;
export const EditForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  &.start {
    align-items: flex-start;
  }
`;

export const Error = styled.label`
  color: ${(props) => props.theme.palette.error[50]};
  align-self: flex-end;
  font-size: 12px;
  &.start {
    align-self: flex-start;
  }
  height: 20px;
  font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
`;

export const CancelButton = styled.button`
  border: 1px solid ${(props) => props.theme.palette.primary[100]};
  box-sizing: border-box;
  border-radius: 5px;
  color: ${(props) => props.theme.palette.primary[100]};
  font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
  font-size: 14px;
  width: 115px;
  height: 40px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.palette.white[100]};
  outline: none;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.palette.primary[75]};
    color: ${(props) => props.theme.palette.white[100]};
    border-width: 0px;
  }
  &:disabled {
    opacity: 0.5;
    color: ${(props) => props.theme.palette.primary[100]};
    background-color: ${(props) => props.theme.palette.white[100]};
    border: 1px solid ${(props) => props.theme.palette.primary[100]};
  }
  &.padding {
    padding: 0px 30px;
  }
`;

export const ContentDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Exit = styled.img`
  margin-right: 8px;
`;

export const BEError = styled.label`
  color: ${(props) => props.theme.palette.error[50]};
  font-size: 12px;
  height: 20px;
  font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
`;
