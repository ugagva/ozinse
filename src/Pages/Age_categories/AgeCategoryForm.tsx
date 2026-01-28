import React, {useEffect, useState} from "react";
import api from "../../featechers/api/api.tsx";

import CrossSvgIcon from "../../Icons/CrossIcon.tsx";
import BaseButton from "../../components/elements/BaseButton.tsx";
import {AgeCategoriesData, AgeCategoryFormData} from "./AgeCategoriesPage.tsx";




interface AgeCategoryFormProps {
    id?: number,
    initialData?:AgeCategoryFormData,
    onClose: () => void,
    onSubmit: (data: AgeCategoryFormData) => Promise<AgeCategoriesData>

}


const AgeCategoryForm = ({id, onClose, onSubmit}: AgeCategoryFormProps) => {


    const [category, setCategory] = useState<AgeCategoryFormData>({Title: ""});
    const [loading, setLoading] = useState(false);


    const loadCategoryData = async (id: number) => {
        try {
            setLoading(true);
            const response = await api.get(`v1/age-categories/${id}`);
            setCategory(response.data); // <-- заполняем форму
        } catch (error) {
            console.error("Ошибка при загрузке категории", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            loadCategoryData(id).then()
        }
    }, [id]);

    const handleSubmit = async () => {
        console.log("SUBMIT DATA:",category); // 👈 СМОТРИ В КОНСОЛЬ
        try {
            await onSubmit(category);
            onClose();
        }catch (error) {console.log("Ошибка сохранения",error)}

    }




    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value} = e.target;
        setCategory(prev =>
            ({...prev, [name]: value}));
    }


    if (loading)
        return (
            <div className="flex items-center justify-center text-blue-500 p-2">
                Загружаем возрастную категорию для редактирования...
            </div>
        );


    return (
        <div className=" fixed inset-0 z-50 flex items-center justify-center bg-[#898989] bg-opacity-50   ">
            <div className="flex  flex-col  bg-white rounded-xl p-1 w-[574px] h-[433px]">

                <div className="flex  items-center justify-between  ">

                    <h2 className="text-lg  font-bold  mt-[10px] ml-[24px]">
                        {category.Title ? "Изменить возрастную категорию" : "Добавить возрастную категорию"}
                    </h2>

                    <button
                        className="my-[22px] mr-[24px]"
                        onClick={onClose}
                    >
                        <CrossSvgIcon/>
                    </button>
                </div>


                <div className=" text-[#8F92A1]-800  text-[14px] font-bold">
                    {category && (
                        <input
                            type="text"
                            placeholder="Название "
                            name="Title"
                            value={category.Title}
                            onChange={handleChange}
                            className="flex  justify-center w-[510px] h-[46px] bg-[#8F92A10D]  m-6 p-5    border-gray-50 rounded-2xl shadow-l  "
                        />
                    )}


                </div>

                <div className="flex items-center justify-center m-2 p-4 gap-1">
                    <BaseButton
                        className="flex justify-center items-center bg-[#7E2DFC] w-[134px] h-[38px] opasity-2 rounded-[16px] hover:bg-blue-800    text-center text-white font-bold text-sm  "
                        title={category.Title? "Сохранить" : "Добавить"}
                        onClick={handleSubmit}
                    >
                    </BaseButton>

                    <button
                        type="button"
                        className="w-[134px] h-[38px]  rounded-xl bg-[#8F92A11A] text-black  font-bold rounded hover:bg-gray-200"
                        onClick={onClose}> Отмена
                    </button>
                </div>

            </div>


        </div>
    );
};

export default AgeCategoryForm;