import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  &.margin {
    margin-right: 20px;
  }
  margin-top: 45px;
  width: 100%;
  min-width: 600px;
  &.small {
    max-width: 730px;
    width: 38vw;
  }
  &.big {
    width: 90%;
    height: 35%;
    max-width: 767px;
    align-self: center;
  }
  &.details {
    height: 80%;
    max-width: 1000px;
  }
`;

export const Square = styled.div`
  width: 10px;
  height: 10px;
  margin-right: 2px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.palette.white[100]};
  height: 350px;
  box-shadow: 0px 0px 40px ${(props) => props.theme.palette.shadow[25]};
  border-radius: 10px;
  padding: 15px 25px 15px 25px;
  &.big {
    height: 100%;
    min-height: 290px;
  }
`;

export const Question = styled.label`
  font-family: ${(props) => props.theme.typography.fontFamily.heading.bold};
  font-size: 15px;
  margin-bottom: 15px;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  &.none {
    display: none;
  }
  &.chart {
    display: inline-block;
    text-align: center;
    height: 100%;
    margin-bottom: 30px;
  }
  &.center {
    align-items: center;
    justify-content: center;
    width: 100%;
  }
`;

export const RowContainer = styled.div`
  display: flex;
  &.charts {
    height: 90%;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
  &.icons {
    width: 110px;
    justify-content: space-around;
    align-items: center;
  }
  &.bottom {
    margin-bottom: 15px;
  }
  &.top {
    margin-top: 5px;
  }
  &.none {
    display: none;
  }
  &.line {
    justify-content: flex-end;
  }
  &.small {
    width: 80px;
  }
  &.center {
    align-items: center;
  }
  &.size {
    flex: 1;
  }
  &.large {
    height: 100%;
    width: 100%;
    justify-content: center;
  }
  &.hidden {
    visibility: hidden;
  }
  &.details {
    flex-direction: column;
  }
  &.legends {
    align-self: flex-start;
    max-width: 85%;
  }
  &.space {
    justify-content: space-between;
    align-items: center;
  }
  &.min {
    min-width: 465px;
  }
`;

export const Legends = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;
  align-self: center;
  padding-right: 20px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-family: ${(props) => props.theme.typography.fontFamily.body.normal};
  &.bold {
    margin-right: 5px;
    font-family: ${(props) => props.theme.typography.fontFamily.body.bold};
  }
  &.underline {
    margin-top: 8px;
    font-size: 10px;
    text-decoration: underline;
    cursor: pointer;
  }
  &.small {
    font-size: 12px;
    display: inline-block;
  }
  &.margin {
    margin-left: 5px;
  }
  &.answers {
    font-family: ${(props) => props.theme.typography.fontFamily.heading.normal};
    font-size: 14px;
    color: ${(props) => props.theme.palette.black[90]};
    &.lowerCase {
      text-transform: lowercase;
    }
  }
`;

export const Icon = styled.img`
  height: 17px;
  width: 17px;
  cursor: pointer;
`;

export const Button = styled.div`
  background-color: ${(props) => props.theme.palette.primary[75]};
  box-shadow: 0px 0px 40px ${(props) => props.theme.palette.shadow[25]};
  border-radius: 3px;
  padding: 6px;
  padding-top: 4px;
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
  &.center {
    align-self: center;
  }
`;

export const HidableContainer = styled.div`
  &.fixedWidth {
    width: 70px;
  }
  &.hidden {
    visibility: hidden;
  }
`;

export const DoughnutContainer = styled.div`
  min-width: 0px;
  width: 100%;
  height: 100%;
`;

export const ToolTip = styled.div`
  width: 100%;
  text-align: start;
  margin-top: -30px;
  margin-right: 50%;
`;
