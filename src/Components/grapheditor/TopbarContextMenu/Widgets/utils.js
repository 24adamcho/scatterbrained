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
export const transform = (setList, selection, transformCallback) => {
    let c = 0;
    setList((eds)=>{
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

export const getById = (list, selectorId) => {
    return list.filter((item)=>{
        if(item.id == selectorId)
            return item;
    })
}

export const allEdgesSameType = (edges, selectedEdges) => {
    if(edges.length <= 0) return false;
    if(selectedEdges.length <= 0) return false;
    if(selectedEdges.length === 1) return true;

    const target = selectedEdges[0].type;

    //complete gobbeldeygook
    //basically,
      //get current states of only relevant edges        //if even a single one doesn't match   //return false
    if(edges.filter(e=>selectedEdges.some(se=>e.id===se.id)).some(e=>e.type !== target)) return false;
    else return true;
}