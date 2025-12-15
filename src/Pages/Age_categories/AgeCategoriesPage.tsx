import SideBar from "../../components/sidebar'sElements/SideBar.tsx";
import Header from "../../components/page'sElements/Header.tsx";
import BodyHeader from "../../components/page'sElements/BodyHeader.tsx";


import { useEffect, useState} from "react";
import {useModalManager} from "../../components/Modals/useModalManager.tsx";


import api from "../../featechers/api/api.tsx";
import Lists from "../Lists.tsx";
import AgeCategoryForm from "./AgeCategoryForm.tsx";



export type AgeCategoriesData = {
    ID: number;
    Title: string;
};

const AgeCategoriesPage = () => {

    const {closeModal, openModal, ModalComponent} = useModalManager();

    const [isAdding, setIsAdding] = useState(false);
    const [categoriesToEdit, setCategoriesToEdit] = useState<AgeCategoriesData | null>(null);
    // const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [ageCategories, setAgeCategories] = useState<Array<AgeCategoriesData>>([]);



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
        fetchAgeCategories().then()
    }, []);





    useEffect(() => {
        fetchAgeCategories().then();
    }, []);




    const createAgeCategory = async (newCategory:AgeCategoriesData) => {
        try {
            const response = await api.post("v1/age-categories", newCategory,
            {
                headers: {"Content-Type": "application/json"}
            })
            await fetchAgeCategories();
            return response.data;
        } catch (error) {
            console.error("Ошибка добавления новой категории ", error);
        }
    }
    // Добавляем категорию
    const handleAdd = async () => {
        // Очистить режим редактирования
        setCategoriesToEdit(null);
        // Включить режим добавления
        setIsAdding(true);
    }

    useEffect(() => {
        if (categoriesToEdit) {
            setIsAdding(true); // используем ту же форму
        }
    }, [categoriesToEdit]);



    // const getCategories = useCallback( async () :Promise<CategoriesData> => {
 //    setLoading(true);
 //    setError(null);
 //     const res = await fetch(`${BASE_URL}v1/age-categories`,{
 //         method: "GET",
 //         headers: {
 //             Authorization: `Bearer ${token}`
 //         }
 //     });
 //     if (!res.ok) throw new Error("Ошибка при получении ролей");
 //     const data: CategoriesData[] = await res.json();
 //     setCategories(data)
 //
 // },[token])


    const deleteCategory = async (id: number) => {
      try{
          await api.delete(`v1/age-categories/${id}`,)

      }catch (err) {
          console.log("Ошибка удаления :",err)}
    };







const  handleEdit =(category:AgeCategoriesData)=> {
    setCategoriesToEdit({ID: category.ID,
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
                            onClick={handleAdd}

                        />


                        {isAdding && (
                            <div>
                                <AgeCategoryForm
                                    key="new"
                                    initialData={ {Title:""}}
                                    onSubmit={createAgeCategory}
                                    onClose={() => setIsAdding(false)}
                                    // image={image}
                                    // setImage={setImage}
                                />
                                <button
                                    onClick={() => setIsAdding(false)}
                                    className="mt-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">
                                    Отмена
                                </button>

                            </div>
                        )}

                        {/*{categoriesToEdit && (*/}
                        {/*    <GenreForm */}
                        {/*        key={}*/}
                        {/*        id={genreToEdit.ID}*/}
                        {/*        initialData={{Title:genreToEdit.Title}}*/}
                        {/*        onSubmit={createGenre}*/}
                        {/*        onClose={() => setGenreToEdit(null)}*/}
                        {/*        image={image}*/}
                        {/*        setImage={setImage}*/}
                        {/*    />*/}
                        {/*)}*/}

                        <ul>
                            {ageCategories.map((ageCategory ) => (

                                <Lists
                                    key={ageCategory.ID}
                                    type=" ageCategory"
                                    data={ageCategory}
                                    handleEdit={()=>handleEdit(ageCategory)}
                                    onDelete={()=>{
                                        openModal("delete", {
                                            label: `жанр "${ageCategory.Title}"`,
                                            onConfirm: async () => {
                                                await deleteCategory(ageCategory.ID);
                                                setAgeCategories(((prev) => prev.filter((ageCategory) => ageCategory.ID !== ageCategory.ID)))// здесь удаляем выбранный жанр
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