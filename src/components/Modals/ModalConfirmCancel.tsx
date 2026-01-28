import React from "react";


interface ModalConfirmCancelProps {
    onConfirm: () => void;
    onClose?: () => void;
}


const ModalConfirmCancel:  React.FC<ModalConfirmCancelProps> = ({onConfirm, onClose}) => {
    return (
        <div>
            <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
                <div className="bg-white p-6 rounded-2xl w-[400px]">

                    <h2 className="text-lg  mb-4">"Вы уверены, что хотите выйти без сохранения изменений ?"</h2>
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-2xl hover:bg-gray-300"
                        >
                            Отмена
                        </button>
                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 bg-gray-500 text-white rounded-2xl hover:bg-gray-600"
                        >
                            Да, выйти
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmCancel;