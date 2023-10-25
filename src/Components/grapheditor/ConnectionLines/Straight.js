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
        style={connectionLineStyle}
        className={(connectionLineStyle.animated)?"animated":''}
        d={`M${fromX},${fromY} ${toX},${toY}`}
      />
    </g>
  );
};
