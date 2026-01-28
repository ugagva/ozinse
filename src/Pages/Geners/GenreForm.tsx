import CrossSvgIcon from "../../Icons/CrossIcon.tsx";


import React, {useEffect, useRef, useState} from "react";

import BaseButton from "../../components/elements/BaseButton.tsx";
import {GenreFormData, } from "./GenresPage.tsx";
import {Upload} from "lucide-react";
import TrashSvgIcon from "../../Icons/TrashSvgIcon.tsx";

import api from "../../featechers/api/api.tsx";


interface GenreFormProps {
    id?: number,
    initialData?: { Title: string },
    onClose?: () => void,
    onSubmit?: (newGenre: GenreFormData,) => Promise<void>
    onUpdate?: (genre: number | undefined) => Promise<void>
    setImage:  (s: string | null) => void,
    image?: string | null,

}


const GenreForm = ({id, onClose, onSubmit, image, setImage,initialData, onUpdate}: GenreFormProps) => {
    const [genre, setGenre] = useState<GenreFormData>({Title:""})

    const [loading, setLoading] = useState(false);




    const loadGenreData = async (id: number) => {
        try {
            setLoading(true);
            const response = await api.get(`v1/genres/${id}`);

            setGenre(response.data); // <-- заполняем форму
        } catch (error) {
            console.error("Ошибка при загрузке жанра", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id && initialData) {
            loadGenreData(id).then()
        }

    }, [id, initialData]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value} = e.target;
        setGenre(prev => ({
            ...prev,
            [name]: value
        }));
    }



    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0]; // берем первый файл
        if (!file) return;

        const url = URL.createObjectURL(file); // создаем временный URL
        setImage(url); // сохраняем в состояние
        console.log(url);
    }

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const url = URL.createObjectURL(file);
        setImage(url);
    };





    const handleRemoveImage = () => {
        setImage(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        } //  сбрасываем
    };


    if (loading)
        return (
            <div className="flex items-center justify-center text-blue-500 p-2">
                Загружаем жанр для редактирования...
            </div>
        );






    return (

        <div className=" fixed inset-0 z-50 flex items-center justify-center bg-[#898989] bg-opacity-50  ">

            <div className="flex  flex-col  bg-white rounded-xl p-1 w-[574px] h-[433px] ">
                <div className="flex  items-center justify-between">


                    <h2 className=" text-lg  font-bold  mt-[10px] ml-[24px] ">
                       {genre.ID? " Редактировать  жанр": "Создать новый жанр " }
                    </h2>

                    <button
                        className="my-[22px] mr-[24px]"
                        onClick={onClose}
                    >
                        <CrossSvgIcon/>
                    </button>

                </div>

                <div className=" text-[#8F92A1]-800  text-[14px] font-bold">
                    {genre && (
                        <input
                            type="text"
                            placeholder="Название жанра "
                            name="Title"
                            value={genre.Title}
                            onChange={handleChange}
                            className="flex  justify-center w-[510px] h-[46px] bg-[#8F92A10D]  m-6 p-5    border-gray-50 rounded-2xl shadow-l  "
                        />
                    )}


                    <div
                        className=" border-dash flex flex-col items-center justify-center relative w-[510px] h-[168px] bg-[#8F92A10D]  m-6 p-1 rounded-2xl shadow-l">


                        {image ? (
                                <div className="relative w-[510px] h-[250px]">
                                    <img
                                        src={image }
                                        alt="Preview"
                                        className="w-full h-full object-cover "
                                    />

                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-2 right-2 bg-black bg-opacity-60 text-white rounded-full p-1 hover:bg-opacity-80"
                                    >
                                        <TrashSvgIcon className="w-4 h-4 "/>
                                    </button>
                                </div>) :
                            (
                                <div
                                    className="flex flex-col items-center justify-center w-[510px] h-[250px]  border-dashed border-gray-300 rounded-xl cursor-pointer"
                                    onDrop={handleDrop}
                                    onDragOver={(e) => e.preventDefault()}
                                    onClick={() => fileInputRef.current?.click()} // открыть input
                                >
                                    <Upload className="w-10 h-10 text-gray-400"/>
                                    <span className="mt-2 text-sm text-gray-500">
                                        Перетащите картинку или <span className="text-blue-600">загрузите</span>
                                    </span>

                                    {/* скрытый input для выбора файла */}
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleFileSelect} // здесь берём e.target.files
                                    />
                                </div>
                            )
                        }


                    </div>


                    <div className="flex items-center justify-center m-2 p-4 gap-1">
                        {genre.ID? (
                        <BaseButton
                            className="flex justify-center items-center bg-[#7E2DFC] w-[134px] h-[38px] opasity-2 rounded-[16px] hover:bg-blue-800    text-center text-white font-bold text-sm  "
                            title="Добавить"
                            onClick={() => onSubmit?.(genre)}
                        >
                        </BaseButton>
                            )
                        :(
                                <BaseButton
                                    className="flex justify-center items-center bg-[#7E2DFC] w-[134px] h-[38px] opasity-2 rounded-[16px] hover:bg-blue-800    text-center text-white font-bold text-sm  "
                                    title="Сохранить"
                                    onClick={() =>onUpdate?.(genre.ID) }
                                >
                                </BaseButton>
                            )

                        }

                        <button
                            type="button"
                            className="w-[134px] h-[38px]  rounded-xl bg-[#8F92A11A] text-black  font-bold rounded hover:bg-gray-200"
                            onClick={onClose}> Отмена
                        </button>

                    </div>

                </div>


            </div>

        </div>
    );
};


export default GenreForm;

