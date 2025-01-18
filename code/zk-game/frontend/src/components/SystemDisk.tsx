import { useAccount } from 'wagmi';
import { connectWithSSO, disconnectWallet, getHighScores } from '../utils/wagmi-config';
import { useRef, useState } from 'react';
import HighScores from './HighScores';
import { Score } from '../utils/types';
import Draggable from 'react-draggable';

interface SystemDiskProps {
  highestZIndex: number;
  incrementZIndex: () => void;
}

export default function SystemDisk({ highestZIndex, incrementZIndex }: SystemDiskProps) {
  const [showSystemDisk, setShowSystemDisk] = useState(true);
  const [showHighScores, setShowHighScores] = useState(false);
  const [systemDiskWindowZIndex, setSystemDiskWindowZIndex] = useState(1);
  const [hSWindowZIndex, setHSWindowZIndex] = useState(1);
  const [highScores, setHighScores] = useState<Score[]>([]);
  const [showAccount, setShowAccount] = useState(false);
  const { isConnected, address } = useAccount();
  const nodeRef = useRef(null);

  const handleLogInLogOut = () => {
    if (isConnected) {
      disconnectWallet();
    } else {
      connectWithSSO();
    }
  };

  const handleShowHighScores = async () => {
    const result = await getHighScores();
    setHighScores(result);
    setShowHighScores(true);
    handleHSWindowClick();
  };

  function handleShowSystemDisk() {
    setShowSystemDisk(true);
    setSystemDiskWindowZIndex(highestZIndex);
    incrementZIndex();
  }

  function handleSystemWindowClick() {
    setSystemDiskWindowZIndex(highestZIndex);
    incrementZIndex();
  }

  function handleHSWindowClick() {
    setHSWindowZIndex(highestZIndex);
    incrementZIndex();
  }

  return (
    <>
      <div
        className="item"
        id="system"
        onDoubleClick={handleShowSystemDisk}
      >
        <div className="icon">
          <div className="hardDisk"></div>
        </div>
        <label>System Disk</label>
      </div>
      {showSystemDisk && (
        <Draggable
          bounds={{ top: -25, left: -30, right: 775, bottom: 465 }}
          nodeRef={nodeRef}
          offsetParent={document.body}
        >
          <section
            className="window"
            id="systemDisk"
            style={{ zIndex: systemDiskWindowZIndex }}
          >
            <header>
              <button
                className="close"
                onClick={() => setShowSystemDisk(false)}
              ></button>
              <h2
                className="title"
                ref={nodeRef}
              >
                {' '}
                <span>System Disk</span>
              </h2>
              <ul>
                <li>2 items</li>
                <li>232K in disk</li>
                <li>167K available</li>
              </ul>
            </header>
            <div
              className="content"
              onClick={handleSystemWindowClick}
            >
              <ul className="grid">
                <li>
                  <div
                    onDoubleClick={handleLogInLogOut}
                    className="item"
                    id="log-in-folder"
                  >
                    <div className="icon">
                      <div className="diskCopy">
                        <div className="disk">
                          <div className="label"></div>
                          <div className="shutter"></div>
                        </div>
                        <div className="disk">
                          <div className="label"></div>
                          <div className="shutter"></div>
                        </div>
                      </div>
                    </div>
                    <label>{isConnected === true ? 'Log Out' : 'Log In'}</label>
                  </div>
                </li>

                <li>
                  <div
                    className="item"
                    id="high-scores-folder"
                    onDoubleClick={handleShowHighScores}
                  >
                    <div className="icon">
                      <div className="folder"></div>
                    </div>
                    <label>High Scores</label>
                  </div>
                </li>
                {isConnected && (
                  <li>
                    <div
                      className="item"
                      id="my-account-folder"
                      onDoubleClick={() => setShowAccount(true)}
                    >
                      <div className="icon">
                        <div className="folder"></div>
                      </div>
                      <label>My Account</label>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </section>
        </Draggable>
      )}

      {showAccount && (
        <>
          <section
            className="dialog"
            id="account-info"
          >
            <h2>Account Address:</h2>
            <h4 id="account-info-address">{isConnected && address ? address : 'Not logged in'}</h4>
          </section>
          <div
            className="dialog-background"
            onClick={() => setShowAccount(false)}
          />
        </>
      )}
      {showHighScores && (
        <HighScores
          highScores={highScores}
          isConnected={isConnected}
          address={address}
          setShowHighScores={setShowHighScores}
          zIndex={hSWindowZIndex}
          handleHSWindowClick={handleHSWindowClick}
        />
      )}
    </>
  );
}
