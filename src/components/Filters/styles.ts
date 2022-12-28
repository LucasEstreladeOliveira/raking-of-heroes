import styled from "styled-components";

type ButtonType = {
  color: string;
};
export const Wrapper = styled.div`
  border: 3px solid #8d94ba;
  padding: 30px;
  border-radius: 16px;
  gap: 30px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 20px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 2px solid #8d94ba;
  padding: 15px;
  border-radius: 16px;
`;
export const Title = styled.div`
  display: flex;
  font-size: 25px;
  font-weight: 700;
  align-items: center;
  color: #8d94ba;
`;

export const ButtonWrapper = styled.div`
  justify-content: space-around;
  display: flex;
  gap: 20px;
  align-items: end;
`;

export const Button = styled.button<ButtonType>`
  background: ${({ color }) => color};
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  line-height: 24px;
  outline: unset;
  padding: 8px 18px;
  user-select: none;
  -webkit-user-select: none;
  border: 0;
`;

export const Label = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #8d94ba;
`;

export const FiltersWrapper = styled.div`
  display: flex;
  gap: 40px;
`;
