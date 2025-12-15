import CrossSvgIcon from "../../Icons/CrossIcon.tsx";
import { useNavigate} from "react-router-dom";
import BaseButton from "../../components/elements/BaseButton.tsx";
import {useModalManager} from "../../components/Modals/useModalManager.tsx";
import React, {useEffect, useState} from "react";
import {AgeCategoriesData} from "./AgeCategoriesPage.tsx";
import api from "../../featechers/api/api.tsx";


interface AgeCategoryFormProps {
  onClose?: () => void,
}



const AgeCategoryForm = ({id, onClose}: AgeCategoryFormProps) => {

    const navigate = useNavigate();
    const {openModal, closeModal, ModalComponent} = useModalManager();
    const [category, setCategory] = useState<Array<AgeCategoriesData>>([]);
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
    //
    // const handleSubmit = async () => {
    //     let result: (AgeCategoriesData & { id: number }) | undefined;
    //     console.log("Creating categories with:",);
    //     if (category.id) {
    //
    //         result = await updateRole(category.id);
    //     } else {
    //         result = await createCategory(form);   // создание новой роли
    //     }
    //
    //     if (result) {
    //         openModal("added", {
    //             label: `Каегория "${result.Title}" успешно ${result.id ? "обновлена" : "создана"}!`,
    //             onConfirm: () => closeModal(),
    //             closeModal,
    //         });
    //         if (onSuccess) onSuccess(result);     // 🔹 закрываем модалку
    //
    //     } else alert("Категория не создана")
    // };


    if (loading)
        return (
            <div className="flex items-center justify-center text-blue-500 p-2">
                Загружаем возрастную категорию для редактирования...
            </div>
        );



    return (
        <div className=" fixed inset-0 z-50 flex items-center justify-center bg-[#898989] bg-opacity-50  ">
            <div className="flex items-center justify-center bg-[#898989]">

                <div className="flex  flex-col bg-white rounded-xl p-1 w-[574px] h-[249px] ">

                    <h2 className="text-lg  font-bold  mt-[10px] ml-[24px]"> Добавить категорию </h2>
                    <button
                        className="my-[22px] mr-[24px]"
                        onClick={() => navigate(`/categories`)}
                    >
                        <CrossSvgIcon/>
                    </button>
                </div>


                <div className="flex items-center justify-center m-2 p-4 gap-1">
                    <BaseButton
                        className="flex justify-center items-center bg-[#7E2DFC] w-[134px] h-[38px] opasity-2 rounded-[16px] hover:bg-blue-800    text-center text-white font-bold text-sm  "
                        title="Добавить"
                        onClick={handleSubmit}
                    >
                    </BaseButton>

                    <button
                        type="button"
                        className="w-[134px] h-[38px]  rounded-xl bg-[#8F92A11A] text-black  font-bold rounded hover:bg-gray-200"
                        onClick={() => setCategories([])}> Отмена
                    </button>
                </div>

            </div>


            {ModalComponent}
        </div>
    );
};

export default AgeCategoryForm;