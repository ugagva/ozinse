
import { useState} from "react";

import CrossSvgIcon from "../../Icons/CrossIcon.tsx";
import MultiSelect from "../elements/MultiSelect.tsx";
import BaseButton from "../elements/BaseButton.tsx";



interface ModalAddProjectOnMainProps {
    label: string;
    onConfirm: (selectedProjects: number[]) => void;
    closeModal: () => void;
    availableProjects: { id: number; title: string }[];
    onChange: (selectedProjects: number[]) => void;
}

const ModalAddProjectOnMain = ({label, closeModal, availableProjects, onChange}: ModalAddProjectOnMainProps) => {

// const { mainProjects, setMainProjects}= useContext(VideoListContext);



    const [selectedProjects, setSelectedProjects] = useState<number[]>([]);

    const handleSelectChange = (selectedIds: number[]) => {
        setSelectedProjects(selectedIds);
    };




const handleAddOnMain = () => {
   if (selectedProjects.length > 0) {
       onChange(selectedProjects);
       closeModal();
    }
}



    return (
        <div className=" fixed inset-0 z-50 flex items-center justify-center bg-[#898989] bg-opacity-50  ">

            <div
                className="flex  flex-col bg-white rounded-xl p-1 w-[574px] h-[547px] ">

                <div className="flex p-2   items-center justify-between">

                    <h2 className="text-lg  font-bold  mt-[10px] ml-[24px]"> {label}</h2>
                    <button className="my-[22px] mr-[24px]" onClick={closeModal}>
                        <CrossSvgIcon/>
                    </button>


                </div>


                <div className="mx-2  ">




                    <MultiSelect
                        label="Выберите проект"
                        name="title"
                        options={availableProjects.map((p) => ({
                            label: p.title,
                            value: p.id,
                        }))}
                        selected={selectedProjects}
                        onChange={handleSelectChange}
                        labelClassName="left-5 bg-transparent text-sm text-blue-500"
                    >
                    </MultiSelect>

                    <MultiSelect
                        label="Выберите очередность"
                        name="title"
                        options={availableProjects.map((p) => ({
                            label: p.title,
                            value: p.id,
                        }))}
                        selected={selectedProjects}
                        onChange={handleSelectChange}
                    >
                    </MultiSelect>






                </div>

                {/* Добавьте остальные поля по аналогии */}

                {/*<button*/}
                {/*    onClick={handleSubmit}*/}
                {/*    disabled={loading}*/}
                {/*    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"*/}
                {/*>*/}
                {/*    {loading ? "Сохраняем..." : roleId ? "Обновить роль" : "Создать роль"}*/}
                {/*</button>*/}


                {/*<div className=" flex items-center justify-center  mt-[20px]">*/}

                {/*    <p className=" text-base  text-[#8F92A1]">*/}
                {/*        Вы действительно хотите записать проект ?</p>*/}
                {/*</div>*/}
                <div className="flex items-center justify-center m-2 p-4 gap-1">
                    <BaseButton
                        className="flex justify-center items-center bg-[#7E2DFC] w-[134px] h-[38px] opasity-2 rounded-[16px] hover:bg-blue-800    text-center text-white font-bold text-sm  "
                        title="Добавить"
                        onClick={handleAddOnMain}
                    >
                    </BaseButton>

                    <button
                        className="w-[134px] h-[38px]  rounded-xl bg-[#8F92A11A] text-black  font-bold rounded hover:bg-gray-200"
                        onClick={closeModal}> Отмена
                    </button>
                </div>

            </div>


        </div>



    );
};

export default ModalAddProjectOnMain;