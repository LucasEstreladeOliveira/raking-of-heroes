import React, { useEffect, useState } from "react";
import { selectFavoriteCharacters } from "../../redux/charactersSlice";
import { useSelector } from "react-redux";
import { Character } from "../../types/marvel-api-types";
import {
  CharacterItemWrapper as Wrapper,
  CharacterItemName as Name,
  CharacterItemImage as Image,
} from "./styles";

function CharacterItem({ id }: { id: string }) {
  const favoriteCharacters = useSelector(selectFavoriteCharacters);
  const [character, setCharacter] = useState<Character>();

  useEffect(() => {
    setCharacter(favoriteCharacters.filter((c) => c.id.toString() === id)[0]);
  }, [favoriteCharacters, id]);

  return (
    <Wrapper>
      <Name>{character?.name || "Select a character"}</Name>
      <Image
        src={
          character
            ? `${character?.thumbnail.path}.${character?.thumbnail.extension}`
            : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
        }
      />
    </Wrapper>
  );
}

export default CharacterItem;
