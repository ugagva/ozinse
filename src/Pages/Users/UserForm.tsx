import {UserFormData} from "./UsersPage.tsx";
import CrossSvgIcon from "../../Icons/CrossIcon.tsx";
import React, {useEffect, useState} from "react";
import BaseButton from "../../components/elements/BaseButton.tsx";
import api from "../../featechers/api/api.tsx";




interface UserFormProps {
    id?: number,
    initialData?: UserFormData,
    onClose?: () => void,
    onSubmit?: (newUsers: UserFormData) => Promise<void>
}

const UserForm = ({ id, onClose, initialData, onSubmit,}: UserFormProps) => {

    const [user, setUser] = useState<UserFormData>(
        initialData ?? { name:"", email:"", date_of_birth:"", phone:"",  },
    );
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        if (id){
            loadUserData(id).then();
        }
    }, [id]);


    const loadUserData = async (id: number) => {
        try {
            setLoading(true);
            const response = await api.get(`v1/users/${id}`);

            setUser(response.data); // <-- заполняем форму
            console.log("Api date",response.data);
        } catch (error) {
            console.error("Ошибка при загрузке пользователя", error);
        } finally {
            setLoading(false);
        }
    };






    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const {name, value} = e.target;
        setUser(prev => ({
            ...prev,
            [name]: value

        }));
    }


    if (loading)
        return (
            <div className="flex items-center justify-center text-blue-500 p-2">
                Загружаем пользователя для редактирования...
            </div>
        );


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#898989] bg-opacity-50 ">

            <div className="flex  flex-col  bg-white rounded-xl p-1 w-[574px] h-[433px]">
                <div className="flex  items-center justify-between">
                    <h2 className=" text-xl  font-bold  mt-[10px] ml-[24px] ">
                        {user.name ? "Редактировать пользователя" : "Создать нового пользователя"}

                    </h2>

                    <button
                        className="my-[22px] mr-[24px]"
                        onClick={onClose}
                    >
                        <CrossSvgIcon/>
                    </button>

                </div>

                <div className=" text-[#8F92A1]-800  text-[14px] font-bold">
                    {user && (
                        <input
                            placeholder="Имя пользователя "
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="flex  justify-center w-[510px] h-[40px] bg-[#8F92A10D] m-1 p-5    border-gray-50 rounded-2xl shadow-l  "
                        />

                    )}
                    <input
                        placeholder="Email "
                        name="email"
                        type="email"
                        value={user.email}
                        onChange={handleChange}
                        className="flex  justify-center w-[510px] h-[40px] bg-[#8F92A10D]  m-1 p-5    border-gray-50 rounded-2xl shadow-l  "
                    />
                </div>


                <input
                    placeholder="Phone "
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    className="flex  justify-center w-[510px] h-[40px] bg-[#8F92A10D]  m-1 p-5  border-gray-50 rounded-2xl shadow-l  "
                />
                <input
                    placeholder="DateOfBirth "
                    name="date_of_birth"
                    value={user.date_of_birth}
                    onChange={handleChange}
                    className="flex  justify-center w-[510px] h-[46px] bg-[#8F92A10D]  m-1 p-5  border-gray-50 rounded-2xl shadow-l  "
                />


                <div className="flex items-center justify-center m-2 p-4 gap-1">
                    <BaseButton
                        className="flex justify-center items-center bg-[#7E2DFC] w-[134px] h-[38px] opasity-2 rounded-[16px] hover:bg-blue-800    text-center text-white font-bold text-sm  "
                        title={user.name ? "Сохранить" : "Добавить"}
                        onClick={() => onSubmit?.(user)}
                    >
                    </BaseButton>

                    <button
                        type="button"
                        className="w-[134px] h-[40px]  rounded-xl bg-[#7E2DFC] text-white  font-bold rounded hover:bg-gray-200"
                        onClick={onClose}> Закрыть
                    </button>

                </div>

            </div>


        </div>
    );
};

export default UserForm;