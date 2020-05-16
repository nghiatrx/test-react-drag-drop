import React from "react";
import MoveableContainer from "./MoveableContainer";
import MoveableItem from "./MoveableItem";
import styled from "styled-components";

function App() {
  return (
    <div>
      <MoveableContainer>
        <MoveableItem>
          <Item1 />
        </MoveableItem>
        <MoveableItem>
          <Item2 />
        </MoveableItem>
        <MoveableItem>
          <div>
            <h1>Hello</h1>
          </div>
        </MoveableItem>
        <MoveableItem>
          <img alt="" src="https://via.placeholder.com/150" />
          <Item1 />
        </MoveableItem>
      </MoveableContainer>
    </div>
  );
}

const Item1 = styled.div`
  width: 100px;
  height: 100px;
  background-color: rgb(245, 230, 99);
`;

const Item2 = styled.div`
  width: 100px;
  height: 100px;
  background-color: blue;
`;

export default App;
