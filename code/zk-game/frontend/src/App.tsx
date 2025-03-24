import { WagmiProvider } from 'wagmi';
import Toolbar from './components/Toolbar';
import { config } from './utils/wagmi-config';
import Games from './components/Games';
import SystemDisk from './components/SystemDisk';
import Trash from './components/Trash';
import { useState } from 'react';

function App() {
  const [highestZIndex, setHighestZIndex] = useState(1);

  function incrementZIndex() {
    setHighestZIndex((prev) => prev + 1);
  }

  return (
    <WagmiProvider config={config}>
      <div className="screen">
        <Toolbar />
        <SystemDisk
          highestZIndex={highestZIndex}
          incrementZIndex={incrementZIndex}
        />
        <Games
          highestZIndex={highestZIndex}
          incrementZIndex={incrementZIndex}
        />
        <Trash />
      </div>
    </WagmiProvider>
  );
}

export default App;
