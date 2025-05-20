import React, {JSX} from "react";


export function getImageURL(name:string) {
    return new URL(`/${name}`,import.meta.url).toString();
}

{/*<img src={getImageURL(props.nameIcon)} alt="" className="absolute"/>*/}



type Props = {
    children: React.ReactNode;
    className?: string;
    title?: string;
    icon?: JSX.Element;
};


const BaseButton:React.FC<Props> = ({children}:Props) => {
    return (
        <div>
            <button>
                {children}
            </button>
        </div>
    );
};

export default BaseButton;