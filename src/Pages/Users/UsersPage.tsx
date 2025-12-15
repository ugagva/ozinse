import SideBar from "../../components/sidebar'sElements/SideBar.tsx";
import Header from "../../components/page'sElements/Header.tsx";
import BodyHeader from "../../components/page'sElements/BodyHeader.tsx";

import {useEffect, useState} from "react";
import api from "../../featechers/api/api.tsx";
import Lists from "../Lists.tsx";
import {useModalManager} from "../../components/Modals/useModalManager.tsx";

import UserForm from "./UserForm.tsx";


export type UsersData= {
    ID: number;
    Title: string;
}

export type UserFormData={
    ID?: number;
    Title: string;
}


const UsersPage = () => {

    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState<UsersData[]>([]);
    const [isAdding, setIsAdding] = useState(false);
    const {openModal, closeModal, ModalComponent} = useModalManager();
    const [userToEdit, setUserToEdit] = useState<UserFormData | null>(null);


    const fetchUsers = async () => {
        try {
            const response = await api.get(`v1/users`);
            setUsers(response.data as UsersData[]);

            console.log(response.data)
        } catch (error) {
            console.log("Ошибка загрузки пользвателей:", error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchUsers().then()
    }, []);




// Добавляем
const handleAdd = () => {
    setIsAdding(true);
    setUserToEdit(null)
}

const createUsers=async (newUsers:UserFormData) => {
    try{
        const response = await api.post("v1/users", newUsers, {
            headers: {"Content-Type": "application/json"}
        })
        await fetchUsers();
        return response.data;
    } catch (error) {
        console.error("Ошибка добавления жанра", error);
    }
    }



const handleEdit = async (user:UsersData) => {
    setUserToEdit({ID: user.ID, Title: user.Title});
    setIsAdding(false);
}

const handleDelete = async (id: number) => {
    try {
        await api.delete(`v1/users/${id}`);
    }catch(err){console.log("Ошибка удаления пользователя:",err)}
}


if (loading) return <div>Загрузка списка пользователей...</div>;




    return (

            <div className="flex flex-grow">
                <SideBar/>
                <div className="flex-1  ">
                    <Header/>
                    <div className="relative w-[1190px] h-[2864px] bg-gray-50 rounded-xl mr-[250px] mt-[32px] ">

                        <BodyHeader
                            value={'Пользователи'}
                            onClick={handleAdd}
                        />
                        {isAdding &&(
                            <UserForm
                                key="new"
                                initialData={ {Title:""}}
                                onSubmit={createUsers}
                                onClose={() => setIsAdding(false)}

                            />
                        )
                        }

                        <ul>
                            {users.map((user) => (
                                <Lists key={user.ID}
                                       value={user}
                                       handleEdit={() => handleEdit(user)}
                                       onDelete={() => {
                                           openModal("delete", {
                                                   label: `жанр "${user.Title}"`,
                                                   onConfirm: async () => {
                                                       await handleDelete(user.ID);
                                                       setUsers(((prev) => prev.filter((u) => u.ID !== user.ID)))// здесь удаляем выбранный жанр
                                                       closeModal()
                                                   },
                                                   closeModal,
                                               }
                                           )
                                       }}
                                />
                            ))

                            }

                        </ul>
                        {ModalComponent}

                </div>
                </div>
            </div>

    );
};

export default UsersPage;