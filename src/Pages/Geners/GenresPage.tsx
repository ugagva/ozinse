import Header from "../../components/page'sElements/Header.tsx";
import BodyHeader from "../../components/page'sElements/BodyHeader.tsx";

import SideBar from "../../components/sidebar'sElements/SideBar.tsx";
import {useEffect, useState} from "react";

import Lists from "../Lists.tsx";
import {useModalManager} from "../../components/Modals/useModalManager.tsx";
import api from "../../featechers/api/api.tsx";

import GenreForm from "./GenreForm.tsx";


export type GenresData = {
    ID: number;
    Title: string;
}
export type GenreFormData = {
    ID?: number;
    Title: string;
};

const GenresPage = () => {
    const [loading, setLoading] = useState(true);
    const [genres, setGenres] = useState<GenresData[]>([])
    const {openModal, closeModal, ModalComponent} = useModalManager();
    const [genreToEdit, setGenreToEdit] = useState<GenreFormData | null>(null);
    const [isAdding, setIsAdding] = useState(false);



    // Загружаем список жанров на страницу!!!
    const fetchGenres = async () => {
        try {
            const response = await api.get(`v1/genres`);
            setGenres(response.data as GenresData[]);
            console.log(response.data)
        } catch (error) {
            console.log("Ошибка загрузки жанров:", error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchGenres().then()
    }, []);


    // Добавляем новый
    const createGenre = async (newGenre: GenreFormData) => {
        try {
            const response = await api.post("v1/genres", newGenre, {
                headers: {"Content-Type": "application/json"}
            })
            await fetchGenres();
            return response.data;
        } catch (error) {
            console.error("Ошибка добавления жанра", error);
        }
    }

    //
    const updateGenre = async (id: number, updatedGenre: GenreFormData) => {
        try {
            await api.patch(`v1/genres/${id}`, updatedGenre, {
                headers: {"Content-Type": "application/json"}
            });
            await fetchGenres();
        } catch (error) {
            console.error("Ошибка обновления жанра:", error);
        }
    };


    const handleGenreSuccessAdd = (newGenre: GenresData & { id: number }) => {
        setGenres((prev) => [...prev, newGenre]);
        setIsAdding(false);
    };

    const handleGenreSuccessEdit = (updated: GenresData & { id: number }) => {
        setGenres((prev) =>
            prev.map((g) => (g.ID === updated.ID ? updated : g))
        );
        setGenreToEdit(null);
    };

// Добавляем
    const handleAdd = () => {
        setIsAdding(true);
        setGenreToEdit(null);
    }
// Редактируем
    const handleEdit = (genre: GenresData) => {
        setGenreToEdit(genre);
        setIsAdding(false);
    };


    // Удаляем жанр
    const handleDelete = async (id: number) => {
        try {
            await api.delete(`v1/genres/${id}`);

        } catch (error) {
            console.error("Ошибка удаления проекта:", error);
        }
    };
    const closeForm = () => setFormState(null);


    return (
        <div>
            <div className="flex flex-grow">
                <SideBar/>
                <div className="flex-1  ">
                    <Header/>
                    <div className="relative w-[1190px] h-[2864px] bg-gray-50 rounded-xl mr-[250px] mt-[32px] ">

                        <BodyHeader
                            value={'Жанры'}
                            onClick={handleAdd}

                        />

                        {isAdding && (
                            <GenreForm
                                key="new"
                                initialData={ {Title:""}}
                                onSubmit={createGenre}

                                onClose={() => setIsAdding(false)}

                                onSuccess={handleGenreSuccessAdd}
                            />
                        )}
                        {genreToEdit &&(
                            <GenreForm
                                key={}


                                />
                        )}

                        <ul>
                            {genres.map((genre,) => (
                                <Lists key={genre.ID}
                                       value={genre}
                                       onDelete={() => {
                                           openModal("delete", {
                                                   label: `жанр "${genre.Title}"`,
                                                   onConfirm: async () => {
                                                       await handleDelete(genre.ID);
                                                       setGenres(((prev) => prev.filter((g) => g.ID !== genre.ID)))// здесь удаляем выбранный жанр
                                                       closeModal()
                                                   },
                                                   closeModal,
                                               }
                                           )
                                       }}
                                       handleEdit={() => handleEdit(genre)}>

                                </Lists>

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

}
export default GenresPage;