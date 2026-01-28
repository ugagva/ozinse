import SideBar from "../../components/sidebar'sElements/SideBar.tsx";
import Header from "../../components/page'sElements/Header.tsx";
import BodyHeader from "../../components/page'sElements/BodyHeader.tsx";


import { useEffect, useState} from "react";
import {useModalManager} from "../../components/Modals/useModalManager.tsx";


import api from "../../featechers/api/api.tsx";
import Lists from "../Lists.tsx";
import AgeCategoryForm from "./AgeCategoryForm.tsx";

import {useSearch} from "../../components/context/SearchContext.tsx";



export type AgeCategoriesData = {
    ID: number;
    Title: string;
};
export type AgeCategoryFormData = {
    ID?: number;
    Title: string;
}



const AgeCategoriesPage = () => {

    const {closeModal, openModal, ModalComponent} = useModalManager();
    const [isAdding, setIsAdding] = useState(false);
    const [ageCategories, setAgeCategories] = useState<AgeCategoriesData []>([]);
    const [ageCategoryToEdit, setAgeCategoryToEdit] = useState<AgeCategoryFormData | null>(null);
    // const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const {search} = useSearch()



    // Загружаем список категорий на страницу
    const fetchAgeCategories = async () => {
        try {
            const response = await api.get(`v1/age-categories`);
            setAgeCategories(response.data as AgeCategoriesData[]);
            console.log(response.data)
        } catch (error) {
            console.log("Ошибка загрузки :", error)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        fetchAgeCategories().then();
    }, []);




    // const createAgeCategory = async (newCategory:AgeCategoryFormData) => {
    //     try {
    //         const response = await api.post("v1/age-categories", newCategory,
    //         {
    //             headers: {"Content-Type": "application/json"}
    //         })
    //         await fetchAgeCategories();
    //         return response.data;
    //     } catch (error) {
    //         console.error("Ошибка добавления новой категории ", error);
    //     }
    // }

    const saveAgeCategory = async (data:AgeCategoryFormData) => {
        try {
            const {ID, Title} = data;
            const payload={title: Title}
            const response =ID
                ? await api.put(`v1/age-categories/${ID}`, payload, {  //  если есть ID, то редактируем
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                : await api.post(`v1/age-categories`, payload, {  //если нет ID, создаем новый
                    headers: {"Content-Type": "application/json"}
                });

            await  fetchAgeCategories()
            return response.data;
        }catch (error) {
            console.log("",error)
        }
    }



    // Добавляем категорию
    const handleAdd = async () => {
        setAgeCategoryToEdit(null);// Очистить режим редактирования
        setIsAdding(true);// Включить режим добавления
    }

    useEffect(() => {
        if (ageCategoryToEdit) {
            setIsAdding(true); // используем ту же форму
        }
    }, [ageCategoryToEdit]);




    const deleteCategory = async (id: number) => {
      try{
          await api.delete(`v1/age-categories/${id}`,)

      }catch (err) {
          console.log("Ошибка удаления :",err)}
    };

const  handleEdit =(category:AgeCategoriesData)=> {
    setAgeCategoryToEdit({
        ID: category.ID,
        Title: category.Title,
    });// ;

    setIsAdding(false);
}





    if (loading) return <div>Загрузка списка возрастных категорий...</div>;


    return (
        <div>
            <div className="flex flex-grow">
                <SideBar/>
                <div className="flex-1  ">
                    <Header/>
                    <div className="relative w-[1190px] h-[2864px] bg-gray-50 rounded-xl mr-[250px] mt-[32px] ">
                        <BodyHeader
                            value={'Возрасты'}
                            count={ageCategories.length}
                            onClick={handleAdd}

                        />


                        {isAdding && (
                            <div>
                                <AgeCategoryForm
                                    key="new"
                                    initialData={ {Title:""}}
                                    onSubmit={saveAgeCategory}
                                    onClose={() => setIsAdding(false)}
                                   />
                                <button
                                    onClick={() => setIsAdding(false)}
                                    className="mt-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                                    Отмена
                                </button>

                            </div>
                        )}

                        { ageCategoryToEdit && (
                            <AgeCategoryForm
                                key={ageCategoryToEdit.ID}
                                id={ageCategoryToEdit.ID}
                                initialData={{Title: ageCategoryToEdit.Title}}
                                onSubmit={saveAgeCategory}
                                onClose={() => setAgeCategoryToEdit(null)}
                            />
                        )}
                        <ul>
                            {ageCategories.filter((ageCategory: AgeCategoriesData)=>{
                                return ageCategory.Title
                                    .toLowerCase()
                                    .includes(search.toLowerCase());
                            }
                            )
                                .map((ageCategory: AgeCategoriesData ) => (

                                <Lists
                                    key={ageCategory.ID}
                                    type="ageCategory"
                                    data={ageCategory}
                                    handleEdit={()=>handleEdit(ageCategory)}
                                    onDelete={()=>{
                                        openModal("delete", {
                                            label: `"${ageCategory.Title}"`,
                                            onConfirm: async () => {
                                                await deleteCategory(ageCategory.ID);
                                                // Удаляем выбранный элемент по ID
                                                setAgeCategories(((prev) => prev.filter((item) => item.ID !== ageCategory.ID)))
                                                closeModal()
                                            },
                                            closeModal,
                                        })
                                    }}
                            />
                            ))

                            }
                        </ul>

                         {/*Рендер модалки*/}

                        {ModalComponent}

                    </div>


                </div>
            </div>

        </div>
    );
};

export default AgeCategoriesPage;