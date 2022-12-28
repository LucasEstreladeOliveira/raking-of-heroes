import React, { useEffect, useState } from "react";
import { Character, ResourceList } from "../../types/marvel-api-types";
import {
  CharacterItemWrapper as Wrapper,
  CharacterItemImage as Image,
  CharacterItemName as Name,
  CharacterItemImageOpacityScreen as OpacityScreen,
  CharacterItemFavorite as Favorite,
  CharacterItemDetails as Details,
  CharacterItemEvents as Events,
  CharacterItemDetailsAndEventsWrapper as DetailsAndEventsWrapper,
} from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  changeFavoriteCharacters,
  removeFromFavoriteCharacters,
  selectFavoriteCharacters,
} from "../../redux/charactersSlice";

type CharacterItemType = {
  character: Character;
};

function CharacterItem({ character }: CharacterItemType) {
  const dispatch = useDispatch();
  const favoriteCharacters = useSelector(selectFavoriteCharacters);
  const [isFavorite, setIsFavorite] = useState(false);
  const [detailsToggled, setDetailsToggled] = useState(false);

  useEffect(() => {
    const isFavoriteCharacter = favoriteCharacters.find(
      (c) => c.id === character.id
    );
    setIsFavorite(isFavoriteCharacter ? true : false);
  }, [setIsFavorite, favoriteCharacters, character.id]);

  function handleToggleFavoriteCharacter() {
    if (isFavorite) {
      dispatch(removeFromFavoriteCharacters(character.id));
    } else {
      dispatch(changeFavoriteCharacters([character]));
    }
  }

  function handleToggleDetails() {
    setDetailsToggled((toggle) => !toggle);
    console.log("events", character.events.items.map);
  }

  function handleEventsFormat(characterEvents: ResourceList) {
    let events = "";

    if (characterEvents.available < 1) return "No events available";
    characterEvents.items.forEach((event) => {
      events = events.concat(", ", event.name);
    });
    return events
      .split(",")
      .filter((_event, index) => index !== 0)
      .join(", ");
  }

  return (
    <Wrapper>
      <OpacityScreen
        onClick={() => handleToggleDetails()}
        detailsToggled={detailsToggled}
      />
      {detailsToggled ? (
        <DetailsAndEventsWrapper onClick={() => handleToggleDetails()}>
          <Details>
            Details: {character?.description || "No description available"}
          </Details>
          <Events>Events: {handleEventsFormat(character?.events)}</Events>
        </DetailsAndEventsWrapper>
      ) : null}
      <Favorite onClick={() => handleToggleFavoriteCharacter()}>
        <FontAwesomeIcon icon={faStar} color={isFavorite ? "yellow" : "gray"} />
      </Favorite>
      <Image
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
      />
      <Name>{character.name}</Name>
    </Wrapper>
  );
}

export default CharacterItem;
