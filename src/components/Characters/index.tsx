import React, { useEffect } from "react";
import { Character } from "../../types/marvel-api-types";
import CharacterItem from "./character-item";
import { Charactersrapper as Wrapper } from "./styles";
import {
  changeFavoriteCharacters,
  changeTopFive,
} from "../../redux/charactersSlice";
import { useDispatch } from "react-redux";
type CharactersType = {
  isLoading: boolean;
  characters: Character[] | undefined;
};

function Characters({ characters, isLoading }: CharactersType) {
  const dispatch = useDispatch();

  useEffect(() => {
    const favoriteSaved = localStorage.getItem("favorites");
    const rankingSaved = localStorage.getItem("ranking");

    if (favoriteSaved) {
      dispatch(
        changeFavoriteCharacters(JSON.parse(favoriteSaved) as Character[])
      );
    }
    if (rankingSaved) {
      dispatch(
        changeTopFive(
          JSON.parse(rankingSaved) as { id: string; label: string }[]
        )
      );
    }
  }, [dispatch]);

  return (
    <>
      {isLoading || !characters ? (
        <div>loading</div>
      ) : (
        <Wrapper>
          {characters.map((character: Character) => (
            <CharacterItem key={character.id} character={character} />
          ))}
        </Wrapper>
      )}
    </>
  );
}

export default Characters;
