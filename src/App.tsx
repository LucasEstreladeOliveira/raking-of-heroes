import React, { useEffect } from "react";
import Filters from "./components/Filters";
import { useCharacters } from "./hooks/useMarvel";
import { selectName } from "./redux/filterSlice";
import { useSelector } from "react-redux";
import Characters from "./components/Characters";
import { selectCurrentRoute } from "./redux/routesSlice";
import Ranking from "./components/Ranking";
import { Wrapper } from "./styles";

function App() {
  const name = useSelector(selectName);
  const currentRoute = useSelector(selectCurrentRoute);

  const { characters, refetch, isLoading } = useCharacters(handleFilter());

  function handleFilter() {
    let filter = {};
    if (name) {
      filter = Object.assign({ nameStartsWith: name }, filter);
    }

    return Object.keys(filter).length >= 1 ? filter : undefined;
  }

  return (
    <Wrapper>
      {currentRoute === "home" ? (
        <>
          <Filters refetch={refetch} />
          <Characters characters={characters} isLoading={isLoading} />
        </>
      ) : (
        <>
          <Ranking />
        </>
      )}
    </Wrapper>
  );
}

export default App;
