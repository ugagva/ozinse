import TrashSvgIcon from "../../Icons/TrashSvgIcon.tsx";
import EditSvgIcon from "../../Icons/EditSvgIcon.tsx";







const VideoItemDescription = () => {


    return (
        <div className="flex justify-between  mt-2 mb-1 ">
            <div className="mt-1 flex items-center">
                <p></p>
                <p></p>

                <EditSvgIcon></EditSvgIcon>


            </div>

            <button className="flex flex-row m-4 gap-4 p-1 ">

                <TrashSvgIcon></TrashSvgIcon>
                <EditSvgIcon></EditSvgIcon>

            </button>

        </div>
    );
};

export default VideoItemDescription;