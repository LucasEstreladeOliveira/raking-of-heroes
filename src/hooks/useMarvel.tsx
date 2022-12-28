import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Character, MarvelApiResponse } from "../types/marvel-api-types";
import { useSelector } from "react-redux";
import {
  selectHaveSeries,
  selectHaveStory,
  selectName,
} from "../redux/filterSlice";
import useDebounce from "./useDebounce";

async function handleRequest<T>(
  endpoint: string,
  filters?: { [key: string]: string }
) {
  const timestamp = "1672097961664";

  let requestEndpoint = `${process.env.REACT_APP_MARVEL_PUBLIC_HOST}/public${endpoint}?ts=${timestamp}&apikey=${process.env.REACT_APP_MARVEL_PUBLIC_KEY}&hash=${process.env.REACT_APP_MARVEL_PUBLIC_DIGEST_MD5}
`;

  if (filters) {
    Object.keys(filters).forEach((key) => {
      requestEndpoint = `${requestEndpoint}&${key}=${filters[key]}`;
    });
  }

  const response = await axios.get<T>(requestEndpoint);

  return response;
}

export function useCharacters(filters?: { [key: string]: string }) {
  const name = useSelector(selectName);
  const haveStories = useSelector(selectHaveStory);
  const haveSeries = useSelector(selectHaveSeries);
  const [currentCharacters, setCurrentCharacters] = useState<Character[]>();
  const debouncedValue = useDebounce(name, 500);

  async function apiSearch() {
    return await handleRequest<MarvelApiResponse<Character>>(
      "/characters",
      filters
    );
  }
  const characters = useQuery(["characters", debouncedValue], apiSearch);

  useEffect(() => {
    if (haveSeries) {
      setCurrentCharacters(
        characters.data?.data.data.results.filter(
          (character) => character.series.available > 0
        )
      );
    } else {
      setCurrentCharacters(characters.data?.data.data.results);
    }
  }, [currentCharacters, characters.data?.data.data.results, haveSeries]);

  useEffect(() => {
    if (haveStories) {
      setCurrentCharacters(
        characters.data?.data.data.results.filter(
          (character) => character.stories.available > 0
        )
      );
    } else {
      setCurrentCharacters(characters.data?.data.data.results);
    }
  }, [currentCharacters, characters.data?.data.data.results, haveStories]);

  return {
    characters: currentCharacters,
    isLoading: characters.isLoading,
    refetch: characters.refetch,
  };
}
