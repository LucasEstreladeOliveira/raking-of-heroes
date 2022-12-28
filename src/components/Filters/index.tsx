import React, { useEffect } from "react";
import {
  Wrapper,
  Header,
  Body,
  Title,
  Button,
  ButtonWrapper,
  FiltersWrapper,
  Label,
} from "./styles";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { MarvelApiResponse, Character } from "../../types/marvel-api-types";
import {
  selectName,
  selectHaveSeries,
  selectHaveStory,
  changeHaveSeries,
  changeHaveStories,
  changeName,
} from "../../redux/filterSlice";
import { useSelector, useDispatch } from "react-redux";
import Input from "../common/Input";
import Checkbox from "../common/Checkbox";
import { selectFavoriteCharacters } from "../../redux/charactersSlice";
import { changeRoute } from "../../redux/routesSlice";

function Filters({
  refetch,
}: {
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<
    QueryObserverResult<
      AxiosResponse<MarvelApiResponse<Character>, any>,
      unknown
    >
  >;
}) {
  const dispatch = useDispatch();
  const name = useSelector(selectName);
  const haveStories = useSelector(selectHaveStory);
  const haveSeries = useSelector(selectHaveSeries);
  const favoriteCharacters = useSelector(selectFavoriteCharacters);

  function handleChangeName(value: string) {
    dispatch(changeName(value));
  }

  function handleChangeHaveSeries(value: boolean) {
    dispatch(changeHaveSeries(value));
  }

  function handleChangeHaveStories(value: boolean) {
    dispatch(changeHaveStories(value));
  }

  function handleSaveFavoriteCharacters() {
    const favoritesToSave = JSON.stringify(favoriteCharacters);
    localStorage.setItem("favorites", favoritesToSave);
  }

  function handleGoToRanking() {
    dispatch(changeRoute("ranking"));
  }

  useEffect(() => {
    refetch();
  }, [refetch, name]);

  return (
    <Wrapper>
      <Header>
        <Title>List of characters:</Title>
        <ButtonWrapper>
          <Button color="#5e5df0" onClick={() => handleGoToRanking()}>
            See your charater ranking
          </Button>
          <Button
            color="#4CAF50"
            onClick={() => {
              handleSaveFavoriteCharacters();
            }}
          >
            Save favorite characters
          </Button>
        </ButtonWrapper>
      </Header>
      <Body>
        <Label>Filters:</Label>
        <FiltersWrapper>
          <Input
            title="Name"
            value={name}
            onChange={(e) => handleChangeName(e.target.value)}
          />
          <Checkbox
            title="Have any comic series?"
            checked={haveSeries}
            onChange={(e) => handleChangeHaveSeries(e.target.checked)}
          />
          <Checkbox
            title="Have any comic story?"
            checked={haveStories}
            onChange={(e) => handleChangeHaveStories(e.target.checked)}
          />
        </FiltersWrapper>
      </Body>
    </Wrapper>
  );
}

export default Filters;
