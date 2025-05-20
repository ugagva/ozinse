import * as React from "react";

type propsType={
    className?: string,
}
const PointSvgIcon: React.FC<React.SVGProps<SVGElement>> = (props:propsType) => (
    <div className={props.className}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="4"
            fill="none"
            viewBox="0 0 4 4"
        >
            <circle cx="2" cy="2" r="2" fill="#9CA3AF"></circle>
        </svg>
    </div>
);

export default PointSvgIcon;
