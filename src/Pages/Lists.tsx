import EditSvgIcon from "../Icons/EditSvgIcon.tsx";
import TrashSvgIcon from "../Icons/TrashSvgIcon.tsx";
import {FC,} from "react";


type Users = {
    ID: number,
    Name: string,
    Email: string,
    CreatedAt: string;
    UpdatedAt: string;
}

type Genre = {
    ID: number,
    Title: string,
}

type AgeCategory = {
    ID: number;
    Title: string;
}


type ListsItemsProps =

 |  {
        type: "ageCategory";
        data: AgeCategory;
        onDelete: () => void,
        handleEdit?: (data:AgeCategory) => void,
    }

|{
    type: "genre";
    data: Genre;
    onDelete: () => void,
    handleEdit ? : (data:Genre) => void,
}

|{
    type: "user";
    data: Users;
    onDelete: () => void,
    handleEdit ? : (data:Users) => void;
}


const Lists: FC<ListsItemsProps> = (props: ListsItemsProps) => {

    const renderEditButton=()=>{
        if (!props.handleEdit) return null;
        switch (props.type) {
            case "user":
                return (
                    <button className=" text-white px-2 py-1 rounded hover:bg-blue-600"
                            onClick={()=>props.handleEdit?.(props.data)}>
                        <EditSvgIcon/>
                    </button>

                );
            case "ageCategory":
                return (
                    <button className=" text-white px-2 py-1 rounded hover:bg-blue-600"
                        onClick={() => props.handleEdit?.(props.data)}>
                        <EditSvgIcon/>
                    </button>
                );
            case "genre":
                return (
                    <button className=" text-white px-2 py-1 rounded hover:bg-blue-600"
                        onClick={() => props.handleEdit?.(props.data)}>
                        <EditSvgIcon/>
                    </button>
                );
        }


    }


    return (
        <div>
            <li
                className="relative w-[538px] h-[180px]  left-10 bg-white rounded-xl  transition-all p-2 mr-[48px] m-2">
                {props.type === "user" && (
                    <>

                            <div >{"Name:"}<b>{props.data.Name}</b> </div>
                            <div >{"Email:"}<b>{props.data.Email}</b></div>
                            <div >Created:<b>{props.data.CreatedAt}</b> </div>
                            <div >Updated:<b>{props.data.UpdatedAt}</b></div>
                           <div >Phone:<b>{props.data.UpdatedAt}</b> </div>
                        <div >Date of Birth:<b>{props.data.UpdatedAt}</b> </div>


                    </>


                )}


                {(props.type === "genre" || props.type === "ageCategory") && (
                    <p className="text-xl font-bold">
                        {props.data.Title}
                    </p>
                )}


                <div className=" flex gap-1 absolute bottom-2 right-2">
                    {renderEditButton()}
                    {/*<button*/}
                    {/*    onClick={() => props.handleEdit?.(props.data)}*/}
                    {/*    className=" text-white px-2 py-1 rounded hover:bg-blue-600"*/}
                    {/*>*/}
                    {/*   */}
                    {/*</button>*/}
                    <button
                        onClick={props.onDelete}
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