import React from "react";

const Product: React.FunctionComponent<{ className: string , fill: string }> = (props) => (
  <svg
    className={props.className}
    width="24"
    height="28"
    viewBox="0 0 24 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.5609 3.97266L18.5742 3.96602H18.5809L12 0.1875L5.42246 3.96602H5.41582L5.43906 3.97598L0.0302734 7.09375V20.9062L12 27.8125L23.9697 20.9062V7.09375L18.5609 3.97266ZM11.0271 25.0102L6.27578 22.2676V17.6324L1.97266 15.1887V9.38144L11.0271 14.6043V25.0102ZM2.90898 7.6748L7.38144 5.0916L11.9934 7.73789L16.6119 5.08496L21.101 7.6748L12.0066 12.9209L2.90898 7.6748ZM22.0273 15.2053L17.7508 17.6324V22.251L12.9729 25.0068V14.6109L22.0273 9.38809V15.2053Z"
      fill={props.fill}
    />
  </svg>
);

export default Product;
