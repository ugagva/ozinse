import * as React from "react";

type PropsType = {
    className?: string;
}

const TrashSvgIcon: React.FC<React.SVGProps<SVGElement>> = (props:PropsType) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
        {...props}
    >
        <path
            fill="currentColor"
            fillOpacity="0.9"
            fillRule="evenodd"
            d="M11.333 3.334v-.667c0-.737-.597-1.333-1.333-1.333H6c-.736 0-1.333.596-1.333 1.333v.667h-2a.667.667 0 0 0 0 1.333h.666V12a2 2 0 0 0 2 2h5.334a2 2 0 0 0 2-2V4.667h.666a.667.667 0 1 0 0-1.333zM10 2.667H6v.667h4zm1.333 2H4.667V12c0 .368.298.667.666.667h5.334a.667.667 0 0 0 .666-.667zM6 6h1.333v5.334H6zm4 0H8.667v5.334H10z"
            clipRule="evenodd"
        ></path>
    </svg>
);

export default TrashSvgIcon;
