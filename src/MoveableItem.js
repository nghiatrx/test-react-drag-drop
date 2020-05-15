import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import styled from "styled-components";
import BorderControl, { BORDER_CONTROL_CLASS } from "./BorderControl";

export const MOVEABLE_ITEM_CLASS = "moveable-item";

export const SELECTED_CLASS = "selected";
export const MOVEABLE_CLASS = "moveable";

const MoveableItem = React.memo(({ children }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    const id = uuidv4();
    window[id] = {
      currentX: null,
      currentY: null,
      initialX: null,
      initialY: null,
      xOffset: 0,
      yOffset: 0,
      itemRef: itemRef,
    };
    itemRef.current.id = id;
  }, []);

  return (
    <Wrapper ref={itemRef} className={MOVEABLE_ITEM_CLASS}>
      <BorderControl />
      {children}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  transform: translate(0px, 0px) scale(1, 1) rotate(0deg);
  &.${MOVEABLE_CLASS} {
    cursor: move;
  }
  &.${SELECTED_CLASS} {
    .${BORDER_CONTROL_CLASS} {
      display: block;
    }
  }
`;

export default MoveableItem;
