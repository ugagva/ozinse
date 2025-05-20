

import PointSvgIcon from "../../Icons/PointSvgIcon.tsx";



type titlePropsType= {
    title: string,
}



const VideoItemTitle = (props:titlePropsType) => {
    return (
        <div className="w-[200px] h-[42px] items-center ">
            <h3 className="mt-4 mb-1 text-xl font-[Roboto] tracking-wide capitalize">
                {props.title}
            </h3>
            <div className="flex mt-1 mb-1 gap-4">
                <p className="text-sm text-[#9CA3AF] font-[Roboto] line-clamp-2">

                </p>
                <PointSvgIcon className="w-[4px]-h-[4px]"></PointSvgIcon>

                <p className="text-sm text-[#9CA3AF] font-[Roboto] line-clamp-2">

                </p>
            </div>
        </div>
    );
};

export default VideoItemTitle;