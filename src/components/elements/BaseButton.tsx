import {JSX, SyntheticEvent} from "react";


type buttonProps = {
    className?: string,
    title?: string,
    icon?: JSX.Element,
    onClick?: (e:SyntheticEvent) => Promise<void>,
    type?: "submit|reset|button|undefined"
}


const BaseButton = (props: buttonProps) => {
    return (

        <button className={props.className}  onClick={props.onClick}>
            <div>{props.icon}</div>
            <div>{props.title}</div>

        </button>

    );
};

export default BaseButton;