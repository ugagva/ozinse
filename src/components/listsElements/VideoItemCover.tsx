

interface VideoItemCoverProps {
    images?: string,
    title?: string
}


const VideoItemCover = ({images, title}: VideoItemCoverProps,) => {
    return (
        <div className="">
            <h2 className="absolute w-[65px] h-[28px] text-center m-2 bg-black font-[Roboto]-500 text-sm  text-white rounded-lg shadow-lg ">
                {(title)}
            </h2>
            <img src={(images)} className="rounded-[12px] w-[228px] h-[334px]" alt=""/>

        </div>
    )
};

export default VideoItemCover;