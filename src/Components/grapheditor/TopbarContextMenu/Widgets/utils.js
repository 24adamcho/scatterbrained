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

export const allDataSimilar = (data, selectedData, propertyTest) => {
    if(data.length <= 0) return false;
    if(selectedData.length <= 0) return false;
    if(selectedData.length === 1) return true;

    const e = getById(data, selectedData[0].id)[0];
    if(e === undefined) return false;

    const target = e[propertyTest];

    //complete gobbeldeygook
    //basically,
      //get current states of only relevant edges        //if even a single one doesn't match   //return false
    if(data.filter(e=>selectedData.some(se=>e.id===se.id)).some(e=>e[propertyTest] !== target)) return false;
    else return true;
}

export const allStylePropertiesSimilar = (data, selectedData, propertyTest) => {
    if(data.length <= 0) return false;
    if(selectedData.length <= 0) return false;
    if(selectedData.length === 1) return true;

    if(data.filter(e=>selectedData.some(se=>e.id===se.id)).some(e=>e.style === undefined)) return false;

    const target = selectedData[0].style[propertyTest];

    if(data.filter(e=>selectedData.some(se=>e.id===se.id)).some(e=>e.style[propertyTest] !== target)) return false;
    else return true;
}

export const hasAtLeastOne = (data, selectedData, property, propertyTargetValue) => {
    if(data.length <= 0) return false;
    if(selectedData.length <= 0) return false;

    //same as all data similar, but
                                                                //if at least one matches
    if(data.filter(e=>selectedData.some(se=>e.id===se.id)).some(e=>e[property] === propertyTargetValue)) return true;
    else return false;
}

export const findById = (data, selectedDataId) => {
    if(data.length <= 0) return undefined;

    const e = (data.map(d=>{ if(d.id === selectedDataId) return d}))
    
    if(e === undefined) return undefined;
    if(e.length === 0) return undefined;
    return e.filter(t=>t !== undefined);
}