import CrossSvgIcon from "../../Icons/CrossIcon.tsx";
import { useNavigate} from "react-router-dom";
import BaseButton from "../../components/elements/BaseButton.tsx";
import {useModalManager} from "../../components/Modals/useModalManager.tsx";
import {useState} from "react";
import {AgeCategoriesData} from "./AgeCategoriesPage.tsx";


interface CategoryFormProps {
    token?: string;

}

const CategoryForm = ({token}: CategoryFormProps) => {
    const navigate = useNavigate();
    const {openModal, closeModal, ModalComponent} = useModalManager();
    const [categories, setCategories] = useState<Array<AgeCategoriesData>>([]);


    const handleSubmit = async () => {
        let result: (AgeCategoriesData & { id: number }) | undefined;
        console.log("Creating categories with:",);

        if (category.id) {

            result = await updateRole(category.id);
        } else {
            // создание новой роли
            result = await createCategory(form);

        }

        if (result) {
            openModal("added", {
                label: `Каегория "${result.title}" успешно ${form.id ? "обновлена" : "создана"}!`,
                onConfirm: () => closeModal(),
                closeModal,
            });
            if (onSuccess) onSuccess(result);
            // 🔹 закрываем модалку
        } else alert("Категория не создана")
    };


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

export default CategoryForm;