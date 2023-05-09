import 'bulmaswatch/darkly/bulmaswatch.min.css';
import './index.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import CodeCell from './components/code-cell';
import TextEditor from './components/text-editor';
import ResizableBox from './components/code-cell';

const App = () => {
  return (
    /*
    <Provider store={store}>
      <div>
        <TextEditor />
      </div>
    </Provider>
    */
    <div>
      <TextEditor />
      <CodeCell />
    
    </div>
    
    
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));