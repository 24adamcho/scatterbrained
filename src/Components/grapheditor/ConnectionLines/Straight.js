export default ({
  fromX,
  fromY,
  fromPosition,
  toX,
  toY,
  toPosition,
  connectionLineType,
  connectionLineStyle
}) => {
  return (
    <g>
      <path
        fill="none"
        style={connectionLineStyle}
        className={(connectionLineStyle.animated)?"animated":''}
        d={`M${fromX},${fromY} C ${fromX} ${toY} ${fromX} ${toY} ${toX},${toY}`}
      />
    </g>
  );
};
