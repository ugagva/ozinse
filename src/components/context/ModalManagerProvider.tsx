import React, {createContext, useState} from "react";

import ModalFactory, {
    AddedModalProps,
    DeleteModalProps,
    ModalAddProjectOnMainProps,
    UpdateModalProps,
    ModalRoleFormProps,
    ModalRoleEditProps,
    ModalConfirmCancelProps,
} from "../Modals/ModalFactory.tsx";




type ModalComponentPropsMap = {
    delete: DeleteModalProps;
    added: AddedModalProps;
    update: UpdateModalProps;
    addOnMain: ModalAddProjectOnMainProps;
    roleForm: ModalRoleFormProps;
    editRole: ModalRoleEditProps;
    cancel: ModalConfirmCancelProps;
};

type ModalType = keyof ModalComponentPropsMap;

interface ModalManagerContextValue {
    openModal: <T extends ModalType>(type: T, props: ModalComponentPropsMap[T]) => void;
    closeModal: () => void;
    ModalComponent: React.ReactNode;
}


export const ModalManagerContext = createContext<ModalManagerContextValue | null>(null);



export const ModalManagerProvider:React.FC<{ children: React.ReactNode }>= ({ children }) => {
    const [modalType, setModalType] = useState<ModalType|null>(null);
    const [modalProps, setModalProps] = useState< ModalComponentPropsMap[ModalType] | null>(null);

    const openModal=<T extends ModalType>(type: T, props: ModalComponentPropsMap[T]) => {
        setModalType(type);
        setModalProps(props);
    };

    const closeModal = () => {
        setModalType(null);
        setModalProps(null);
    };

    const ModalComponent =
        modalType && modalProps ? (
            <ModalFactory type={modalType} modalProps={modalProps} />
        ) : null;

    return (
        <ModalManagerContext.Provider value={{ openModal, closeModal, ModalComponent }}>
            {children}
            {ModalComponent}
        </ModalManagerContext.Provider>
    );
};