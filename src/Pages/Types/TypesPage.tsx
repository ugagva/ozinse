import SideBar from "../../components/sidebar'sElements/SideBar.tsx";
import Header from "../../components/page'sElements/Header.tsx";
import BodyHeader from "../../components/page'sElements/BodyHeader.tsx";
import {useEffect, useState} from "react";
import api from "../../featechers/api/api.tsx";
import Lists from "../Lists.tsx";
import {useModalManager} from "../../components/Modals/useModalManager.tsx";
import TypeForm from "./TypeForm.tsx";
import {useSearch} from "../../components/context/SearchContext.tsx";


export type TypesCategoryData = {
    ID: number;
    Title: string;
}

export type TypeCategoryFormData = {
    ID?: number;
    Title: string;
}


const TypesPage = () => {

    const [typesCategories, setTypesCategories] = useState<TypesCategoryData[]>([]);
    const [loading, setLoading] = useState(false);
    const [typeCategoryToEdit, setTypeCategoryToEdit] = useState<TypeCategoryFormData | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    const {closeModal, openModal, ModalComponent} = useModalManager();

// При поиске по нескольким полям объекта
    const {search} = useSearch()



    // const searchInObject = (item: { Title: string }, search: string) => {
    //     if (!search.trim()) return true;
    //
    //
    //     return item.Title
    //         .toLowerCase()
    //         .startsWith(search.toLowerCase()); // ← даже строже
    //
    // };



    const fetchTypes = async () => {
        try {
            const response = await api.get(`v1/types`)

            setTypesCategories(response.data as TypesCategoryData []);
            console.log(response.data)

        } catch (error) {
            console.log(" Ошибка получения категории", error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchTypes().then()
    }, [])


    // const createType = async(newType:TypeFormData) => {
    //     try {
    //         const response = await api.post(`v1/types`, newType,
    //             {
    //                 headers: {"Content-Type": "application/json"}
    //             })
    //         await fetchTypes()
    //         return response.data ;
    //     } catch (error) {
    //         console.log("", error)
    //       }
    // }

    const saveType = async (data: TypeCategoryFormData) => {
        try {
            const {ID, Title} = data;
            const payload = {title: Title};
            const response = ID

                ? await api.put(`v1/types/${ID}`, payload, {
                    headers: {
                        "Content-Type": "application/json",
                    }

                }) //  если есть ID, то редактируем
                : await api.post(`v1/types`, payload, {
                    headers: {"Content-Type": "application/json"}
                }); //если нет ID, создаем новый

            await fetchTypes().then() // ⬅ обновляем список
            return response.data


        } catch (error) {
            console.error("Ошибка сохранения типа:", error);
            throw error;
        }
    }

//  Действие по кнопке ДОБАВИТЬ
    const handleAdd = async () => {
        setTypeCategoryToEdit(null)
        setIsAdding(true);
    }
///Действие по кнопке РЕДАКТИРОВАТЬ
    const handleEdit = (types: TypesCategoryData) => {
        setTypeCategoryToEdit({
            ID: types.ID,
            Title: types.Title
        })
        setIsAdding(false);
    }

//     // Редактируем
//     const onUpdate = async (typeID:number,types: TypesData):Promise<(TypesData & {id:number})| undefined> => {
//         if (typeID)
//             try { const response = await api.put(`v1/types/${typeID}`,types)
//             await fetchTypes();
//             return response.data;
//         } catch (error) {
//             console.log(error)
//         }
//         if (result) {
//             openModal("added", {
//                 label: ` Тип "${result.Title}" успешно ${result.ID ? "обновлен" : "создан"}!`,
//                 onConfirm: () => closeModal(),
//                 closeModal,
//             });
//             // 🔹 закрываем модалку
//         } else alert(" Тип не создан")
//     };
// //
//


    const handleDelete = async (id: number) => {
        try {
            await api.delete(`v1/types/${id}`)
        } catch (error) {
            console.log("Ошибка удаления категории:", error)
        }
    }


    if (loading) return <div>Загрузка списка категорий...</div>;


    return (
        <div>

            <div className="flex flex-grow">
                <SideBar/>

                <div className="flex-1">
                    <Header/>
                    <div className="relative w-[1190px] h-[2864px] bg-gray-100 rounded-xl mr-[250px] mt-[32px]">
                        <BodyHeader
                            value={'Категории'}
                            count={typesCategories.length}
                            onClick={handleAdd}

                        />


                        {isAdding && (
                            <TypeForm
                                key={"new"}
                                initialData={{Title: " "}}
                                onSubmit={saveType}
                                onClose={() => setIsAdding(false)}
                            >

                            </TypeForm>
                        )
                        }

                        {typeCategoryToEdit && (
                            <TypeForm
                                key={typeCategoryToEdit.ID}
                                id={typeCategoryToEdit.ID}
                                initialData={{Title: typeCategoryToEdit.Title}}
                                onSubmit={saveType}
                                onClose={() => setTypeCategoryToEdit(null)}
                            >

                            </TypeForm>
                        )}

                        {typesCategories.filter(typeCategory =>{   //  Рендер по поиску
                                return typeCategory.Title
                                    .toLowerCase()
                                    .includes(search.toLowerCase());
                            })

                            .map(typeCategory => (
                                <Lists
                                    key={typeCategory.ID}
                                    type="type"
                                    data={typeCategory}
                                    handleEdit={() => handleEdit(typeCategory)}
                                    onDelete={() => {
                                        openModal("delete", {
                                            label: `категорию   "${typeCategory.Title}" `,
                                            onConfirm: async () => {
                                                await handleDelete(typeCategory.ID);
                                                setTypesCategories(((prev) => prev.filter((t) => t.ID !== typeCategory.ID)))// здесь удаляем
                                                closeModal()
                                            },
                                            closeModal,
                                        })
                                    }
                                    }
                                >
                                </Lists>

                            ))

                        }

                        {/*{typesCategories.map((typeCategory) => (*/}
                        {/*    <Lists*/}
                        {/*        key={typeCategory.ID}*/}
                        {/*        type="type"*/}
                        {/*        data={typeCategory}*/}
                        {/*        handleEdit={() => handleEdit(typeCategory)}*/}
                        {/*        onDelete={() => {*/}
                        {/*            openModal("delete", {*/}
                        {/*                label: `категорию   "${typeCategory.Title}" `,*/}
                        {/*                onConfirm: async () => {*/}
                        {/*                    await handleDelete(typeCategory.ID);*/}
                        {/*                    setTypesCategories(((prev) => prev.filter((t) => t.ID !== typeCategory.ID)))// здесь удаляем*/}
                        {/*                    closeModal()*/}
                        {/*                },*/}
                        {/*                closeModal,*/}
                        {/*            })*/}
                        {/*        }*/}
                        {/*        }*/}
                        {/*    >*/}
                        {/*    </Lists>*/}
                        {/*))*/}
                        {/*}*/}


                    </div>
                    {ModalComponent}

                </div>
            </div>
        </div>
    );
};

export default TypesPage;