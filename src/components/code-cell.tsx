import { useState, useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';
import ResizableBox from './test';

const CodeCell = () => {
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setErr(output.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    }
  }, [input]);

  return (
    
      <div id='horizontal-div' style={{ display: 'flex', flexDirection: 'row' }}>
        <ResizableBox direction='horizontal'>
          <CodeEditor 
            initialValue='const a = 1;'
            onChange={(value) => setInput(value)}/>
        </ResizableBox>
        <Preview code={code} err={err} />
      </div>
    

  );
};

export default CodeCell;