import CrossSvgIcon from "../../Icons/CrossIcon.tsx";
import {useNavigate,} from "react-router-dom";

import React, {useEffect, useState} from "react";

import BaseButton from "../../components/elements/BaseButton.tsx";
import {GenreFormData, GenresData} from "./GenresPage.tsx";

interface GenreFormProps {
    id: number,
    initialData?: { Title: string },
    onSuccess?: (data: GenresData) => void;
    onClose?: () => void,
    onSubmit?: (newGenre: GenreFormData) => Promise<any>
}


const GenreForm = ({initialData, id, onSuccess, onClose, onSubmit}: GenreFormProps) => {
    const navigate = useNavigate();


    const [genre, setGenre] = useState<GenreFormData>({
        Title: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            loadGenreData(id).then()
        }
    }, []);


    const loadGenreData = async (genreId: string) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/genres/${genreId}`);
            const data = await response.json();
            setGenre(data); // <-- заполняем форму
        } catch (error) {
            console.error("Ошибка при загрузке жанра", error);
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = async () => {
        if (!genre) return;

        if (id) {
            await fetch(`/api/genres/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(genre),
            });
        } else {
            await fetch(`/api/genres`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(genre),
            });
        }

        navigate("/genres");
    };

    if (loading) return <div>Loading...</div>;


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setGenre(prev => ({
            ...prev,
            [name]: value
        }));
    }


    return (
        <div className=" fixed inset-0 z-50 flex items-center justify-center bg-[#898989] bg-opacity-50  ">

            <div className="flex  flex-col bg-white rounded-xl p-1 w-[574px] h-[700px] ">
                <h2 className="text-lg  font-bold  mt-[10px] ml-[24px]">
                    {"Добавить жанр"}
                </h2>
                {/*<button*/}
                {/*    className="my-[22px] mr-[24px]"*/}
                {/*    onClick={() => navigate(`/genres`)}*/}
                {/*>*/}
                {/*    <CrossSvgIcon/>*/}
                {/*</button>*/}

                {genre && (
                    <input
                        type="text"
                        name="name"
                        value={genre.Title}
                        onChange={handleChange}
                        className="border p-2 mt-4 w-full"
                    />
                )}

                <div className="flex items-center justify-center m-2 p-4 gap-1">
                    <BaseButton
                        className="flex justify-center items-center bg-[#7E2DFC] w-[134px] h-[38px] opasity-2 rounded-[16px] hover:bg-blue-800    text-center text-white font-bold text-sm  "
                        title="Добавить"
                        onClick={onSubmit}
                    >
                    </BaseButton>

                    <button
                        type="button"
                        className="w-[134px] h-[38px]  rounded-xl bg-[#8F92A11A] text-black  font-bold rounded hover:bg-gray-200"
                        onClick={onClose}> Отмена
                    </button>

                </div>


            </div>

        </div>
    );
};

export default GenreForm;
