import styled from "styled-components";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

type OptionWrapperType = {
  value: string;
  label: string;
};
export const Wrapper = styled.div``;

export const Header = styled.div`
  padding: 30px;
  display: flex;
  gap: 20px;
  align-items: center;
  border: 3px solid #8d94ba;
  border-radius: 16px;
  margin: 20px;
`;

export const Body = styled.div.attrs((props) => ({
  className: "container",
}))`
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  gap: 10px;
`;

export const Title = styled.div`
  display: flex;
  font-size: 25px;
  font-weight: 700;
  align-items: center;
  color: #8d94ba;
`;

export const ArrowBack = styled.div`
  cursor: pointer;
  height: 50px;
  width: 50px;
  align-items: center;
  justify-content: center;
  background-color: #8d94ba;
  border-radius: 50%;
  display: flex;
`;

export const OptionWrapper = styled.div.attrs((props) => ({
  className: "draggable",
}))<OptionWrapperType>`
  position: relative;
  background-color: #8d94ba;
  padding: 20px;
  cursor: move;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 15px;
  &.dragging {
    opacity: 0.7;
  }
`;

export const Position = styled.div`
  position: absolute;
  top: -5px;
  left: -5px;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #424b54;
  background-color: #ddd8b8;
  border-radius: 50%;
`;

export const CharacterItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
export const CharacterItemName = styled.div``;
export const CharacterItemImage = styled.img`
  object-fit: cover;
  border-radius: 12px;
  width: 100%;
  height: 250px;
  margin-bottom: -3px;
`;

export const StyledDropdown = styled(Dropdown)``;
