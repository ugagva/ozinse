import SideBar from "../../components/sidebar'sElements/SideBar.tsx";
import Header from "../../components/page'sElements/Header.tsx";
import BodyHeader from "../../components/page'sElements/BodyHeader.tsx";

import EditSvgIcon from "../../Icons/EditSvgIcon.tsx";
import TrashSvgIcon from "../../Icons/TrashSvgIcon.tsx";
import { useEffect, useState} from "react";
import {useModalManager} from "../../components/Modals/useModalManager.tsx";
import {BASE_URL} from "../../utils/constants.js";





export type AgeCategoriesData = {
    Id: number;
    Title: string;
};



const AgeCategoriesPage = ({token}: { token: string }) => {


    const {closeModal, openModal, ModalComponent} = useModalManager();

    const [isAdding, setIsAdding] = useState(false);
    const [categoriesToEdit, setCategoriesToEdit] = useState<AgeCategoriesData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [ageCategories, setAgeCategories] = useState<Array<AgeCategoriesData>>([]);



    // Загружаем список категорий на страницу
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            const res = await fetch(`${BASE_URL}v1/age-categories`,   {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await res.json();
            setAgeCategories(data);
            setLoading(false);
            console.log(data);
        };
        fetchCategories().then();
    }, [token]);


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
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${BASE_URL}v1/age-categories/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error("Ошибка при удалении роли");
            return true;
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : String(err);
            setError(errorMessage);
            console.error(err);
            return false;
        } finally {
            setLoading(false);
        }
    };






//
// // const location = useLocation();
// // const roleToEdit = location.state?.role;
// //
    // Удаляем категорию через модалку
    const handleDelete =  (category:AgeCategoriesData) => {
      openModal("delete", {
          label: `${category.Title}?`,
          onConfirm: async () => {
              await deleteCategory(category.Id);
              setAgeCategories((prev) => prev.filter(id => id !== category.Id));
              closeModal();
          },
          closeModal,
      })
    }
const  handleEdit =(category:AgeCategoriesData)=> {

}

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


                        {/*{isAdding && (*/}
                        {/*    <div>*/}
                        {/*        <CategoryForm*/}
                        {/*            token={token}*/}
                        {/*            key="new"*/}
                        {/*            onSuccess={handleFormSuccessAdd}*/}
                        {/*        />*/}
                        {/*        <button*/}
                        {/*            onClick={() => setIsAdding(false)}*/}
                        {/*            className="mt-2 bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400">*/}
                        {/*            Отмена*/}
                        {/*        </button>*/}

                        {/*    </div>*/}
                        {/*)}*/}

                        {/*{categoriesToEdit && (*/}
                        {/*    <RoleForm*/}
                        {/*        key={`edit-${category.id}`}  // ключ зависит от id редактируемой роли*/}
                        {/*        token={token}*/}
                        {/*        initialData={categoriesToEdit}*/}
                        {/*        onSuccess={handleFormSuccessEdit}*/}
                        {/*    />*/}
                        {/*)}*/}

                        <ul>
                            {ageCategories.map((ageCategory, i) => (
                                <li key={i}
                                    className="relative w-[538px] h-[180px]  left-10 bg-white rounded-xl  transition-all p-2 mr-[48px] m-2">
                                    <p className="text-xl font-bold ">
                                        {ageCategory.Title}
                                    </p>



                                    <div className=" flex gap-1 absolute bottom-2 right-2">
                                        <button
                                            onClick={() => handleEdit(ageCategory,)}
                                            className=" text-white px-2 py-1 rounded hover:bg-blue-600"
                                        >
                                            <EditSvgIcon/>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(ageCategory,)}
                                            className=" text-black px-2 py-1 rounded hover:bg-red-600"
                                        >
                                            <TrashSvgIcon/>
                                        </button>
                                    </div>
                                </li>
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