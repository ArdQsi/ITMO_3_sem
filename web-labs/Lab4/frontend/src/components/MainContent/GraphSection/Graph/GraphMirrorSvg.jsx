import React from 'react';

const GraphMirrorSvg = (props) => {
  return (
    <svg width="220" height="220" xmlns="http://www.w3.org/2000/svg">
      {/* X-Axis */}
      <line x1="10" y1="110" x2="210" y2="110" stroke="black" />
      <polygon points="210,110 200,105 200,115" />

      {/* Y-Axis */}
      <line x1="110" y1="10" x2="110" y2="210" stroke="black" />
      <polygon points="110,10 105,20 115,20" />

      {/* X-Axis coordinates */}
      <line x1="43" y1="105" x2="43" y2="115" stroke="black" />
      <text x={43 - (-props.rValue[0]).toString().length * 3} y="100" fontSize="14">{-props.rValue[0]}</text>


      <line x1="76" y1="105" x2="76" y2="115" stroke="black" />
      <text x={76 - (-props.rValue[0] / 2).toString().length * 3} y="100" fontSize="14">{-props.rValue[0] / 2}</text>

      <line x1="143" y1="105" x2="143" y2="115" stroke="black" />
      <text x={143 - (props.rValue[0] / 2).toString().length * 3} y="100" fontSize="14">{props.rValue[0] / 2}</text>

      <line x1="176" y1="105" x2="176" y2="115" stroke="black" />
      <text x={176 - (props.rValue[0] / 1).toString().length * 3} y="100" fontSize="14">{props.rValue[0]}</text>

      {/* Y-Axis coordinates */}
      <line x1="105" y1="176" x2="115" y2="176" stroke="black" />
      <text x="120" y="181" fontSize="14">{-props.rValue[0]}</text>

      <line x1="105" y1="143" x2="115" y2="143" stroke="black" />
      <text x="120" y="148" fontSize="14">{-props.rValue[0] / 2}</text>

      <line x1="105" y1="76" x2="115" y2="76" stroke="black" />
      <text x="120" y="81" fontSize="14">{props.rValue[0] / 2}</text>

      <line x1="105" y1="43" x2="115" y2="43" stroke="black" />
      <text x="120" y="48" fontSize="14">{props.rValue[0]}</text>

      {/* Triangle */}
      <polygon points="110,110 110,176 176,110"
               fill="blue" fillOpacity="0.25" stroke="darkblue" strokeOpacity="0.5" />

      {/* Rectangle */}
      <polygon points="143,110 143,43 110,43 110,110"
               fill="green" fillOpacity="0.25" stroke="darkgreen" strokeOpacity="0.5" />

      {/* Circle */}
      <path d="M 76 110 A 33 33 0 0 1 110 76 L 110 110 Z"
            fill="yellow" fillOpacity="0.25" stroke="#CCCC00" strokeOpacity="0.5" />
    </svg>
  );
}

export default GraphMirrorSvg;
