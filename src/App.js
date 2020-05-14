import React from "react";
import Moveable from "./Moveable";
import styled from "styled-components";

function App() {
  return (
    <Wrapper>
      <Moveable>
        <Item1 />
      </Moveable>

      <Moveable>
        <Item2 />
      </Moveable>

      <Moveable>
        <img alt="" src="https://via.placeholder.com/150" />
      </Moveable>
    </Wrapper>
  );
}

const Item1 = styled.div`
  width: 100px;
  height: 100px;
  background-color: rgb(245, 230, 99);
  touch-action: none;
  user-select: none;
`;

const Item2 = styled.div`
  width: 100px;
  height: 100px;
  background-color: blue;
  touch-action: none;
  user-select: none;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 400px;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  touch-action: none;
`;

export default App;
