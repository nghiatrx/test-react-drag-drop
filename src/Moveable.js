import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";

const Moveable = React.memo(({ children }) => {
  const [active, setActive] = useState(false);
  const [id, setId] = useState(null);

  useEffect(() => {
    const id = uuidv4();
    setId(id);
    window[id] = {
      currentX: null,
      currentY: null,
      initialX: null,
      initialY: null,
      xOffset: null,
      yOffset: null,
    };
  }, []);

  const dragStart = (e) => {
    window[id].dragItem = e.currentTarget;
    if (e.type === "touchstart") {
      window[id].initialX = e.touches[0].clientX - window[id].xOffset;
      window[id].initialY = e.touches[0].clientY - window[id].yOffset;
    } else {
      window[id].initialX = e.clientX - window[id].xOffset;
      window[id].initialY = e.clientY - window[id].yOffset;
    }
    setActive(true);
  };

  const dragEnd = (e) => {
    window[id].initialX = window[id].currentX;
    window[id].initialY = window[id].currentY;
    setActive(false);
  };

  const drag = (e) => {
    if (active) {
      e.preventDefault();

      if (e.type === "touchmove") {
        window[id].currentX = e.touches[0].clientX - window[id].initialX;
        window[id].currentY = e.touches[0].clientY - window[id].initialY;
      } else {
        window[id].currentX = e.clientX - window[id].initialX;
        window[id].currentY = e.clientY - window[id].initialY;
      }

      window[id].xOffset = window[id].currentX;
      window[id].yOffset = window[id].currentY;

      setTranslate(window[id].currentX, window[id].currentY);
    }
  };

  const setTranslate = (xPos, yPos) => {
    window[id].dragItem.style.transform =
      "translate(" + xPos + "px, " + yPos + "px)";
  };

  return (
    <MoveableWrapper
      onMouseDown={dragStart}
      onMouseUp={dragEnd}
      onMouseMove={drag}
      onMouseLeave={dragEnd}
      className="moveable"
      active={active}
    >
      {children}
    </MoveableWrapper>
  );
});

const MoveableWrapper = styled.div`
  cursor: ${(props) => (props.active ? "move" : "default")};
  transform: translate(0px, 0px);
`;

export default Moveable;
