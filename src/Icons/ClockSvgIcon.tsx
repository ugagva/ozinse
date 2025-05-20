import * as React from "react";

type Props = {
    className?: string;
}

const ClockSvgIcon: React.FC<React.SVGProps<SVGElement>> = (props:Props) => (
   <div className={props.className}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 20 20"
    >
        <path
            fill="#8F92A1"
            fillRule="evenodd"
            d="M10 20c5.523 0 10-4.477 10-10S15.523 0 10 0 0 4.477 0 10s4.477 10 10 10m0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16m1-9V5H9v6h5V9z"
            clipRule="evenodd"
        ></path>
    </svg>
   </div>
);

export default ClockSvgIcon;
