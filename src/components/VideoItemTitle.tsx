import {BaseIcon} from "./BaseIcon.tsx";
import {getIcons} from "./icons.tsx";

type titlePropsType={
    title: string,
    description1: string,
    description2: string
}



const VideoItemTitle = (props:titlePropsType) => {
    return (
        <div className="w-[200px] h-[42px] ">
            <h3 className="mt-4 mb-1 text-xl font-[Roboto] tracking-wide capitalize">
                {props.title}
            </h3>
            <div className="flex mt-1 mb-1 gap-4">
                <p className="text-sm text-[#9CA3AF] font-[Roboto] line-clamp-2">
                    {props.description1}
                </p>
                <BaseIcon className="mt-2 h-[4px] w-[4px] " nameIcon={getIcons().point}/>

                <p className="text-sm text-[#9CA3AF] font-[Roboto] line-clamp-2">
                    {props.description2}
                </p>
            </div>
        </div>
    );
};

export default VideoItemTitle;