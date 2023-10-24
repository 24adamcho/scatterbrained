export const translateEdgeStyleName = (param) => {
    switch(param) {
        case 'default':
            return 'Bezier';
        case 'step':
            return 'Stepped';
        case 'smoothstep':
            return 'Smooth Stepped';
        case 'straight':
            return 'Straight';
        default:
            return '???';
    }
}

/*
    transformEdges
    uses a passed setEdges function to change selected edges (depending on the results of targetCallback), and then applies transformCallback
    
    PARAMS:
    setEdges - setEdges function from useEdgesState
    selection - list of nodes to be targeted
    transformCallback(edge) - transform to apply to edge, returns the new edge to replace the previous one

    it's a really really gross n^2 algorithm but i don't know how else to do it. it's not like it's sorting or anything, and the map function is probably the fast i can get.
*/
export const transformEdges = (setEdges, selection, transformCallback) => {
    let c = 0;
    setEdges((eds)=>{
        return eds.map((edge)=>{
            selection.forEach((selectedEdge)=>{
                c++;
                if(selectedEdge.id === edge.id) {
                    edge = transformCallback(edge)
                    return edge;
                }
            })
            return edge;
        })
    })
    // console.log(`Transformation completed in ${c} steps.`)
}

export const transformNodes = (setNodes, selection, transformCallback) => {
    setNodes((nds)=>{
        return nds.map((node)=>{
            selection.forEach((selectedNode)=>{
                if(selectedNode.id === node.id) {
                    node=transformCallback(node)
                    return node;
                }
            })
            return node;
        })
    })
}