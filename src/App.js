import { useState } from 'react';

import './App.css';

import TopBar from './Components/topbar/TopBar';
import TextEditor from './Components/texteditor/TextEditor';

import GraphEditor from './Components/grapheditor/GraphEditor';

import './SplitPane.css';
import SplitPane from 'react-split-pane';
import './palette.css';

function App() {

  //block to change between night and light modes, function used by
  //>app>topbar>View>night-mode
  const [style, setStyle] = useState('palette-light');
  const changeStyle = () => {
    console.log("clicked");
    if(style == 'palette-dark')
      setStyle('palette-light');
    else
      setStyle('palette-dark');
  }

  return (
    <div className={['App', style].join(" ")}>
      <TopBar changeStyle={changeStyle}/>
      <div className="contentWrapper">
        <SplitPane primary='second' split="vertical" defaultSize={400} maxSize={-200} minSize={200}>
          <div className='leftContentWrapper'>
            <GraphEditor />
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
