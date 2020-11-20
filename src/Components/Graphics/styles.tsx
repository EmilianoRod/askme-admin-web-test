import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 100%;
  &.space {
    margin: 5px 0px;
  }
  &.wrap {
    flex-wrap: wrap;
  }
  &.contact {
    white-space: nowrap;
    overflow: hidden;
    display: block;
    max-width: 430px;
    text-overflow: ellipsis;
    max-height: 25px;
  }
`;

export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  &.padding {
    padding-top: 20px;
  }
`;

export const TextCard = styled.div`
  background-color: ${(props): string => props.theme.palette.white[100]};
  border-radius: 10px;
  width: 450px;
  display: flex;
  flex-direction: column;
  margin: 15px 70px 15px 0px;
  padding: 10px;
  box-shadow: 0px 0px 40px rgba(1, 149, 54, 0.05);
`;

export const QuestionText = styled.label`
  font-size: 15px;
  font-family: ${(props): string => props.theme.typography.fontFamily.heading.bold};
  color: ${(props): string => props.theme.palette.black[100]};
`;

export const Body = styled.span`
  font-family: ${(props): string => props.theme.typography.fontFamily.body.normal};
  font-size: 14px;
  color: ${(props): string => props.theme.palette.black[100]};
  &.bold {
    font-family: ${(props): string => props.theme.typography.fontFamily.body.bold};
  }
  &.lower {
    text-transform: lowercase;
  }
  &.margin {
    margin: 30px;
  }
  &.eleven {
    font-size: 11px;
  }
  &.large {
    font-size: 30px;
    margin-top: 10px;
    margin-left: 10px;
  }
  &.space {
    margin-left: 5px;
  }
  &.marginBotton {
    margin-bottom: 10px;
  }
`;

export const SeeMoreLink = styled.button`
  all: unset;
  text-decoration: underline;
  font-family: ${(props): string => props.theme.typography.fontFamily.heading.normal};
  color: ${(props): string => props.theme.palette.black[100]};
  text-transform: uppercase;
  font-size: 10px;
  cursor: pointer;
  align-self: flex-end;
  &:disabled {
    cursor: not-allowed;
  }
  &:hover {
    color: ${(props): string => props.theme.palette.primary[75]};
  }
`;
