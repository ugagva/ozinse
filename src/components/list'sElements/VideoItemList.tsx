

import VideoItemDescription from "./VideoItemDescription.tsx";
import VideoItemCover from "./VideoItemCover.tsx";
import VideoItemTitle from "./VideoItemTitle.tsx";


type playListPropsType={
    title: string,
    description1: string,
    description2: string,
    coverUrl: string,
    classes:string,
    age: string,
}


const VideoItemList = (props:playListPropsType) => {
    return (
        <a href="/images/Group 1.png" className={ ` relative p-4 pl-[24px] rounded-xl duration-200  |{props.classes}`}>


        <div className=" hover:bg-[#0001] bg-white w-[240px] h-[460px] p-[12px] gap-[16px] rounded-lg">
            <VideoItemCover coverUrl={props.coverUrl} age={props.age}  />
            <VideoItemTitle title={props.title} description1={props.description1} description2={props.description2} />
            <VideoItemDescription />


        </div>
        </a>
    );
};

export default VideoItemList;