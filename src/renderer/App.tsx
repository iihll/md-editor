import React, { useState, useCallback } from 'react';
import Editor from './Editor';
import Preview from './Preview';

const App: React.FC = () => {
  const [doc, setDoc] = useState<string>('# hello world!');
  const handleDocChange = useCallback((newDoc) => {
    setDoc(newDoc);
  }, []);

  return (
    <div className="app">
      <Editor initialDoc={doc} onChange={handleDocChange} />
      <Preview doc={doc} />
    </div>
  );
};

export default App;
