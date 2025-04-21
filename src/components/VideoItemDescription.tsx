import {BaseIcon} from "./BaseIcon.tsx";
import {getIcons} from "./icons.tsx";



const VideoItemDescription = () => {



    return (
        <div className="flex justify-between  mt-2 mb-1 ">
            <div className="mt-1 flex items-center">
                <BaseIcon nameIcon= {getIcons().eye} className="w-5" />
            </div>
                <button className="flex flex-row m-4 gap-4 p-1 ">
                <BaseIcon nameIcon= {getIcons().delete} className="w-5"/>
                <BaseIcon nameIcon={getIcons().edit}  className="w-5"/>
                </button>

        </div>
    );
};

export default VideoItemDescription;