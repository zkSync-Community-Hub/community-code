import { useState } from 'react';

export default function Toolbar() {
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <div className="toolbar">
        <nav>
          <ul>
            <li
              onClick={() => setShowAbout(true)}
              className="apple"
            >
              &nbsp;
              <div className="dropDown">
                <ol>
                  <li id="openAbout">
                    <label>About ZK...</label>
                  </li>
                  <li className="sep"></li>
                  <li>
                    <label>Choose Printer</label>
                  </li>
                  <li>
                    <label>Scrapbook</label>
                  </li>
                  <li>
                    <label>Alarm Clock</label>
                  </li>
                  <li>
                    <label>Key Caps</label>
                  </li>
                  <li>
                    <label>Control Panel</label>
                  </li>
                </ol>
              </div>
            </li>
            <li>
              <label>File</label>
              <div className="dropDown">
                <ol>
                  <li className="disable">
                    <label>New Folder</label>
                    <em>N</em>
                  </li>
                  <li>
                    <label>Open</label>
                  </li>
                  <li className="disable">
                    <label>Print</label>
                  </li>
                  <li className="disable">
                    <label>Close</label>
                  </li>
                  <li className="sep"></li>
                  <li>
                    <label>Get Info</label>
                    <em>I</em>
                  </li>
                  <li className="disable">
                    <label>Duplicate</label>
                    <em>D</em>
                  </li>
                  <li className="sep"></li>
                  <li className="disable">
                    <label>Page Setup</label>
                  </li>
                  <li className="disable">
                    <label>Print Catalog</label>
                  </li>
                  <li className="sep"></li>
                  <li>
                    <label>Eject</label>
                    <em>E</em>
                  </li>
                </ol>
              </div>
            </li>
            <li>
              <label>Edit</label>
              <div className="dropDown">
                <ol>
                  <li className="disable">
                    <label>Undo</label>
                    <em>Z</em>
                  </li>
                  <li className="sep"></li>
                  <li className="disable">
                    <label>Cut</label>
                    <em>X</em>
                  </li>
                  <li className="disable">
                    <label>Copy</label>
                    <em>C</em>
                  </li>
                  <li className="disable">
                    <label>Paste</label>
                    <em>V</em>
                  </li>
                  <li className="disable">
                    <label>Clear</label>
                  </li>
                  <li>
                    <label>Select All</label>
                    <em>A</em>
                  </li>
                  <li className="sep"></li>
                  <li>
                    <label>Show Clipboard</label>
                  </li>
                </ol>
              </div>
            </li>
            <li>
              <label>View</label>
              <div className="dropDown">
                <ol>
                  <li className="disable selected">
                    <label>by Icon</label>
                  </li>
                  <li className="disable">
                    <label>by Name</label>
                  </li>
                  <li className="disable">
                    <label>by Date</label>
                  </li>
                  <li className="disable">
                    <label>by Size</label>
                  </li>
                  <li className="disable">
                    <label>by Kind</label>
                  </li>
                </ol>
              </div>
            </li>
            <li>
              <label>Special</label>
              <div className="dropDown">
                <ol>
                  <li>
                    <label>Clean Up</label>
                  </li>
                  <li className="disable">
                    <label>Empty Trash</label>
                  </li>
                  <li>
                    <label>Erase Disk</label>
                  </li>
                  <li className="disable">
                    <label>Set Startup</label>
                  </li>
                  <li className="disable">
                    <label>Use MiniFinder...</label>
                  </li>
                  <li className="sep"></li>
                  <li>
                    <label>Shut Down</label>
                  </li>
                </ol>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {showAbout && (
        <section
          onClick={() => setShowAbout(false)}
          className="dialog"
          id="finder"
        >
          <h2>ZK is the endgame</h2>
          <h4>🫶 ZKsync</h4>
        </section>
      )}
    </>
  );
}
