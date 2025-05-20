import * as React from "react";

type Props = {
    className?: string;
}

const SearchSvgIcon: React.FC<React.SVGProps<SVGElement>> = (props:Props) => (
    <div className={props.className}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
    >
        <path
            fill="#8F92A1"
            fillRule="evenodd"
            d="M17.395 15.976a8.044 8.044 0 0 0-12.04-10.62 8.043 8.043 0 0 0 10.621 12.04l.043.044 4.265 4.265a1.005 1.005 0 1 0 1.422-1.421l-4.266-4.265zm-2.152-9.219a6 6 0 1 1-8.486 8.486 6 6 0 0 1 8.486-8.486"
            clipRule="evenodd"
        ></path>
    </svg>
    </div>
);

export default SearchSvgIcon;
