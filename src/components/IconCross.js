import * as React from "react";

function SvgIconCross(props) {
  return (
    <svg
      width={12}
      height={12}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.785.471L11.314 0 5.893 5.421.47 0 0 .471l5.421 5.422L0 11.313l.471.472 5.422-5.421 5.42 5.421.472-.471-5.421-5.421L11.785.47z"
        fill="#494C6B"
      />
    </svg>
  );
}

export default SvgIconCross;
