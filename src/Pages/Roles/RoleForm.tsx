import {FC, useEffect,} from "react";
import {useModalManager} from "../../components/Modals/useModalManager.tsx";
import {RoleData,} from "./RolesPage.tsx";
import {useRoles} from "./UseRoles.tsx";
import CrossSvgIcon from "../../Icons/CrossIcon.tsx";
import BaseButton from "../../components/elements/BaseButton.tsx";
import MultiSelect from "../../components/elements/MultiSelect.tsx";
import {useFormFields} from "../../utils/useFormFields.ts";
import {useNavigate, useParams} from "react-router-dom";


interface RoleFormProps {
    onSuccess?: (updatedRole: RoleData & { id: number }) => void,
    token?: string,
    initialData?: RoleData,
    roleId?: number,

}


const RoleForm: FC<RoleFormProps> = ({
                                         token,
                                         initialData,
                                         roleId,
                                         onSuccess,


                                     }) => {

    const {createRole, updateRole, getRoleById} = useRoles(token);

    const {openModal, closeModal, ModalComponent} = useModalManager();
    const navigate = useNavigate();

    const { roleId: routeRoleId } = useParams();
    // const [search, setSearch] = useState("");

    // 🔹 Уровни доступа
    const actions = ["Редактирование", "Добавление", "Только чтение"]
    const roles = ["Менеджер", "Редактор", "Модератор", "Пользователь"]


    const {form, handleFieldChange, setForm, resetForm,} = useFormFields<RoleData>({
        id: 0,
        title: [] as string[],
        ageCategories: [] as string[],
        projects: [] as string[],
        roles: [] as string[],
        genres:[] as string[],
        types: [] as string[],
        users: [] as string[],
    });


    // если есть initialData — режим редактирования
    useEffect(() => {
        console.log("RoleForm получил props:", {roleId, initialData,  routeRoleId},);
        if (initialData && initialData.id !== form.id) {

            setForm(initialData);

        } else  if (routeRoleId) { // если редактирование через URL
            getRoleById(Number(routeRoleId)).then((data) => {
                setForm(data);
            });
        }
    }, [initialData, roleId, setForm, routeRoleId]);


    const handleMultiSelectChange =
        (name: keyof Omit<RoleData, "id">) =>
            (values: string[]) => {
                handleFieldChange(name, values);
            };


    const handleSubmit = async () => {
        let result: (RoleData & { id: number }) | undefined;
        console.log("Creating role with:", form);

        if (form.id) {

            result = await updateRole(form.id, form);
        } else {
            // создание новой роли
            result = await createRole(form);
        }

        if (result) {
            openModal("added", {
                label: `Роль "${result.title}" успешно ${form.id ? "обновлена" : "создана"}!`,
                onConfirm: () => closeModal(),
                closeModal,
            });
            if (onSuccess) onSuccess(result);
            // 🔹 закрываем модалку
        } else alert("Роль не создана")
    };


    return (


        <div className=" fixed inset-0 z-50 flex items-center justify-center bg-[#898989] bg-opacity-50  ">

            <div
                className="flex  flex-col bg-white rounded-xl p-1 w-[574px] h-[700px] ">

                <div className="flex p-2   items-center justify-between">

                    <h2 className="text-lg  font-bold  mt-[10px] ml-[24px]"> Добавить роль </h2>
                    <button
                        className="my-[22px] mr-[24px]"
                        onClick={()=>navigate(`/roles`)}
                    >
                        <CrossSvgIcon/>
                    </button>


                </div>


                <div className="mx-2  ">
                    <MultiSelect
                        label="Наименование"
                        name="title"
                        options={["Менеджер", "Редактор", "Модератор", "Пользователь"]}
                        selected={form.title}
                        onChange={handleMultiSelectChange("title")}
                        labelClassName="absolute -top-2 left-6 bg-white px-1  font-medium text-xs text-[#8F92A1] "
                    >
                    </MultiSelect>
                    <MultiSelect
                        label="Проекты"
                        name="projects"
                        options={actions}
                        selected={form.projects}
                        onChange={handleMultiSelectChange("projects")}
                        labelClassName="absolute -top-2 left-6 bg-white px-1  font-medium text-xs text-[#8F92A1] "
                    >
                    </MultiSelect>
                    <MultiSelect
                        label="Категории"
                        name="age_categories"
                        options={actions}
                        selected={form. ageCategories}
                        onChange={handleMultiSelectChange("ageCategories")}
                        labelClassName="absolute -top-2 left-6 bg-white px-1  font-medium text-xs text-[#8F92A1] "
                    >
                    </MultiSelect>
                    <MultiSelect
                        label="Пользователи"
                        name="users"
                        options={actions}
                        selected={form.users}
                        onChange={handleMultiSelectChange("users")}
                        labelClassName="absolute -top-2 left-6 bg-white px-1  font-medium text-xs text-[#8F92A1] "
                    >
                    </MultiSelect>
                    <MultiSelect
                        label="Жанры"
                        name="genres"
                        options={actions}
                        selected={form.genres}
                        onChange={handleMultiSelectChange("genres")}
                        labelClassName="absolute -top-2 left-6 bg-white px-1  font-medium text-xs text-[#8F92A1] "
                    >
                    </MultiSelect>
                    <MultiSelect
                        label="Типы"
                        name="types"
                        options={actions}
                        selected={form.types}
                        onChange={handleMultiSelectChange("types")}
                        labelClassName="absolute -top-2 left-6 bg-white px-1 text-xs text-[#8F92A1]"
                    />

                    <MultiSelect
                        label="Роли"
                        name="roles"
                        options={roles}
                        selected={form.roles}
                        onChange={handleMultiSelectChange("roles")}
                        labelClassName="absolute -top-2 left-6 bg-white px-1  font-medium text-xs text-[#8F92A1] "
                    >

                    </MultiSelect>


                </div>

                {/* остальные поля по аналогии */}

                {/*<button*/}
                {/*    onClick={handleSubmit}*/}
                {/*    disabled={loading}*/}
                {/*    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"*/}
                {/*>*/}
                {/*    {loading ? "Сохраняем..." : roleId ? "Обновить роль" : "Создать роль"}*/}
                {/*</button>*/}


                {/*<div className=" flex items-center justify-center  mt-[20px]">*/}

                {/*    <p className=" text-base  text-[#8F92A1]">*/}
                {/*        Вы действительно хотите записать проект ?</p>*/}
                {/*</div>*/}
                <div className="flex items-center justify-center m-2 p-4 gap-1">
                    <BaseButton
                        className="flex justify-center items-center bg-[#7E2DFC] w-[134px] h-[38px] opasity-2 rounded-[16px] hover:bg-blue-800    text-center text-white font-bold text-sm  "
                        title="Добавить"
                        onClick={handleSubmit}
                    >
                    </BaseButton>

                    <button
                        type="button"
                        className="w-[134px] h-[38px]  rounded-xl bg-[#8F92A11A] text-black  font-bold rounded hover:bg-gray-200"
                        onClick={resetForm}> Отмена
                    </button>
                </div>

            </div>

            {ModalComponent}
        </div>


    );
};

export default RoleForm;