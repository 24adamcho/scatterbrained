import React, { useEffect, useState, useCallback } from 'react';

import './App.css';

import TopBar from './Components/topbar/TopBar';
import TextEditor from './Components/texteditor/TextEditor';

import GraphEditor from './Components/grapheditor/GraphEditor';

import './SplitPane.css';
import Split from 'react-split';
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

  //absolute spaghetti monster, DO NOT TOUCH
  const nodeRef = React.useRef(()=>({editText:()=>{}}));
  const textRef = React.useRef(()=>({editNote:()=>{}}));

  const [sizes, setSize] = useState(['50', '50'])

  return (
    <div className={['App', style].join(" ")}>
      <TopBar changeStyle={changeStyle}/>
      <Split className="contentWrapper" 
             minSize={window.innerWidth * 0.3}
             onDrag={setSize}
      >
          <div className='leftContentWrapper'>
            <GraphEditor propNodes={[]} ref={nodeRef} editTextRef={textRef} subcontentWidth={sizes}/>
          </div>
          <div className='rightContentWrapper'>
            <TextEditor value={''} ref={textRef} editNodeRef={nodeRef}/>
          </div>
      </Split>
    </div>
  );
}

export default App;
