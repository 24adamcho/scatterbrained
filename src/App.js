import './App.css';

import TopBar from './Components/topbar/TopBar';
import TextEditor from './Components/texteditor/TextEditor';

import './SplitPane.css';
import SplitPane from 'react-split-pane';

function App() {
  return (
    <div className="App">
      <TopBar />
      <div className="contentWrapper">
        <SplitPane split="vertical" defaultSize={400} maxSize={-200} minSize={200}>
          <div className='leftContentWrapper'>

          </div>
          <div className='rightContentWrapper'>
            <TextEditor />
          </div>
        </SplitPane>
      </div>
    </div>
  );
}

export default App;
