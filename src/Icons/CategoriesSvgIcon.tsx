import * as React from "react";

const CategoriesSvgIcon: React.FC<React.SVGProps<SVGElement>> = ({className}) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        viewBox="0 0 24 24"
    >
        <path

            fillRule="evenodd"
            d="M7 5h10a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1M4 6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3zm12 1H8v2h8zm-8 4h8v2H8zm5 4H8v2h5z"
            clipRule="evenodd"
        ></path>
    </svg>
);

export default CategoriesSvgIcon;
