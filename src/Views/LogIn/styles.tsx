import styled from 'styled-components';

export const Row = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
`;

export const Left = styled.div`
  width: 50%;
  height: 100%;
  background-color: ${(props): string => props.theme.palette.primary[75]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  width: 80%;
  height: 80%;
`;

export const Logo = styled.img`
  object-fit: contain;
  align-self: center;
  position: absolute;
`;

export const Right = styled.div`
  padding: 10% 0% 5% 0%;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  background-color: ${(props): string => props.theme.palette.white[100]};
`;

export const Title = styled.div`
  color: ${(props) => props.theme.palette.black[100]};
  font-size: 28px;
  font-family: ${(props): string => props.theme.typography.fontFamily.heading.bold};
`;

export const ForgotPasswordLink = styled.button`
  all: unset;
  font-family: ${(props): string => props.theme.typography.fontFamily.heading.normal};
  color: ${(props): string => props.theme.palette.black[100]};
  text-decoration: underline;
  font-size: 14px;
  cursor: pointer;
  margin-top: 5%;
`;
