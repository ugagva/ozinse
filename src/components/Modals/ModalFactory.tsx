import {ComponentType} from "react";
import ModalDelete from "./ModalDelete.tsx";

export interface DeleteModalProps {
    label: string;
    onConfirm: () => void;
    closeModal: () => void;
}

// Пример будущих модальных окон:
export interface TextModalProps {
    initialValue: string;
    onSave: (value: string) => void;
}

export const modalMap = {
    delete: ModalDelete,

}
type ModalComponentPropsMap = {
    delete: DeleteModalProps;
    // text: TextModalProps;
};
type ModalType = keyof typeof modalMap;

const ModalFactory = <T extends ModalType>({
                                               type,
                                               modalProps,
                                           }: {
    type: T;
    modalProps: ModalComponentPropsMap[T];
}) => {
    const ModalComponent = modalMap[type] as ComponentType<typeof modalProps>;
    return <ModalComponent {...modalProps} />;
};
export default ModalFactory;

