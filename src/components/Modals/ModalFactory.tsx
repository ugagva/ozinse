import React, {ComponentType, JSX} from "react";
import ModalDelete from "./ModalDelete.tsx";
import ModalAdded from "./ModalAdded.tsx";
import ModalUpdate from "./ModalUpdate.tsx";
import ModalAddProjectOnMain from "./ModalAddProjectOnMain.tsx";
import RoleForm from "../../Pages/Roles/RoleForm.tsx";
import {RoleData} from "../../Pages/Roles/RolesPage.tsx";
import ModalRoleEdit from "./ModalRoleEdit.tsx";
import ModalConfirmCancel from "./ModalConfirmCancel.tsx";



export interface DeleteModalProps {
    label: string;
    onConfirm: () => void;
    closeModal: () => void;
}

export interface AddedModalProps {
    label: string;
    onConfirm: () => void;
    closeModal: () => void;
    content?: JSX.Element;
}
export interface ModalAddProjectOnMainProps {
    label: string;
    onConfirm: (selectedProjects: number[]) => void;
    closeModal: () => void;
    content?: JSX.Element;
    availableProjects: { id: number; title: string }[];
    onChange: (selectedProjects: number[]) => void;
}

export interface ModalRoleFormProps {
    label: string;
    token: string;
    roleId?: number;
    onSuccess?: (newRole: RoleData & { id: number }) => void;
    onConfirm: (selectedProjects: number[]) => void;
    closeModal: () => void;
}



export interface UpdateModalProps {
    label: string;
    onConfirm?: () => void;
    closeModal: () => void;
    content?: React.ReactNode; // ✅ вот это добавляем
}

export interface ModalRoleEditProps {
    label: string;
    content: React.ReactNode;
    closeModal: () => void;
}

export interface ModalConfirmCancelProps {
    onConfirm: () => void;
    closeModal: () => void;
 };



// Пример будущих модальных окон:
export interface TextModalProps {
    initialValue: string;
    onSave: (value: string) => void;
}

 const modalMap = {
    delete: ModalDelete,
    added: ModalAdded,
    update:ModalUpdate,
    addOnMain:ModalAddProjectOnMain,
    roleForm:RoleForm,
    editRole:ModalRoleEdit ,
    cancel:ModalConfirmCancel,
} as const;



export  type ModalComponentPropsMap = {
    delete: DeleteModalProps;
    added: AddedModalProps;
    update: UpdateModalProps;
    addOnMain:ModalAddProjectOnMainProps;
    roleForm:ModalRoleFormProps;
    editRole:ModalRoleEditProps ;
    cancel:ModalConfirmCancelProps;

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

