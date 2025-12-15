import { useEffect, useState} from "react";
import RoleForm from "./RoleForm";


import {useModalManager} from "../../components/Modals/useModalManager.tsx";
import {useRoles} from "./UseRoles.tsx";
import SideBar from "../../components/sidebar'sElements/SideBar.tsx";
import Header from "../../components/page'sElements/Header.tsx";

import BodyHeader from "../../components/page'sElements/BodyHeader.tsx";

import TrashSvgIcon from "../../Icons/TrashSvgIcon.tsx";

import EditSvgIcon from "../../Icons/EditSvgIcon.tsx";
import CheckSvgIcon from "../../Icons/CheckSvgIcon.tsx";

// import {RoleFormContext} from "../CreateNewProject/Sections/RoleFormContext.tsx";


// Данные, как они приходят с БЭКА
export interface BackendRoleData {
    ID: number;
    Title: string;
    Projects: number;
    Genres: number;
    AgeCategories: number;
    Types: number;
    Users: number;
    Roles: number;
}

export type RoleData = {
    id: number;
    title: Array<string>;
    ageCategories: Array<string>;
    projects: Array<string>;
    roles: Array<string>;
    genres: Array<string>;
    types:Array<string>;
    users: Array<string>;

};

// RolePayload — то, что  отправляем на бэк
export type RolePayload = {
    title: string;
    age_categories: number;
    projects: number;
    roles: number;
    users: number;
    genres?: number;
    types?: number;
};


const RolesPage = ({token}: { token: string }) => {

    const {getRoles, deleteRole, } = useRoles(token);
    const {openModal, closeModal, ModalComponent} = useModalManager();
    const [roles, setRoles] = useState<RoleData[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [roleToEdit, setRoleToEdit] = useState<RoleData | null>(null);

    // const navigate = useNavigate();





    // Загружаем список ролей
    useEffect(() => {
        const fetchRoles = async () => {
            setLoading(true);
            const data = await getRoles();
            setRoles(data || []);
            setLoading(false);
            console.log(data);
        };
        fetchRoles().then();
    }, [getRoles]);


    // Добавляем роль
    const handleAdd = async () => {
        // Очистить режим редактирования
        setRoleToEdit(null);
        // Включить режим добавления
        setIsAdding(true);

    }


    // const location = useLocation();
    // const roleToEdit = location.state?.role;

    useEffect(() => {
        if (roleToEdit) {
            setIsAdding(true); // используем ту же форму
        }
    }, [roleToEdit]);


    // Изменяем роль
    const handleEdit = async (role: RoleData) => {

        setRoleToEdit(role);     // Установить роль, которую редактируем
        // Переключить в режим формы
        setIsAdding(false);

        // try {
        //     console.log("Редактируем роль:", role);
        //     // ✅ Загружаем актуальные данные роли с сервера
        //     const fullRole = await getRoleById(role.id);// или getRoleById(role.id), если есть
        //     openModal("update", {
        //         label: `Редактирование роли ${fullRole.title}`,
        //         // Загружаем полные данные роли
        //         content: (
        //             <RoleForm
        //                 token={token}
        //                 initialData={fullRole}
        //                 roleId={fullRole.id} // передаем id для редактирования
        //
        //
        //                 // 🔹 Вызывается, когда форма успешно сохраняет изменения
        //                 onSuccess={async (updatedRole) => {
        //                     // Отправляем обновление на сервер
        //                     const updated = await updateRole(fullRole.id, updatedRole);
        //
        //                     if (updated) {
        //                         setRoles((prev) =>
        //                             prev.map((r) => (r.id === fullRole.id ? updated : r))
        //                         );
        //                         console.log("Роль обновлена:", updated);
        //                     }
        //                     closeModal()
        //                 }}
        //             />
        //         ),
        //
        //         closeModal,
        //     });
        //
        // }catch (error) {
        //     console.error("Ошибка при загрузке роли:", error);
        //     alert("Не удалось загрузить данные роли. Попробуйте снова.");
        // }
        //


    };
    const handleFormSuccessAdd = (newRole: RoleData & { id: number }) => {
        setRoles((prev) => [...prev, newRole]);
        setIsAdding(false);
    };

    const handleFormSuccessEdit = (updated: RoleData & { id: number }) => {
        setRoles((prev) =>
            prev.map((r) => (r.id === updated.id ? updated : r))
        );
        setRoleToEdit(null);
    };

    // Удаляем роль
    const handleDelete = (role: RoleData,) => {
        openModal("delete", {
            label: `${role.title}?`,
            onConfirm: async () => {
                await deleteRole(role.id);
                setRoles((prev) => prev.filter((r) => r.id !== role.id));
                closeModal();
            },
            closeModal,
        });
    };


    if (loading) return <p>Загрузка ролей...</p>;

    return (
        <div>
            <div className="flex flex-grow">
                <SideBar/>
                <div className="flex-1  ">
                    <Header/>
                    <div className="relative w-[1190px] h-[2864px] bg-gray-50 rounded-xl mr-[250px] mt-[32px] ">

                        <BodyHeader
                            value={'Роли'}
                            onClick={handleAdd}

                        />


                        {isAdding && (
                            <div>
                                <RoleForm
                                    token={token}
                                    key="new"
                                    onSuccess={handleFormSuccessAdd}
                                    onClose={() => setIsAdding(false)}
                                />
                                <button
                                    onClick={() => setIsAdding(false)}
                                    className="mt-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                                    Отмена
                                </button>

                            </div>
                        )}

                        {roleToEdit && (
                            <RoleForm
                                key={`edit-${roleToEdit.id}`}  // ключ зависит от id редактируемой роли
                                token={token}
                                initialData={roleToEdit}
                                onSuccess={handleFormSuccessEdit}
                                onClose={() => setRoleToEdit(null)}
                            />
                        )}

                        <ul>
                            {roles.map((role, i) => (
                                <li key={i}
                                    className="relative w-[538px] h-[180px]  left-10 bg-white rounded-xl  transition-all p-2 mr-[48px] m-2">
                                    <p className="text-xl font-bold ">
                                        {role.title}
                                    </p>
                                    <ul className="space-y-1 p-2 mr-2">
                                        <li className="flex items-center gap-2">
                                            <CheckSvgIcon/>
                                            <span>Проекты</span>
                                            <div className="text-[#9CA3AF]">{role.projects}</div>

                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckSvgIcon/>
                                            <span>Категории </span>
                                            <div className="text-[#9CA3AF]">{role. ageCategories}</div>

                                        </li>

                                        <li className="flex items-center gap-2">
                                            <CheckSvgIcon/>
                                            <span>Пользователи </span>
                                            <div className="text-[#9CA3AF]">  {role.users}</div>

                                        </li>
                                        <li className="flex items-center gap-2">
                                            <CheckSvgIcon/>
                                            <span>Роли </span>
                                            <div className="text-[#9CA3AF]">  {role.roles}</div>

                                        </li>
                                    </ul>


                                    <div className=" flex gap-1 absolute bottom-2 right-2">
                                        <button
                                            onClick={() => handleEdit(role,)}
                                            className=" text-white px-2 py-1 rounded hover:bg-blue-600"
                                        >
                                            <EditSvgIcon/>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(role,)}
                                            className=" text-black px-2 py-1 rounded hover:bg-red-600"
                                        >
                                            <TrashSvgIcon/>
                                        </button>
                                    </div>
                                </li>
                            ))
                            }
                        </ul>


                        {/* Рендер модалки */}

                        {ModalComponent}

                    </div>


                </div>
            </div>

        </div>
    );

};
export default RolesPage;