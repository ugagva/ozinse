import EditSvgIcon from "../Icons/EditSvgIcon.tsx";
import TrashSvgIcon from "../Icons/TrashSvgIcon.tsx";
import {FC,} from "react";


type ListsProps = {
    value: {
        Title: string,
        ID: number,
    },
    onDelete: () => void,
    handleEdit?: (genre: { Title: string; ID: number }) => void,

}

const Lists: FC<ListsProps> = ({value, onDelete, handleEdit, }) => {
    return (
        <div>
            <li
                className="relative w-[538px] h-[180px]  left-10 bg-white rounded-xl  transition-all p-2 mr-[48px] m-2">
                <p className="text-xl font-bold ">
                    {value.Title}
                </p>


                <div className=" flex gap-1 absolute bottom-2 right-2">
                    <button
                        onClick={() => handleEdit?.(value)}
                        className=" text-white px-2 py-1 rounded hover:bg-blue-600"
                    >
                        <EditSvgIcon/>
                    </button>
                    <button
                        onClick={onDelete}
                        className=" text-black px-2 py-1 rounded hover:bg-red-600"
                    >
                        <TrashSvgIcon/>
                    </button>
                </div>
            </li>
        </div>
    );
};

export default Lists;