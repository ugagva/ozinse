import {ComponentType} from "react";
import ModalDelete from "./ModalDelete.tsx";
import ModalAdded from "./ModalAdded.tsx";

export interface DeleteModalProps {
    label: string;
    onConfirm: () => void;
    closeModal: () => void;
}

export interface AddedModalProps {
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
    added: ModalAdded,

}

type ModalComponentPropsMap = {
    delete: DeleteModalProps;
    added: AddedModalProps;
    // text: TextModalProps;
};

type ModalType = keyof typeof modalMap;

const ModalFactory = <T extends ModalType>({
                                               type,
                                               modalProps,
                                           }:
                                               {
                                                   type: T;
                                                   modalProps: ModalComponentPropsMap[T];
                                               }) => {
    const ModalComponent = modalMap[type] as ComponentType<typeof modalProps>;
    return <
        ModalComponent {...modalProps}/>;
};


export default ModalFactory;

