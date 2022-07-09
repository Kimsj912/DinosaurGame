import styled from '@emotion/styled';
import { useRef } from 'react';
import './App.css';
import GameCanvas from './components/GameCanvas';
import { useEffect } from 'react';
import { useState } from 'react';
import { RefObject } from 'react';
import useClientWidthHeight from './hooks/useClientWidthHeight';

function App() {
  const canvasBoxRef: RefObject<HTMLElement> = useRef<HTMLElement>(null);
  const clientRect = useClientWidthHeight(canvasBoxRef);
  const canvasWidth = clientRect.width;
  const canvasHeight =clientRect.height;
  
  return (
    <div> 
      <Header>
        <div>
          score : <span id="score">0</span>
        </div>
        <div>
          life : <span id="myLife">3</span>
        </div>
        <button id="hearts" type="button" className="btn btn-link">
                <span className="glyphicon glyphicon-heart" aria-hidden="true"></span>
                <span className="glyphicon glyphicon-heart" aria-hidden="true"></span>
                <span className="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>
            </button>
            <button id = "restart" type="button" className="btn btn-default">
                <span className="glyphicon glyphicon-repeat" aria-hidden="true"></span>
            </button>
      </Header>
      <CanvasBox ref={canvasBoxRef}>
        <GameCanvas canvasWidth={canvasWidth} canvasHeight={canvasHeight} />
      </CanvasBox>
    </div>
  );
}

const Header = styled.header`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
`;

const CanvasBox = styled.main`
  display: block;
  margin: 0 auto;
  width: 100vw;
  aspect-ratio: 4/3;
`;

export default App;
