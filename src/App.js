import { useState, useRef } from 'react';

import './App.css';

import TopBar from './Components/topbar/TopBar';
import TextEditor from './Components/texteditor/TextEditor';

import GraphEditor from './Components/grapheditor/GraphEditor';

import './SplitPane.css';
import Split from 'react-split';
import './palette.css';
import BottomBar from './Components/bottombar/BottomBar';

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
  const nodeRef = useRef(()=>({editText:()=>{}, getNodes:()=>{}, getEdges:()=>{}, setNewNodes:()=>{}, setNewEdges:()=>{}}));
  const textRef = useRef(()=>({editNote:()=>{}}));

  const [sizes, setSize] = useState(['50', '50']) //this is converted into a percent so that the addNote button is positioned properly

  const [nodeCount, setNodeCount] = useState(0);
  const [edgeCount, setEdgeCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  return (
    <div className={['App', style].join(" ")}>
      <TopBar changeStyle={changeStyle} 
              nodeRef={nodeRef}
      />
      <Split className="contentWrapper" 
             minSize={window.innerWidth * 0.3}
             onDrag={setSize}
      >
          <div className='leftContentWrapper'>
            <GraphEditor 
              propNodes={[]} 
              propEdges={[]}
              ref={nodeRef} 
              editTextRef={textRef} 
              subcontentWidth={sizes}
              setNodeCount={setNodeCount}
              setEdgeCount={setEdgeCount}
            />
          </div>
          <div className='rightContentWrapper'>
            <TextEditor 
              value={''} 
              ref={textRef} 
              editNodeRef={nodeRef} 
              setCharCount={setCharCount} 
              setWordCount={setWordCount}
            />
          </div>
      </Split>
      <BottomBar className="bottomBar" nodes={nodeCount} edges={edgeCount} chars={charCount} words={wordCount}/>
    </div>
  );
}

export default App;
