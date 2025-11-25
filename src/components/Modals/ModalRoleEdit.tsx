import React from "react";
import RoleForm from "../../Pages/Roles/RoleForm.tsx";


interface ModalRoleEdit {
    label: string;
    content: React.ReactNode;
    closeModal: () => void;
}


const ModalRoleEdit = () => {
    return (
        <div>
   <RoleForm

   />


        </div>
    );
};

export default ModalRoleEdit;