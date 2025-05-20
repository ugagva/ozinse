import { useState} from "react";


export interface DeleteModalProps {
    label: string;
    onConfirm: () => void;
    closeModal: () => void;
}
type ModalComponentPropsMap = {
    delete: DeleteModalProps;
    // future: other modals...
};
type ModalType = keyof ModalComponentPropsMap;

export function useModalManager() {

    const [modalType, setModalType] = useState<ModalType | null>(null);
    const [modalProps, setModalProps] = useState<ModalComponentPropsMap[ModalType] | null>(null);

    const openModal = <T extends ModalType>(
        type: T,
        props: ModalComponentPropsMap[T]
    ) => {
        setModalType(type);
        setModalProps(props);
    };

    const closeModal = () => {
        setModalType(null);
        setModalProps(null);
    };

    return {
        modalType,
        modalProps,
        openModal,
        closeModal,
    };
}