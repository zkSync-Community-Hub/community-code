import Draggable from 'react-draggable';
import Spinner from './Spinner';
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import { Action, ProofStatus } from '../utils/types';
import init, { GameWrapper } from '../../wasm/game_wasm';
import { submitProof } from '../utils/proofs';
import { verifyProof } from '../utils/wagmi-config';

interface BricklesProps {
  setShowBrickles: Dispatch<SetStateAction<boolean>>;
  zIndex: number;
  handleBricklesWindowClick: () => void;
}

export default function Brickles({ setShowBrickles, zIndex, handleBricklesWindowClick }: BricklesProps) {
  const [gameStatus, setGameStatus] = useState<'not-started' | 'playing' | 'over'>('not-started');
  const [proofStatus, setProofStatus] = useState<ProofStatus | 'none'>('none');
  const [currentControl, setCurrentControl] = useState('None');
  const canvasRef: MutableRefObject<HTMLCanvasElement | undefined> = useRef();
  const gameRef: MutableRefObject<GameWrapper | undefined> = useRef();
  const requestRef: MutableRefObject<number | undefined> = useRef();
  const [recordedActions, setRecordedActions] = useState<Action[]>([]);
  const [finalScoreAndTime, setFinalScoreAndTime] = useState<[number, number]>([0, 0]);
  const nodeRef = useRef(null);

  // Initialize Game
  useEffect(() => {
    async function initializeGame() {
      if (canvasRef.current && !gameRef.current) {
        await init();
        gameRef.current = new GameWrapper(canvasRef.current);
        handleBricklesWindowClick();
      }
    }

    initializeGame();
  }, [canvasRef, gameRef]);

  // Game loop
  useEffect(() => {
    const animate = () => {
      if (!gameRef.current) return;

      gameRef.current.update(currentControl, gameStatus === 'playing');

      if (!gameRef.current.is_game_over()) {
        requestRef.current = requestAnimationFrame(animate);
      } else {
        if (gameStatus === 'playing') {
          setGameStatus('over');
          const results = gameRef.current.get_results();
          const actions = gameRef.current.get_recorded_actions();
          setRecordedActions(actions);
          setFinalScoreAndTime(results);
        }
      }
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [gameStatus, currentControl, gameRef.current]);

  // keyboard controls
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleKeyDown = (event: any) => {
      switch (event.key) {
        case 'ArrowLeft':
          setCurrentControl('Left');
          break;
        case 'ArrowRight':
          setCurrentControl('Right');
          break;
      }
    };

    const handleKeyUp = () => {
      setCurrentControl('None');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const startGame = async () => {
    setGameStatus('playing');
  };

  async function handlePlayAgain() {
    setFinalScoreAndTime([0, 0]);
    setRecordedActions([]);
    await init();
    gameRef.current = new GameWrapper(canvasRef.current!);
    setGameStatus('not-started');
    setCurrentControl('None');
  }

  async function handleSaveOnChain() {
    setProofStatus('Pending');
    const proofData = await submitProof(recordedActions, finalScoreAndTime[0], finalScoreAndTime[1]);
    if (!proofData || !proofData.public_values || !proofData.proof) {
      console.log('Missing proof data');
      setProofStatus('none');
      return;
    }
    setProofStatus('Created');
    const result = await verifyProof(`0x${proofData.public_values}`, `0x${proofData.proof}`);
    if (result) {
      setProofStatus('Verified');
    } else {
      setProofStatus('none');
      alert('Proof verification failed. Please try again.');
    }
  }

  return (
    <Draggable
      bounds={{ top: -25, left: -30, right: 775, bottom: 465 }}
      nodeRef={nodeRef}
      offsetParent={document.body}
    >
      <section
        className="window"
        id="brickles-window"
        style={{ zIndex }}
      >
        <header>
          <button
            className="close"
            onClick={() => setShowBrickles(false)}
          />
          <h2
            className="title"
            ref={nodeRef}
          >
            {' '}
            <span>Brickles Plus</span>
          </h2>
          <div className="game-info-container">
            {gameStatus === 'not-started' && (
              <div
                className="text"
                id="start-game"
                onClick={startGame}
              >
                CLICK TO BEGIN
              </div>
            )}

            {gameStatus === 'over' && (
              <>
                {proofStatus === 'none' && (
                  <>
                    <div
                      className="text"
                      id="play-again"
                      onClick={handlePlayAgain}
                    >
                      PLAY AGAIN
                    </div>
                    <div
                      className="text"
                      id="or"
                    >
                      OR
                    </div>
                    <div
                      className="text"
                      id="save-on-chain"
                      onClick={handleSaveOnChain}
                    >
                      SAVE ON CHAIN
                    </div>
                  </>
                )}
                {proofStatus === 'Pending' && (
                  <div className="proof-container">
                    <div
                      className="text"
                      id="create-proof"
                    >
                      STEP 1: CREATING PROOF
                    </div>
                    <Spinner />
                  </div>
                )}

                {proofStatus === 'Created' && (
                  <div className="proof-container">
                    <div
                      className="text"
                      id="verify-proof"
                    >
                      STEP 2: VERIFY PROOF
                    </div>
                    <Spinner />
                  </div>
                )}

                {proofStatus === 'Verified' && (
                  <div className="text">
                    ✔️ SAVED ON CHAIN. <span onClick={handlePlayAgain}>PLAY AGAIN?</span>
                  </div>
                )}
              </>
            )}
          </div>
        </header>
        <canvas
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ref={canvasRef as any}
          id="game-canvas"
          className="window-content"
          width="870"
          height="600"
          onClick={handleBricklesWindowClick}
        />
      </section>
    </Draggable>
  );
}
