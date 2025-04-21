



type propsType={
    coverUrl: string,
    age: string,
}

const VideoItemCover = (props:propsType) => {
    return (
        <div>
            <h2 className="absolute w-[65px] h-[28px] text-center m-2 bg-black font-[Roboto]-500 text-sm  text-white rounded-lg shadow-lg ">
                {props.age}</h2>
            <img src={props.coverUrl} className="rounded-[12px] w-[228px] h-[334px]" alt=""/>

        </div>
    );
};

export default VideoItemCover;