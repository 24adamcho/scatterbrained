
//these functions sanitize nodes and edges for and from compact storage
export function sanitizeEdgesFromStorage(data, props) {
  return data.map((edge) => {
    edge.interactionWidth = (props.tool === 'pointer') ? 10 : 1;
    return edge;
  });
}
export function sanitizeNodesFromStorage(data, props) {
  return data.map((node) => {
    node.selected = false;
    if (node.data === undefined) node.data = {};
    node.data.tool = props.tool;
    if (node.data.content === undefined) node.data.content = '';
    if (node.position === undefined) node.position = { x: 0, y: 0 };

    return node;
  });
}
export function sanitizeNodesForStorage(props) {
  return props.map((node) => {
    const {
      selected: _, dragging: __, positionAbsolute, ___, data: ____, ...newNode
    } = node;
    const {
      tool: _____, ...newNodeData
    } = node.data;
    if (newNodeData.content !== ""
      && newNodeData.content !== "<p><br></p>")
      newNode.data = newNodeData;
    return newNode;
  });
}
export function sanitizeEdgesForStorage(props) {
  return props.map((edge) => {
    const {
      selected: _, interactionWidth: __, ...newEdge
    } = edge;

    if (newEdge.animated === undefined) delete newEdge.animated;
    if (newEdge.svgWrapperStyle === undefined) delete newEdge.svgWrapperStyle;

    if (edge.style !== undefined) {
      const {
        ...newEdgeStyle
      } = edge.style;
      newEdge.style = newEdgeStyle;
    }

    return newEdge;
  });
}
