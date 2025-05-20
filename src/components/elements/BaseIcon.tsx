import {getImageURL} from "../constants/utils.tsx";


type propsType = {
    nameIcon: string
    className?: string

}


export const BaseIcon = (props: propsType) => {

    return (
        <div>
            <img src={getImageURL(props.nameIcon)} alt={props.nameIcon} className={props.className}/>


        </div>

    )

}
