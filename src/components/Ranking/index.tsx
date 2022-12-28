import React, { useCallback, useEffect, useRef, useState } from "react";
import { changeRoute } from "../../redux/routesSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import {
  ArrowBack,
  Header,
  Wrapper,
  Body,
  Title,
  OptionWrapper,
  Position,
  StyledDropdown as Dropdown,
} from "./styles";
import { getDragAfterElement } from "../../utils/drag-and-drop";
import {
  changeTopFive,
  selectTopFive,
  selectFavoriteCharacters,
} from "../../redux/charactersSlice";
import { Option } from "react-dropdown";
import CharacterItem from "./character-item";

function Ranking() {
  const dispatch = useDispatch();

  const ranking = useSelector(selectTopFive);
  const [currentRanking, setCurrentRanking] = useState(ranking);

  const favoriteCharacters = useSelector(selectFavoriteCharacters);
  const parsedFavoriteCharacters = favoriteCharacters.map((character) => {
    return { value: character.id.toString(), label: character.name };
  }) as Option[];

  function handleGoToHome() {
    dispatch(changeRoute("home"));
  }

  const handleFindIndexOnRanking = useCallback(
    (id: string | number) => {
      let afterElementIndex = -1;
      currentRanking.forEach((value) => {
        if (value.id.toString() === id?.toString()) {
          afterElementIndex = currentRanking.indexOf(value);
        }
        return value;
      });
      return afterElementIndex;
    },
    [currentRanking]
  );

  const handleNewRanking = useCallback(
    ({
      draggable,
      currentRanking,
      afterElement,
    }: {
      draggable: Element | null;
      currentRanking: {
        id: string;
        label: string;
      }[];
      afterElement?: Element;
    }) => {
      if (draggable) {
        const draggableValue = draggable.getAttribute("value");
        const draggableLabel = draggable.getAttribute("label");
        const newRanking = currentRanking.filter(
          (value) => value.id !== draggableValue
        );

        if (afterElement) {
          const afterElementValue = afterElement.getAttribute("value");

          const afterElementIndex = handleFindIndexOnRanking(
            afterElementValue!
          );

          newRanking.splice(afterElementIndex - 1, 0, {
            id: draggableValue || "",
            label: draggableLabel || "",
          });

          setCurrentRanking(newRanking);
        } else {
          setCurrentRanking([
            ...newRanking,
            { id: draggableValue || "", label: draggableLabel || "" },
          ]);
        }
      }
    },
    [handleFindIndexOnRanking]
  );

  const handleAllowDragAndDrop = useCallback(() => {
    const draggables = document.querySelectorAll(".draggable");
    const containers = document.querySelectorAll(".container");

    draggables.forEach((draggable) => {
      draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
      });
      draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
      });
    });

    containers.forEach((container) => {
      container.addEventListener("dragover", (e) => {
        const event = e as MouseEvent;
        event.preventDefault();
        const afterElement = getDragAfterElement(container, event.clientX);
        const currentDraggable = document.querySelector(".dragging");
        if (!afterElement) {
          container.appendChild(currentDraggable as Node);
          handleNewRanking({ draggable: currentDraggable, currentRanking });
        } else {
          container.insertBefore(currentDraggable as Node, afterElement);
          handleNewRanking({
            draggable: currentDraggable,
            currentRanking,
            afterElement,
          });
        }
      });
    });
  }, [currentRanking, handleNewRanking]);

  useEffect(() => {
    handleAllowDragAndDrop();

    return () => {
      dispatch(changeTopFive(currentRanking));
      const rankingToSave = JSON.stringify(currentRanking);
      localStorage.setItem("ranking", rankingToSave);

      const draggables = document.querySelectorAll(".draggable");
      const containers = document.querySelectorAll(".container");

      containers.forEach((container) => {
        container.removeEventListener("dragover", () => {});
      });
      draggables.forEach((dragabble) => {
        dragabble.removeEventListener("dragstart", () => {});
        dragabble.removeEventListener("dragend", () => {});
      });
    };
  }, [currentRanking, dispatch, handleAllowDragAndDrop]);

  function handleChangeRankingItem(
    characterOption: Option,
    previousOption: { id: string; label: string }
  ) {
    if (currentRanking.find((value) => value.id === characterOption.value)) {
      alert("You can't select the same character twice!");
      return;
    }

    const previousIndex = handleFindIndexOnRanking(previousOption.id);
    const newRanking = currentRanking.filter(
      (value) => value.id !== previousOption.id
    );

    newRanking.splice(previousIndex, 0, {
      id: characterOption.value,
      label: characterOption.label as string,
    });
    setCurrentRanking(newRanking);
  }

  return (
    <Wrapper>
      <Header>
        <ArrowBack onClick={() => handleGoToHome()}>
          <FontAwesomeIcon icon={faArrowLeft} size="xl" color="#424b54" />
        </ArrowBack>
        <Title>Ranking of characters</Title>
      </Header>
      <Body>
        {currentRanking.map((character, index) => (
          <OptionWrapper
            key={character.id}
            value={character.id}
            label={character.label}
            draggable
          >
            <Position>{index + 1}</Position>
            <CharacterItem id={character.id}></CharacterItem>
            <Dropdown
              value={{ label: character.label, value: character.id }}
              options={parsedFavoriteCharacters}
              onChange={(value) => handleChangeRankingItem(value, character)}
            />
          </OptionWrapper>
        ))}
      </Body>
    </Wrapper>
  );
}

export default Ranking;
