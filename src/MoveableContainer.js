import React from "react";
import styled from "styled-components";
import {
  MOVEABLE_ITEM_CLASS,
  MOVEABLE_CLASS,
  SELECTED_CLASS,
} from "./MoveableItem";
import { CORNER_BTN_CLASS } from "./BorderControl";

export const ITEM_SELECTED = "ITEM_SELECTED";

export const ACTION_TYPE = {
  MOVE: "MOVE",
  RESIZE: "RESIZE",
  ROTATE: "ROTATE",
};

const clearItemSelected = () => {
  const itemSelected = window.document.getElementsByClassName(
    SELECTED_CLASS
  )[0];
  if (itemSelected) itemSelected.classList.remove(SELECTED_CLASS);
};

const MoveableContainer = React.memo(({ children }) => {
  const handleMouseDown = (e) => {
    clearItemSelected();

    const cornerBtnSelected = e.target.closest(`.${CORNER_BTN_CLASS}`);

    const moveableItem = e.target.closest(`.${MOVEABLE_ITEM_CLASS}`);
    if (!moveableItem || !moveableItem.id) {
      window[ITEM_SELECTED] = null;
      return;
    }

    window[ITEM_SELECTED] = window[moveableItem.id];
    window[ITEM_SELECTED].itemRef.current.classList.add(SELECTED_CLASS);
    window[ITEM_SELECTED].itemRef.current.classList.add(MOVEABLE_CLASS);

    if (cornerBtnSelected) {
      window[ITEM_SELECTED].actionType = ACTION_TYPE.RESIZE;
    } else {
      window[ITEM_SELECTED].actionType = ACTION_TYPE.MOVE;
    }

    if (e.type === "touchstart") {
      window[ITEM_SELECTED].initialX =
        e.touches[0].clientX - window[ITEM_SELECTED].xOffset;
      window[ITEM_SELECTED].initialY =
        e.touches[0].clientY - window[ITEM_SELECTED].yOffset;
    } else {
      window[ITEM_SELECTED].initialX =
        e.clientX - window[ITEM_SELECTED].xOffset;
      window[ITEM_SELECTED].initialY =
        e.clientY - window[ITEM_SELECTED].yOffset;
    }
  };

  const handleMouseUp = (e) => {
    if (!window[ITEM_SELECTED]) return;
    window[ITEM_SELECTED].initialX = window[ITEM_SELECTED].currentX;
    window[ITEM_SELECTED].initialY = window[ITEM_SELECTED].currentY;

    window[ITEM_SELECTED].itemRef.current.classList.remove(MOVEABLE_CLASS);

    window[ITEM_SELECTED] = null;
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (!window[ITEM_SELECTED]) return;

    switch (window[ITEM_SELECTED].actionType) {
      case ACTION_TYPE.MOVE:
        move(e);
        break;
      case ACTION_TYPE.RESIZE:
        resize(e);
        break;
    }
  };

  const resize = (e) => {
    window[ITEM_SELECTED].oldClientX = window[ITEM_SELECTED].currentClientX;
    window[ITEM_SELECTED].oldClientY = window[ITEM_SELECTED].currentClientY;

    window[ITEM_SELECTED].currentClientX = e.clientX;
    window[ITEM_SELECTED].currentClientY = e.clientY;

    if (window[ITEM_SELECTED].oldClientX) {
      if (
        window[ITEM_SELECTED].oldClientX > window[ITEM_SELECTED].currentClientX
      ) {
        // resize down
      }

      if (
        window[ITEM_SELECTED].oldClientY > window[ITEM_SELECTED].currentClientY
      ) {
        // resize down
      }
    }

    // window[ITEM_SELECTED].oldResize =
    // console.log({ newX, newY });
  };

  const move = (e) => {
    if (e.type === "touchmove") {
      window[ITEM_SELECTED].currentX =
        e.touches[0].clientX - window[ITEM_SELECTED].initialX;
      window[ITEM_SELECTED].currentY =
        e.touches[0].clientY - window[ITEM_SELECTED].initialY;
    } else {
      window[ITEM_SELECTED].currentX =
        e.clientX - window[ITEM_SELECTED].initialX;
      window[ITEM_SELECTED].currentY =
        e.clientY - window[ITEM_SELECTED].initialY;
    }
    window[ITEM_SELECTED].xOffset = window[ITEM_SELECTED].currentX;
    window[ITEM_SELECTED].yOffset = window[ITEM_SELECTED].currentY;
    setTranslate(
      window[ITEM_SELECTED].currentX,
      window[ITEM_SELECTED].currentY
    );
  };

  const setTranslate = (xPos, yPos) => {
    if (!window[ITEM_SELECTED].itemRef.current.style.transform) {
      window[
        ITEM_SELECTED
      ].itemRef.current.style.transform = `translate(${xPos}px, ${yPos}px) scale(1, 1) rotate(0deg)`;
      return;
    }
    window[ITEM_SELECTED].itemRef.current.style.transform = window[
      ITEM_SELECTED
    ].itemRef.current.style.transform.replace(
      /translate\(.*\)/,
      `translate(${xPos}px, ${yPos}px)`
    );
  };

  return (
    <MoveableWrapper
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      className="MoveableWrapper"
    >
      {children}
    </MoveableWrapper>
  );
});

const MoveableWrapper = styled.div`
  width: 100%;
  height: 600px;
  border: 1px solid #000000;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  touch-action: none;
`;

export default MoveableContainer;
