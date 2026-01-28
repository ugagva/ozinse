import EditSvgIcon from "../Icons/EditSvgIcon.tsx";
import TrashSvgIcon from "../Icons/TrashSvgIcon.tsx";
import {FC,} from "react";

import CameraSvgIcon from "../Icons/CameraSvgIcon.tsx";


type User = {
    ID: number,
    Name: string,
    Email: string,
    CreatedAt: string;
    UpdatedAt: string;
    Phone: string;
    DateOfBirth:string;
}

type Genre = {
    ID: number,
    Title: string,
}

type AgeCategory = {
    ID: number;
    Title: string;
}
type Type ={
    ID: number;
    Title: string;
}

type ListsItemsProps =
    |{
    type: "type";
    data: Type;
    onDelete: () => void,
    handleEdit?: (data:Type) => void,
}

    | {
    type: "ageCategory";
    data: AgeCategory;
    onDelete: () => void,
    handleEdit?: (data:AgeCategory) => void,
}

    | {
    type: "genre";
    data: Genre;
    onDelete: () => void,
    handleEdit?: (data: Genre) => void,
}

    | {
    type: "user";
    data: User;
    onDelete: () => void,
    handleEdit?: (data: User) => void;
}



const Lists: FC<ListsItemsProps> = (props: ListsItemsProps) => {





    // Кнопки редактирования
    const renderEditButton = () => {
        if (!props.handleEdit ) return null;

        switch (props.type) {
            case "user" :
                return (
                    <button className=" text-blue px-2 py-1  rounded hover:text-blue-600"
                            onClick={() => props.handleEdit?.(props.data)}>
                        <EditSvgIcon/>
                    </button>

                );
            case "ageCategory":
            case "genre":
                return (
                    <button className=" text-blue px-2 py-1  rounded hover:text-blue-600"
                            onClick={() => props.handleEdit?.(props.data)}>
                        <EditSvgIcon/>
                    </button>
                );

            case "type":
                return (
                    <button className=" text-blue px-2 py-1  rounded hover:text-blue-600"
                            onClick={() => props.handleEdit?.(props.data)}>
                        <EditSvgIcon/>
                    </button>
                );
        };


    }



           // Данные пользователя
    const renderUserFields = () => {
        if (props.type !== "user") return null;
        const usersFields = [
            {label: "Name", value: props.data.Name},
            {label: "Email", value: props.data.Email},
            {label: "Created", value: props.data.CreatedAt},
            {label: "Updated", value: props.data.UpdatedAt},
            {label: "Phone", value: props.data.Phone},
            {label: "Date of Birth", value: props.data.DateOfBirth},
        ];
        return (
            <div className="grid gap-2 ">
                {usersFields.map((field) => (
                    <div key={field.label} className="flex text-sm">
                        <span className="font-bold w-32">{field.label}:</span>
                        <span>{field.value ?? "—"}</span>
                    </div>
                ))}
            </div>
        );
    }


        return (
        <div>
            <ul
                className=" relative w-full  max-w-[538px]  bg-white  rounded-xl mt-4 mb-4  p-2 transition-all mx-[48px] ">
                <div className="flex  ">




                    {renderUserFields()}

                    {( props.type === "type" || props.type === "genre" || props.type === "ageCategory" ) && (

                        <p className="text-roboto  font-bold ">
                            {props.data.Title}

                        </p>
                    )}


                </div>

                <div className=" flex items-end  justify-between  ">
                    <div className=" flex  ">
                        {(props.type === "type" || props.type === "genre") && (
                            <button
                                onClick={()=>{}}
                                className="text-green-600 rounded hover:text-blue-600"
                            >
                                <CameraSvgIcon className="color-[]"/>
                            </button>

                        )}

                    </div>
                    <div className="  ">
                        {renderEditButton()}
                        <button
                            onClick={props.onDelete}
                            className=" text-black rounded hover:text-red-600"
                        >
                            <TrashSvgIcon/>
                        </button>
                    </div>
                </div>


            </ul>
        </div>
        );
};

export default Lists;