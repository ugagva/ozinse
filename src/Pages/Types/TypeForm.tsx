import React, {useEffect, useState} from "react";
import CrossSvgIcon from "../../Icons/CrossIcon.tsx";
import api from "../../featechers/api/api.tsx";
import {TypeCategoryFormData, TypesCategoryData} from "./TypesPage.tsx";
import BaseButton from "../../components/elements/BaseButton.tsx";


interface TypeCategoryFormProps {
    id?: number,
    initialData: TypeCategoryFormData,
    onSubmit: (data: TypeCategoryFormData) => Promise<TypesCategoryData>,
    onClose: () => void,
    onHandleSave?: () => void
}


const TypeForm = ({id, onClose, onSubmit, }: TypeCategoryFormProps) => {

    const [typeCategory, setTypeCategory] = useState<TypeCategoryFormData>({Title: "",});
    // const [editType, setEditType] = useState<TypesMovieData>([]);
    const [loading, setLoading] = useState(false);


    const loadTypeData = async (id: number) => {
        try {
            setLoading(true);
            const response = await api.get(`v1/types/${id}`, {
                headers: {"Content-Type": "application/json"}
            });
            setTypeCategory(response.data); // <-- заполняем форму существующими данными
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (id) {
            loadTypeData(id).then()
        }
    }, [id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value} = e.target;
        setTypeCategory((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        console.log("SUBMIT DATA:", typeCategory); // 👈 СМОТРИ В КОНСОЛЬ
        try {
            await onSubmit(typeCategory);
            onClose();
        } catch (error) {
            console.log("Ошибка сохранения", error)
        }

    }


    if (loading) {
        return (
            <div className="flex items-center justify-center text-blue-500 p-2">
                Загружаем категорию видео для редактирования...
            </div>
        )
    }


    return (
        <div className=" fixed inset-0 z-50 flex items-center justify-center bg-[#898989] bg-opacity-50 ">
            <div className=" flex  flex-col  bg-white rounded-xl p-1 w-[574px] h-[433px] ">
                <div className="flex  items-center justify-between">


                    <h2 className=" text-lg  font-bold  mt-[10px] ml-[24px] ">
                        {typeCategory.ID ? ` Редактировать категорию  ${typeCategory.Title} ?` : "Создать новую категорию "}
                    </h2>

                    <button
                        className="my-[22px] mr-[24px]"
                        onClick={onClose}
                    >
                        <CrossSvgIcon/>
                    </button>

                </div>

                <div className=" text-[#8F92A1]-800  text-[14px] font-bold">
                    {typeCategory && (
                        <input
                            type="text"
                            placeholder="Название категории "
                            name="Title"
                            value={typeCategory.Title}
                            onChange={handleChange}
                            className="flex  justify-center w-[510px] h-[46px] bg-[#8F92A10D]  m-6 p-5 border-gray-50 rounded-2xl shadow-l  "
                        />

                    )

                    }
                </div>

                <div className="flex items-center justify-center m-2 p-4 gap-1">

                    <BaseButton
                        className="flex justify-center items-center bg-[#7E2DFC] w-[134px] h-[38px] opasity-2 rounded-[16px] hover:bg-blue-800    text-center text-white font-bold text-sm  "
                        title={typeCategory.Title ? "Сохранить" : "Добавить"}
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

export default TypeForm;