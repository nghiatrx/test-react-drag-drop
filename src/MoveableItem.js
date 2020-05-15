import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
export const MOVEABLE_ITEM_CLASS = "moveable-item";

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
    <div ref={itemRef} className={MOVEABLE_ITEM_CLASS}>
      {children}
    </div>
  );
});

export default MoveableItem;
