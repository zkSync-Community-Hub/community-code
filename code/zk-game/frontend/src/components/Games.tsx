import { useRef, useState } from 'react';
import Brickles from './Brickles';
import Draggable from 'react-draggable';

interface GamesProps {
  highestZIndex: number;
  incrementZIndex: () => void;
}

export default function Games({ highestZIndex, incrementZIndex }: GamesProps) {
  const [showGames, setShowGames] = useState(false);
  const [showBrickles, setShowBrickles] = useState(false);
  const [gamesWindowZIndex, setGamesWindowZIndex] = useState(1);
  const [bricklesWindowZIndex, setBricklesWindowZIndex] = useState(1);
  const nodeRef = useRef(null);

  function handleShowGamesClick() {
    setShowGames(true);
    handleGamesWindowClick();
  }

  function handleGamesWindowClick() {
    setGamesWindowZIndex(highestZIndex);
    incrementZIndex();
  }

  function handleBricklesWindowClick() {
    setBricklesWindowZIndex(highestZIndex);
    incrementZIndex();
  }

  function handleShowBrickles() {
    setShowBrickles(true);
    handleBricklesWindowClick();
  }

  return (
    <>
      <div
        className="item"
        id="games"
        onDoubleClick={handleShowGamesClick}
      >
        <div className="icon">
          <div className="disk big">
            <div className="label"></div>
            <div className="shutter"></div>
          </div>
        </div>
        <label>Games</label>
      </div>
      {showGames && (
        <Draggable
          bounds={{ top: -25, left: -30, right: 775, bottom: 465 }}
          nodeRef={nodeRef}
          offsetParent={document.body}
        >
          <section
            className="window"
            id="gamesDisk"
            style={{ zIndex: gamesWindowZIndex }}
          >
            <header>
              <button
                className="close"
                onClick={() => setShowGames(false)}
              />
              <h2
                className="title"
                ref={nodeRef}
              >
                {' '}
                <span>Games</span>
              </h2>
              <ul className="sortBar">
                <li>Name</li>
                <li>Size</li>
                <li>Kind</li>
              </ul>
            </header>
            <div
              className="content"
              onClick={handleGamesWindowClick}
            >
              <ul className="list">
                <li
                  className="file"
                  id="brickles-file"
                  onDoubleClick={handleShowBrickles}
                >
                  <label>Brickles</label>
                  <span>39K</span>
                  <em>application</em>
                </li>
              </ul>
            </div>
          </section>
        </Draggable>
      )}
      {showBrickles && (
        <Brickles
          setShowBrickles={setShowBrickles}
          zIndex={bricklesWindowZIndex}
          handleBricklesWindowClick={handleBricklesWindowClick}
        />
      )}
    </>
  );
}
