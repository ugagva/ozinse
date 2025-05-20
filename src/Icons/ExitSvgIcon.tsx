import * as React from "react";


type Props = {
    className?: string;
}

const ExitSvgIcon: React.FC<React.SVGProps<SVGElement>> = (props:Props) => (
    <div className={props.className}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="none"
            viewBox="0 0 32 32"
        >
            <rect
                width="32"
                height="32"
                fill="#DE350B"
                fillOpacity="0.05"
                rx="8"
            ></rect>
            <path
                fill="#FF494D"
                fillRule="evenodd"
                d="M8.515 24h4v-2h-4V10h4V8h-4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2m11.808-2.549L18.799 23 12 15.97 18.857 9l1.51 1.562-4.27 4.342h9.83c.593 0 1.073.492 1.073 1.1 0 .607-.48 1.1-1.073 1.1h-9.81z"
                clipRule="evenodd"
            ></path>
        </svg>

    </div>
);

export default ExitSvgIcon;
