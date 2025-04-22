import {getImageURL} from "./constants/utils.tsx";


type baseButtonProps = {
    className?: string,
    title: string,
    background?: string,
    nameIcon: string,
}

const BaseButton = (props: baseButtonProps) => {
    return (
        <div>
            <button className={props.className}>
                <img src={getImageURL(props.nameIcon)} alt="" className="absolute pl-[10px]"/>
                {props.title}

            </button>
        </div>
    );
};

export default BaseButton;