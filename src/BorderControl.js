import React from "react";
import styled from "styled-components";

export const BORDER_CONTROL_CLASS = "border-control";
export const CORNER_BTN_CLASS = "corner-btn";

const TOP_LEFT = "top-left";
const BOTTOM_LEFT = "bottom-left";
const TOP_RIGHT = "top-right";
const BOTTOM_RIGHT = "bottom-right";

const BorderControl = React.memo(({}) => {
  return (
    <BorderControlWrapper className={BORDER_CONTROL_CLASS}>
      <CornerBtn className={`${CORNER_BTN_CLASS} ${TOP_LEFT}`} />
      <CornerBtn className={`${CORNER_BTN_CLASS} ${BOTTOM_LEFT}`} />
      <CornerBtn className={`${CORNER_BTN_CLASS} ${TOP_RIGHT}`} />
      <CornerBtn className={`${CORNER_BTN_CLASS} ${BOTTOM_RIGHT}`} />
    </BorderControlWrapper>
  );
});

const BORDER_COLOR = "#2c83eb";

const CornerBtn = styled.div`
  width: 10px;
  height: 10px;
  position: absolute;
  background-color: #fff;
  border: 1px solid ${BORDER_COLOR};
  &.${TOP_LEFT} {
    top: -5px;
    left: -5px;
    cursor: nw-resize;
  }
  &.${BOTTOM_LEFT} {
    bottom: -5px;
    left: -5px;
    cursor: ne-resize;
  }
  &.${TOP_RIGHT} {
    top: -5px;
    right: -5px;
    cursor: ne-resize;
  }
  &.${BOTTOM_RIGHT} {
    bottom: -5px;
    right: -5px;
    cursor: nw-resize;
  }
`;

const BorderControlWrapper = styled.div`
  display: none;
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  transition: opacity 0.3s ease;
  background-image: linear-gradient(90deg, ${BORDER_COLOR} 0, ${BORDER_COLOR}),
    linear-gradient(180deg, ${BORDER_COLOR} 0, ${BORDER_COLOR}),
    linear-gradient(90deg, ${BORDER_COLOR} 0, ${BORDER_COLOR}),
    linear-gradient(180deg, ${BORDER_COLOR} 0, ${BORDER_COLOR});
  background-position: top, 100%, bottom, 0;
  background-size: 12px 1px, 1px 12px, 12px 1px, 1px 12px;
  background-repeat: repeat-x, repeat-y, repeat-x, repeat-y;
`;

export default BorderControl;
