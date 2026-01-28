import * as React from "react";

type PropsType = {
    className?: string;
}
const CameraSvgIcon: React.FC<React.SVGProps<SVGElement>> =(props:PropsType) => (
    <svg

        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        version="1"
        viewBox="0 0 16 16"
        fill="currentColor"
        {...props}
    >
        <path d="M1.4 5.4c-.3.8-.4 2.5-.2
        3.8.3 2 .9 2.3 5.1 2.6 2.6.2 4.7-.1 4.7-.7
        0-.5.9-.7 2-.4 1.7.5 2 0 2-2.7s-.3-3.2-2-2.7c-1.1.3-2 .1-2-.4 0-1.6-9-1.1-9.6
        .5m8.4 2.8c.3 2.6.1 2.8-3.2 2.8S3 10.8 3 7.9c0-2.8.2-3 3.3-2.7 2.7.2 3.3.8 3.5 3M13 8c0 .5-.4 1-1 1-.5 0-1-.5-1-1 0-.6.5-1 1-1 .6 0 1 .4 1 1"></path>
    </svg>
);

export default CameraSvgIcon;
