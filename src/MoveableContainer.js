import React from "react";
import styled from "styled-components";
import { MOVEABLE_ITEM_CLASS } from "./MoveableItem";

export const CURRENT_ITEM_SELECTED = "CURRENT_ITEM_SELECTED";

const MoveableContainer = React.memo(({ children }) => {
  const dragStart = (e) => {
    const moveableItem = e.target.closest(`.${MOVEABLE_ITEM_CLASS}`);
    if (!moveableItem || !moveableItem.id) {
      window[CURRENT_ITEM_SELECTED] = null;
      return;
    }

    window[CURRENT_ITEM_SELECTED] = window[moveableItem.id];

    if (e.type === "touchstart") {
      window[CURRENT_ITEM_SELECTED].initialX =
        e.touches[0].clientX - window[CURRENT_ITEM_SELECTED].xOffset;
      window[CURRENT_ITEM_SELECTED].initialY =
        e.touches[0].clientY - window[CURRENT_ITEM_SELECTED].yOffset;
    } else {
      window[CURRENT_ITEM_SELECTED].initialX =
        e.clientX - window[CURRENT_ITEM_SELECTED].xOffset;
      window[CURRENT_ITEM_SELECTED].initialY =
        e.clientY - window[CURRENT_ITEM_SELECTED].yOffset;
    }
  };

  const dragEnd = (e) => {
    if (!window[CURRENT_ITEM_SELECTED]) return;
    window[CURRENT_ITEM_SELECTED].initialX =
      window[CURRENT_ITEM_SELECTED].currentX;
    window[CURRENT_ITEM_SELECTED].initialY =
      window[CURRENT_ITEM_SELECTED].currentY;

    window[CURRENT_ITEM_SELECTED] = null;
  };

  const drag = (e) => {
    e.preventDefault();
    if (!window[CURRENT_ITEM_SELECTED]) return;

    if (e.type === "touchmove") {
      window[CURRENT_ITEM_SELECTED].currentX =
        e.touches[0].clientX - window[CURRENT_ITEM_SELECTED].initialX;
      window[CURRENT_ITEM_SELECTED].currentY =
        e.touches[0].clientY - window[CURRENT_ITEM_SELECTED].initialY;
    } else {
      window[CURRENT_ITEM_SELECTED].currentX =
        e.clientX - window[CURRENT_ITEM_SELECTED].initialX;
      window[CURRENT_ITEM_SELECTED].currentY =
        e.clientY - window[CURRENT_ITEM_SELECTED].initialY;
    }
    window[CURRENT_ITEM_SELECTED].xOffset =
      window[CURRENT_ITEM_SELECTED].currentX;
    window[CURRENT_ITEM_SELECTED].yOffset =
      window[CURRENT_ITEM_SELECTED].currentY;
    setTranslate(
      window[CURRENT_ITEM_SELECTED].currentX,
      window[CURRENT_ITEM_SELECTED].currentY
    );
  };

  const setTranslate = (xPos, yPos) => {
    window[CURRENT_ITEM_SELECTED].itemRef.current.style.transform =
      "translate(" + xPos + "px, " + yPos + "px)";
  };

  return (
    <MoveableWrapper
      onMouseDown={dragStart}
      onMouseUp={dragEnd}
      onMouseMove={drag}
      onMouseLeave={dragEnd}
      className="MoveableWrapper"
    >
      {children}
    </MoveableWrapper>
  );
});

const MoveableWrapper = styled.div`
  width: 100%;
  height: 400px;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  touch-action: none;
`;

export default MoveableContainer;
