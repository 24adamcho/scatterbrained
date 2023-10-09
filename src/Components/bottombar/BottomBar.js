import "./BottomBar.css"

export default ({nodes, edges, chars, words}) => {
    return (
        <>
            <div className="bottomBar">
                <div className="leftContent">
                    <span className="nodeCount">Nodes: {nodes}</span>
                    <span className="edgeCount">Edges: {edges}</span>
                </div>
                <div className="rightContent"> 
                    <span className="charCount">Chars: {chars}</span>
                    <span className="wordCount">Words: {words}</span>
                </div>
            </div>
        </>
    )
}