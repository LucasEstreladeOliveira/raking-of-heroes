import styled from "styled-components";

type CharacterItemImageOpacityScreenType = {
  detailsToggled: boolean;
};

export const Charactersrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  width: Calc(100% - 60px);
  gap: 20px;
  padding: 30px;
`;
export const CharacterItemWrapper = styled.div`
  position: relative;
`;
export const CharacterItemName = styled.div`
  position: absolute;
  bottom: 10px;
  left: 5px;
  color: #ddd8b8;
  font-weight: bold;
  z-index: 2;
`;

export const CharacterItemImageOpacityScreen = styled.div<CharacterItemImageOpacityScreenType>`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: black;
  border-radius: 12px;
  opacity: ${({ detailsToggled }) => (detailsToggled ? 0.7 : 0.4)};
  z-index: 1;
  cursor: pointer;
`;

export const CharacterItemImage = styled.img`
  object-fit: cover;
  border-radius: 12px;
  width: 100%;
  height: 250px;
  margin-bottom: -3px;
`;
export const CharacterItemFavorite = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 2;
`;

export const CharacterItemDetailsAndEventsWrapper = styled.div`
  position: absolute;
  z-index: 2;
  padding: 15px;
  cursor: pointer;
  overflow: auto;
  height: Calc(100% - 68px);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const CharacterItemDetails = styled.div`
  color: white;
`;

export const CharacterItemEvents = styled.div`
  color: white;
`;
