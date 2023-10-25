import Straight from "./Straight";

export default ({
  fromX,
  fromY,
  fromPosition,
  toX,
  toY,
  toPosition,
  connectionLineType,
  connectionLineStyle,
}) => {
  switch(connectionLineType) {
    case 'straight': return Straight({
      fromX,
      fromY,
      fromPosition,
      toX,
      toY,
      toPosition,
      connectionLineType,
      connectionLineStyle,
  })
    default: return Straight({
      fromX,
      fromY,
      fromPosition,
      toX,
      toY,
      toPosition,
      connectionLineType,
      connectionLineStyle,
  })
  }
};
