import * as React from "react";

function SvgIconMoon(props) {
  return (
    <svg
      width={20}
      height={20}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.824.166a8.077 8.077 0 107.492 13.475A10.004 10.004 0 0110 20C4.477 20 0 15.523 0 10S4.477 0 10 0c.623 0 1.233.057 1.824.166z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgIconMoon;
