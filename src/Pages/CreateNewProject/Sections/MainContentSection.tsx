import React, {Dispatch, SetStateAction, useCallback, useEffect,} from "react";
import {NewProject} from "../ProjectStructure.tsx";

interface ProjectType {
    ID: number;
    Title: string;
}

interface Genre {
    ID: number;
    Title: string;
}

interface AgeCategory {
    ID: number;
    Title: string;
}


interface MainSectionProps {

    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    newProject: NewProject;
    genres: Genre[];
    ageCategories: AgeCategory[];
    projectTypes: ProjectType [];
    isFilledSection?: Dispatch<SetStateAction<Record<string, boolean>>>
    setIsFilledSection?: ((value: (((prevState: Record<string, boolean>) => Record<string, boolean>) | Record<string, boolean>)) => void);
    setNewProject: Dispatch<SetStateAction<NewProject>>
}




const MainSection:
    React.FC<MainSectionProps> = ({
                                      handleChange,
                                      newProject,
                                      genres,
                                      ageCategories,
                                      projectTypes,
                                      setIsFilledSection,
                                      setNewProject,

                                  }) => {

    const inputBaseStyle = "w-full bg-gray-100 p-3 rounded-xl border border-gray-100  hover:border-blue-500  focus:outline-none focus:border-blue-600 ";

    const checkFilled = (value: string | number | string[] | number[] | null | undefined) => {
        if (typeof value === 'number') {
            return value > 0;
        }
        if (Array.isArray(value)) {
            return value.length > 0;
        }
        if (typeof value === 'string') {
            return value.trim() !== '';
        }
        return false;
    };


    const checkIfFilled = useCallback(() => {
        const valuesToCheck = [
            newProject.title,
            newProject.typeId,
            newProject.releaseYear,
            newProject.durationInMins,
            newProject.keywords,
            newProject.description,
            newProject.director,
            newProject.producer,
            newProject.genres,
            newProject.ageCategories
        ];

        const checkResults = valuesToCheck.map(checkFilled);
        console.log("Поля проекта:", valuesToCheck);
        console.log("Результаты проверки:", checkResults);


        const isAllFilled = checkResults.every(Boolean);
        console.log("Все поля заполнены?", isAllFilled);
        setIsFilledSection?.(prev=>({
            ...prev,
            "Информация о проекте":isAllFilled,
        }));
    }, [newProject, setIsFilledSection]);

    useEffect(() => {
        checkIfFilled();
    }, [checkIfFilled]);


    return (
        <div className="space-y-4">

            {/* Название */}

            <input
                type="text"
                name="title"
                placeholder="Название проекта"
                value={newProject.title}
                onChange={handleChange}
                className={inputBaseStyle}
            />


            <select
                name="typeId"
                value={newProject.typeId}
                onChange={handleChange}
                className={inputBaseStyle}
            >
                <option value="">Тип проекта</option>
                {projectTypes.map((type) => (
                    <option key={type.ID} value={type.ID.toString()}>
                        {type.Title}
                    </option>
                ))}
            </select>

            {/* Год выпуска */}
            <input
                type="number"
                name="releaseYear"
                placeholder="Год"
                value={newProject.releaseYear ?? ''}
                onChange={handleChange}
                className={inputBaseStyle}
            />

            {/* Длительность */}

            <input
                type="number"
                name="durationInMins"
                placeholder="Хронометраж (мин)"
                value={newProject.durationInMins ?? ''}
                onChange={handleChange}
                className={inputBaseStyle}
            />

            {/* Ключевые слова */}

            <input
                type="text"
                name="keywords"
                placeholder="Ключевые слова"
                value={newProject.keywords}
                onChange={handleChange}
                className={inputBaseStyle}
            />


            {/* Жанры */}
            <select
                multiple
                value={newProject.genres.map(String)}
                onChange={(e) => {
                    const selectedGenres = Array.from(e.target.selectedOptions, (option) => Number(option.value));
                    console.log("Выбранные жанры:", selectedGenres);
                    setNewProject((prev) => ({
                        ...prev,
                        genres: selectedGenres
                    }))
                }}
                className={inputBaseStyle}
            >
                <option value="">Жанр</option>
                {genres.map((genre) => (
                    <option key={genre.ID} value={genre.ID.toString()}>
                        {genre.Title}
                    </option>
                ))}
            </select>
            {/* Возрастные категории */}
            <select
                multiple
                value={newProject.ageCategories.map(String)}
                onChange={(e) =>
                    setNewProject((prev) => ({
                        ...prev,
                        ageCategories: Array.from(e.target.selectedOptions, (option) => Number(option.value)),
                    }))
                }
                className={inputBaseStyle}
            >
                <option value="">Возрастная категория</option>
                {ageCategories.map((cat) => (
                    <option key={cat.ID} value={cat.ID.toString()}>
                        {cat.Title}
                    </option>
                ))}
            </select>
            {/* Описание */}
            <textarea
                name="description"
                placeholder="Добавьте описание"
                value={newProject.description}
                onChange={handleChange}
                className={inputBaseStyle}
            />
            {/* Режиссёр */}
            <input
                type="text"
                name="director"
                placeholder="Режиссер"
                value={newProject.director}
                onChange={handleChange}
                className={inputBaseStyle}
            />
            {/* Продюсер */}
            <input
                type="text"
                name="producer"
                placeholder="Продюсер"
                value={newProject.producer}
                onChange={handleChange}
                className={inputBaseStyle}
            />

            {/* Обложка */}

            {/*<input*/}
            {/*    type="text"*/}
            {/*    placeholder=""*/}
            {/*    name="imageSrc"*/}
            {/*    value={newProject.images.imageSrc}*/}
            {/*    onChange={(e) =>*/}
            {/*        setNewProject((prev) => ({*/}
            {/*            ...prev,*/}
            {/*            images: {...prev.images, imageSrc: e.target.value},*/}
            {/*        }))*/}
            {/*    }*/}
            {/*    className={inputBaseStyle}*/}
            {/*/>*/}

        </div>
    );
};

export default MainSection;
