import CrossSvgIcon from "../../Icons/CrossIcon.tsx";
import {ReactNode} from "react";



interface UpdateModalProps {
    label: string;
    onConfirm: () => void;
    closeModal: () => void;
    content?: ReactNode; // ✅ вот это добавляем
}

const ModalUpdate = ({label, onConfirm, closeModal, content}: UpdateModalProps) => {
    return (
        <div className=" fixed xinset-0 z-50  bg-[#898989] bg-opacity-50 gap-2  rounded-2xl">
            <div
                className="bg-white rounded-xl items-center justify-center  w-[480px] h-[225px] mt-[282px] mx-[480px] ">
                {/* Дополнительный контент */}
                {content && (
                    <div className="mt-4 px-4 pb-4">
                        {content}
                    </div>
                )}

                <div className="flex items-center justify-between border-b border-[#8F92A1] border-dotted">


                    <h2 className="text-lg  font-bold  mt-[10px] ml-[24px]"> Добавить изменения в {label}? </h2>

                    <button className="my-[22px] mr-[24px]" onClick={closeModal}>
                        <CrossSvgIcon/>
                    </button>

                </div>



                <div className=" flex items-center justify-center  mt-[20px]">

                    <p className=" text-base  text-[#8F92A1]">
                        Вы действительно хотите изменить {label} ?</p>
                </div>
                <div className="flex items-center justify-center mt-[42px] gap-3 ">
                    <button
                        className="w-[134px] h-[38px]  bg-[#7E2DFC]   font-bold text-base text-white rounded-xl hover:bg-red-700"
                        onClick={onConfirm}> Да, записать изменения
                    </button>
                    <button
                        className="w-[134px] h-[38px]  rounded-xl bg-[#8F92A11A] text-black  font-bold rounded hover:bg-gray-400"
                        onClick={closeModal}> Отмена
                    </button>
                </div>


            </div>



        </div>
    )
        ;
};

export default ModalUpdate;