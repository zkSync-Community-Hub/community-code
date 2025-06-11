import { useState } from 'react';
import Read from './components/Read';
import Write from './components/Write';
import ReadContract from './components/ReadContract';
import Paymaster from './components/Paymaster';

const App = () => {
  const [update, setUpdate] = useState(0);

  return (
    <>
      <Read update={update} />
      <Write update={setUpdate} />
      <Paymaster update={setUpdate} />
      <ReadContract update={update} />
    </>
  );
};

export default App;
