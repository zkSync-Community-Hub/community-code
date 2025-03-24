import { useRef, useState } from 'react';
import Draggable from 'react-draggable';

export default function Trash() {
  const [showTrash, setShowTrash] = useState(false);
  const nodeRef = useRef(null);

  return (
    <>
      <div
        className="item"
        id="trash"
        onDoubleClick={() => setShowTrash(true)}
      >
        <div className="icon">
          <div className="trash">
            <div className="cover"></div>
            <div className="can"></div>
          </div>
        </div>
        <label>Trash</label>
      </div>
      {showTrash && (
        <Draggable
          bounds={{ top: -25, left: -30, right: 775, bottom: 465 }}
          nodeRef={nodeRef}
          offsetParent={document.body}
        >
          <section
            className="window"
            id="trashDisk"
          >
            <header>
              <button
                className="close"
                onClick={() => setShowTrash(false)}
              ></button>
              <h2
                className="title"
                ref={nodeRef}
              >
                {' '}
                <span>Trash</span>
              </h2>
              <ul className="sortBar">
                <li>Name</li>
              </ul>
            </header>
            <div className="content">
              <ul className="list">
                <li>
                  <label>Empty folder</label>
                </li>
              </ul>
            </div>
          </section>
        </Draggable>
      )}
    </>
  );
}
