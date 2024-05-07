import React, { useState } from 'react';
import DcaSimulator from './components/DcaSimulator';
import { callServiceHandler } from './utils';

function App() {
  return (
    <div className="App">
        <DcaSimulator 
          callServiceHandler={callServiceHandler}
        />
    </div>
  );
}

export default App;
