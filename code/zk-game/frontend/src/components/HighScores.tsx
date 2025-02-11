import type { Address } from 'viem';
import type { Score } from '../utils/types';
import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from 'react';
import { getPlayerHighScore } from '../utils/wagmi-config';
import Draggable from 'react-draggable';

interface HighScoresProps {
  highScores: Score[];
  isConnected: boolean;
  address: Address | undefined;
  setShowHighScores: Dispatch<SetStateAction<boolean>>;
  zIndex: number;
  handleHSWindowClick: () => void;
}

export default function HighScores({
  highScores,
  isConnected,
  address,
  setShowHighScores,
  zIndex,
  handleHSWindowClick,
}: HighScoresProps) {
  const [playerHighScore, setPlayerHighScore] = useState<Score | null>(null);
  const nodeRef = useRef(null);

  useEffect(() => {
    async function updatePlayerHighScore() {
      if (isConnected && address) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const latestScore = (await getPlayerHighScore(address)) as any;
        if (latestScore?.blocksDestroyed) {
          setPlayerHighScore(latestScore as Score);
        }
      }
    }

    updatePlayerHighScore();
  }, [isConnected, address, highScores]);

  const formatTime = (timeString: string) => {
    const endLimit = timeString.length - 3;
    return `${timeString.substring(0, timeString.length - endLimit - 1)}.${timeString.substring(endLimit)}`;
  };

  return (
    <Draggable
      bounds={{ top: -25, left: -30, right: 775, bottom: 465 }}
      nodeRef={nodeRef}
      offsetParent={document.body}
    >
      <section
        className="window"
        id="high-scores-window"
        style={{ zIndex }}
      >
        <header>
          <button
            className="close"
            onClick={() => setShowHighScores(false)}
          />
          <h2
            className="title"
            ref={nodeRef}
          >
            {' '}
            <span>High Scores</span>
          </h2>
          <div className="infoBar">
            <div>Address</div>
            <div>Score</div>
            <div>Time</div>
          </div>
        </header>
        <div
          className="content"
          id="high-scores-list"
          onClick={handleHSWindowClick}
        >
          <div className="high-scores-list-item account-high-score">
            <div>My Account</div>
            <div id="my-account-high-score">
              {isConnected && playerHighScore ? playerHighScore.blocksDestroyed.toString() : '~'}
            </div>
            <div id="my-account-time">
              {isConnected && playerHighScore ? formatTime(playerHighScore.timeElapsed.toString()) : '~'}
            </div>
          </div>
          {highScores.map((score, index) => {
            const timeString = score.timeElapsed.toString();
            const player = score.player;
            return (
              <div
                key={player + index}
                className="high-scores-list-item"
              >
                <div>{`${player.substring(0, 10)}...${player.substring(player.length - 8)}`}</div>
                <div>{score.blocksDestroyed.toString()}</div>
                <div>{formatTime(timeString)}</div>
              </div>
            );
          })}
        </div>
      </section>
    </Draggable>
  );
}
