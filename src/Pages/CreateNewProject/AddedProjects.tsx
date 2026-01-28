import React, {useEffect, useState} from "react";

import arrow from "../../Icons/arrow-right.svg";
import arrowLeft from "/assets/detailsProjects/ArrowLeft.svg"


import {useNavigate, useParams} from "react-router-dom";

import SideBar from "../../components/sidebar'sElements/SideBar.tsx";
import Header from "../../components/page'sElements/Header.tsx";

import {BASE_URL} from "../../utils/constants.tsx";

import MainContentSection from "./Sections/MainContentSection.tsx";
import SwitcherSection from "../../components/switcher/SwitcherSection.tsx";
import VideoContentSection from "./Sections/VideoContentSection.tsx";
import ScreenshotsSection from "./Sections/ScreenshotsSection.tsx";

import {useModalManager} from "../../components/Modals/useModalManager.tsx";

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

interface UploadEpisodes {
    seasonId: number;
    episode: number;
    videoLink: string;
}
// interface Cover {
//     id: number;
// }
interface Screenshot {
    type: "file" | "url";
    value: File | string;
}

interface NewProject {
    title: string;
    categoryId: string;
    typeId: string;
    ageCategoryId: string;
    releaseYear: number | null;
    durationInMints: number | null;
    keywords: string;
    description: string;
    director: string;
    producer: string;
    ageCategories: number[];
    genres: number[];
    images: {
        imageSrc: string;
        screenshots: Screenshot[];
    };
    views: null,
    video: {
        seasonCount: number,
        episodes: UploadEpisodes[];
    },



}


const AddedProjects = () => {
    const navigate = useNavigate();
    const { projectId } = useParams<{projectId?: string}>(); // если есть → режим редактирования
    const isEditMode = Boolean(projectId);


    const [loading, setLoading] = useState(false);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [ageCategories, setAgeCategories] = useState<AgeCategory[]>([]);
    const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
    const [isFilledSection, setIsFilledSection] = useState<Record<string, boolean>>(
        {
            "Информация о проекте": false,
            "Видео": false,
            "Обложка и скриншоты": false,
        }
    );
    const {openModal, closeModal, ModalComponent} = useModalManager();


    const [newProject, setNewProject] = useState<NewProject>({
        title: "",
        categoryId: "",
        typeId: "",
        ageCategoryId: "",
        releaseYear: null,
        durationInMints: null,
        keywords: "",
        description: "",
        director: "",
        producer: "",
        genres: [],
        ageCategories: [],
        images: {
            imageSrc: "",
            screenshots: [],
        },

        views: null,
        video: {
            seasonCount: 1,
            episodes: []
        },



    });

    // ✅ Загрузка существующего проекта при редактировании
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!projectId) return; // создание нового проекта
        fetch(`${BASE_URL}/v1/projects/${projectId}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => setNewProject({
                title: data.title,

                description: data.description,
                typeId: data.type_id,
                releaseYear: data.release_year,
                durationInMints: data.duration_in_mins,
                director: data.director,
                producer: data.producer,
                keywords: data.keywords,
                ageCategories: data.age_category_ids,
                genres: data.genre_ids,
                images: { imageSrc: data.cover || "", screenshots: [] },
                cover: data.cover ? { id: data.cover_id } : null,
            }));

    }, [projectId]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setNewProject((prev) => ({
            ...prev,
            [name]: ['typeId', 'releaseYear', 'durationInMints'].includes(name)
                ? Number(value)
                : value,
        }));

    };
    const handleUpdateProject = async (id: number) => {
        const token = localStorage.getItem("token")

        if (!projectId || isNaN(Number(projectId))) {
            alert("Неверный ID проекта для редактирования");
            return;
        }

        const numericProjectId = Number(projectId);
        const numericTypeId = Number(newProject.typeId);
        const numericReleaseYear = Number(newProject.releaseYear);
        const numericDuration = Number(newProject.durationInMints);

        if (isNaN(numericTypeId)) {
            alert("Выберите корректный тип проекта");
            return;
        }

        if (isNaN(numericReleaseYear)) {
            alert("Введите корректный год выпуска");
            return;
        }

        if (isNaN(numericDuration)) {
            alert("Введите корректную длительность проекта");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                title: newProject.title,
                description: newProject.description,
                release_year: Number(newProject.releaseYear),
                duration_in_mints: Number(newProject.durationInMints),
                director: newProject.director,
                producer: newProject.producer,
                keywords: Array.isArray(newProject.keywords)
                    ? newProject.keywords
                    : (newProject.keywords || ""),
                type_id:  numericTypeId,
                age_category_ids: newProject.ageCategories,
                genre_ids: newProject.genres,
            };

            // 2️⃣ Отправляем PATCH-запрос на сервер для обновления проекта
            const response = await fetch(`${BASE_URL}v1/projects/${numericProjectId}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });



            const updatedProject = await response.json();
            console.log("Проект обновлён:", updatedProject);

            // 3️⃣ Если есть новая обложка, загружаем её
            if (newProject.images?.imageSrc) {
                const blob = await (await fetch(newProject.images.imageSrc)).blob();
                const file = new File([blob], `${newProject.title}_cover.png`, { type: "image/png" });

                const coverResponse = await uploadCoverFile(numericProjectId, file);
                const imageId = coverResponse?.id;

                if (imageId) {
                    await setCoverForProject(numericProjectId, imageId);

                    setNewProject(prev => ({
                        ...prev,
                        cover: { id: imageId },
                    }));

                    console.log("Обложка обновлена, imageId:", imageId);
                }
            }
            // Модалка
            openModal("update", {
                label: `Изменения в проекте “${newProject.title}” сохранены!`,
                onConfirm: () => {
                    closeModal();
                    navigate(`/projects/${id}`);
                },
                closeModal,
            });



        } catch (error) {
            console.error("Ошибка при обновлении:", error);
            alert("❌ Не удалось обновить проект");
        } finally {
            setLoading(false);
        }
    };




    //  Получение типов, жанров,возрастных категорий
    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchData = async () => {
            try {
                const [genresRes, ageRes, typesRes] = await Promise.all([
                    fetch(`${BASE_URL}v1/genres`, {headers: {Authorization: `Bearer ${token}`}}),
                    fetch(`${BASE_URL}v1/age-categories`, {headers: {Authorization: `Bearer ${token}`}}),
                    fetch(`${BASE_URL}v1/types`, {headers: {Authorization: `Bearer ${token}`,},})
                ]);
                if (!genresRes.ok || !ageRes.ok || !typesRes.ok) Error("Ошибка при загрузке справочников");

                const genresDataRaw = await genresRes.json();
                const ageDataRaw = await ageRes.json();
                const typesDataRaw = await typesRes.json();

                // Преобразуем поля с заглавных в нижний регистр
                const genresData = genresDataRaw.map((g: { ID: string, Title: string }) => ({
                    ID: g.ID,
                    Title: g.Title,
                }));

                const ageData = ageDataRaw.map((a: { ID: string, Title: string }) => ({
                    ID: a.ID,
                    Title: a.Title,
                }));
                const typesData = typesDataRaw.map((a: { ID: string, Title: string }) => ({
                    ID: a.ID,
                    Title: a.Title,
                }));
                setGenres(genresData);
                setAgeCategories(ageData);
                setProjectTypes(typesData)
            } catch (error) {
                console.error("Ошибка при загрузке справочников:", error);
            }
        }
        fetchData().then(); //  Получение типов, жанров,возрастных категорий
    }, []);

    // Создание нового проекта
    const createProject = async () => {
        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("title", newProject.title); // "ключ" , "значение"
        formData.append("description", newProject.description);
        // formData.append("release_year", newProject.releaseYear.toString());
        // formData.append("duration_in_mints", newProject.durationInMints.toString());
        formData.append("director", newProject.director);
        formData.append("producer", newProject.producer);
        formData.append("keywords", Array.isArray(newProject.keywords) ? newProject.keywords.join(", ") : newProject.keywords || "");

        formData.append("type_id", newProject.typeId.toString());


        // Массивы ( несколько ключей genre_ids, age_category_ids и т.д.)
        newProject.ageCategories.forEach((id) => formData.append("age_category_ids", id.toString()));
        newProject.genres.forEach((id) => formData.append("genre_ids", id.toString()));


        // Скриншоты  проходит по массиву и присваивает в ключ "screenshots"
        newProject.images.screenshots.forEach((screenshot) => {
            if (screenshot.type === "file" && screenshot.value instanceof File) {
                formData.append("screenshots", screenshot.value);
            }
            if (screenshot.type === "url" && typeof screenshot.value === "string") {
                formData.append("screenshotUrls", screenshot.value);
            }
        });

        // Эпизоды (видео)
        newProject.video.episodes.forEach((episode) => {
            formData.append("episode_links[]", episode.videoLink);
            formData.append("episode_seasons[]", String(episode.seasonId));
            formData.append("episode_numbers[]", String(episode.episode));
        });

        const payload = {
            title: newProject.title,
            description: newProject.description,
            release_year: newProject.releaseYear,
            duration_in_mints: newProject.durationInMints,
            director: newProject.director,
            producer: newProject.producer,
            keywords: Array.isArray(newProject.keywords)
                ? newProject.keywords
                : (newProject.keywords || ""),
            type_id: newProject.typeId,

            age_category_ids: newProject.ageCategories,   // массив чисел
            genre_ids: newProject.genres,                 // массив чисел

            // episode_links: newProject.video.episodes.map(ep => ep.videoLink),
            // episode_seasons: newProject.video.episodes.map(ep => ep.seasonId),
            // episode_numbers: newProject.video.episodes.map(ep => ep.episode)// или не отправлять вообще
        };

        const response = await fetch(`${BASE_URL}v1/projects`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        console.log("payload:", formData);
        if (!response.ok) throw new Error("Ошибка создания проекта");

        const result = await response.json();
        console.log("Ответ от сервера:", result); // 👉 { id: 24 }
        return result.id; // сервер вернёт { id: number }
    }

    // *****  Загрузка обложки
    const uploadCoverFile = async (projectId: number, file: File) => {
        const formData = new FormData();
        const token = localStorage.getItem("token");
        formData.append("image", file);

        const response = await fetch(`${BASE_URL}v1/projects/${projectId}/cover`, {
            method: "POST",
            headers: {'Authorization': `Bearer ${token}`}, //
            body: formData
        });

        if (!response.ok) throw new Error("Ошибка загрузки cover файла");
        const data = await response.json();
        return data.id; // это id изображения
    };

    const setCoverForProject = async (projectId: number, imageId: string) => {
        const payload = {
            image_id: imageId
        }

        const response = await fetch(`${BASE_URL}v1/projects/${projectId}/cover`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error("Ошибка загрузки обложки проекта!");
        const data = await response.json();
        return data; //
    };

    // Объединение в одну функцию
    const handleAddNewProject = async () => {
        try {
            setLoading(true);
            const projectId = await createProject();
            console.log("Создан проект с id:", projectId);

            let imageId: string | undefined;
            if (newProject.images?.imageSrc) {

                // Преобразуем base64 в Blob и создаём File
                const blob = await (await fetch(newProject.images.imageSrc)).blob();

                // создаём File с нужным MIME type
                const file = new File([blob], `${newProject.title}_cover.png`, {type: "image/png"});
                console.log("✅ Обложка успешно загружена");

                // Загружаем файл файл на сервер через POST → получаем image_id

                const coverResponse=await uploadCoverFile(projectId, file);
                console.log("Файл обложки загружен, imageId:",coverResponse);
                // ⚠️ Сохраняем imageId
                imageId = coverResponse?.id;
            }

            // 3️⃣ Ставим cover через PATCH, если есть imageId
            if (imageId) {
                await setCoverForProject(projectId, imageId);

                //    Сохраняем cover.id в state
                setNewProject(prev => ({
                    ...prev,
                    cover: {id: imageId}, // ✅ проверка isCoverFilled сработает
                }));

                alert("Проект успешно создан и обложка загружена!");
            }
            return projectId; // ✅ возвращаем id, чтобы handleSubmit мог его использовать
        } catch (error) {

            console.error("Ошибка при добавлении проекта:", error);
            alert("Произошла ошибка. Попробуйте снова.");
            return null;
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // 1️⃣ Сначала создаём проект и получаем его id
        const projectId = await handleAddNewProject();

        // 2️⃣ Если проект успешно создан — переходим на страницу проекта
        if (isEditMode && isNaN(Number(projectId))) {

            await handleUpdateProject(projectId);
        } else {
            // Сначала модалка
            openModal("added", {
                label: ` “${newProject.title}” успешно добавлен!`,
                onConfirm: () => {
                    console.log("✅ Подтверждено");
                    closeModal();
                    navigate(`projects/${projectId}`);// навигация после подтверждения
                },
                closeModal,

            });
            setTimeout(() => {
                closeModal();
                navigate(`/projects/${projectId}`);
            }, 2000);

        }

    };
    const handleCancelClick = () => {
        openModal("cancel", {
            onConfirm: () => {
                console.log("✅ Отменено");
                closeModal();
                navigate(`/projects`);
            },
            closeModal,
        });
    };




    const sections = ["Информация о проекте", "Видео", "Обложка и скриншоты"];

    const [activeSection, setActiveSection] = useState("Информация о проекте");

    const handleSkip = () => {
        const currentIndex = sections.indexOf(activeSection);
        setActiveSection(sections[currentIndex + 1]);
    };

    const handleReturn = () => {
        const currentIndex = sections.indexOf(activeSection);
        setActiveSection(sections[currentIndex - 1]);
    };


    if (loading) {
        return <p>Запись созданного проекта...</p>;
    }

    return (
        <div className="flex w-full ">
            <SideBar/>
            <div className="flex w-full   ">

                <div className=" flex w-full  ">
                    <div className="mt-[-10px] ">
                        <Header/>

                        <div className="flex flex-row   ">
                            <div className=" w-[872px] h-[2864px]  bg-gray-50 rounded-3xl mt-10 p-2 ">
                                <div className="flex  gap-4   px-[48px] pt-[40px] ">
                                    <button className="text-sm text-[#8F92A1] font-Roboto font-normal "
                                            onClick={() => navigate("/projects")}>Проекты
                                    </button>
                                    <img src={arrow} alt="arrow"/>
                                    <h2 className="font-Roboto font-bold text-sm">Добавить проект</h2>
                                </div>

                                {/* Контент нового проекта */}
                                <div
                                    className= " h-auto justify-items-start items-start bg-white  m-4 p-4  mt-8 gap-2 rounded-xl ">
                                    <div className="flex justify-between items-start mb-4">

                                        <form
                                            className="flex flex-col h-full p-3 m-2 rounded-2xl space-y-8">
                                            <div className=" flex justify-start w-full gap-4 p-2  ">
                                                <button onClick={() => navigate("/projects")}>
                                                    <img src={arrowLeft} alt="arrow"
                                                         className="bg-gray-100 rounded-l space-y-8"/>
                                                </button>
                                                <h1 className="text-2xl font-bold font-Roboto ">{activeSection}</h1>
                                            </div>
                                            {/* Переключатель  */}

                                            {<SwitcherSection sections={sections} onActive={setActiveSection}/>}


                                            {activeSection === "Информация о проекте" &&
                                                (genres.length > 0 && ageCategories.length > 0 && (
                                                    <MainContentSection
                                                        handleChange={handleChange}
                                                        genres={genres}
                                                        ageCategories={ageCategories}
                                                        projectTypes={projectTypes}
                                                        newProject={newProject}
                                                        setNewProject={setNewProject}
                                                        setIsFilledSection={setIsFilledSection}

                                                    />
                                                ))
                                            }


                                            {/*секиця с видео*/}
                                            {activeSection === sections[1] &&
                                                <VideoContentSection
                                                    project={newProject}
                                                    setProject={setNewProject}
                                                    setIsFilledSection={setIsFilledSection}
                                                />
                                            }

                                            {/*секиця с обложкой и  скриншотами*/}
                                            {activeSection === sections[2] && (
                                                <ScreenshotsSection
                                                    newProject={newProject}
                                                    screenshots={newProject.images.screenshots}
                                                    setIsFilledSection={setIsFilledSection}

                                                    setScreenshots={(ss) =>
                                                        setNewProject({
                                                            ...newProject,
                                                            images: {...newProject.images, screenshots: ss},
                                                        })
                                                    }
                                                    cover={newProject.images.imageSrc}   // значение
                                                    setCover={(cover) => {
                                                        setNewProject({
                                                            ...newProject,
                                                            images: {...newProject.images, imageSrc: cover},

                                                        })
                                                    }

                                                    }
                                                />

                                            )


                                            }


                                            <div className="flex justify-between items-center  space-x-2 pt-4 m-2">

                                                {/*{activeSection === sections[0] &&*/}
                                                {/*    (<div className="flex space-x-2  ">*/}
                                                {/*     */}
                                                {/*    </div>)*/}
                                                {/*}*/}


                                                {(activeSection === sections[1] || activeSection === sections[2]) && (
                                                    <div className="flex justify-start space-x-2  ">
                                                        <div className=" ">
                                                            <button
                                                                onClick={handleReturn}
                                                                type="button"
                                                                className=" w-[134px] h-[38px] bg-gray-200 px-4 py-2 rounded-2xl font-bold hover:bg-purple-400 "
                                                            > Назад
                                                            </button>
                                                        </div>


                                                    </div>
                                                )
                                                }

                                                {/*{activeSection === sections[2] && (*/}
                                                {/*    <div className="flex justify-start  space-x-2">*/}
                                                {/*        <button*/}
                                                {/*            onClick={handleReturn}*/}
                                                {/*            type="button"*/}
                                                {/*            className="w-[134px] h-[38px] bg-gray-200 px-4 py-2 rounded-2xl font-bold hover:bg-purple-400 "*/}
                                                {/*        > Назад*/}
                                                {/*        </button>*/}
                                                {/*    </div>*/}
                                                {/*)*/}

                                                {/*}*/}

                                                {activeSection === sections[sections.length - 1] && isFilledSection["Обложка и скриншоты"] ?
                                                    (<button
                                                        onClick={handleSubmit}
                                                        type="button"
                                                        className="w-[134px] h-[38px]  bg-purple-300 px-4 py-2 rounded-2xl font-bold hover:bg-gray-400 text-white">
                                                        Добавить
                                                    </button>) : null
                                                }
                                                <div className=" flex gap-3 justify-end flex-1">
                                                    {(activeSection === sections[0] || activeSection === sections[1]) && (
                                                        <button
                                                            onClick={handleSkip}
                                                            type="button"
                                                            className="w-[134px] h-[38px]  bg-purple-300 px-4 py-2 rounded-2xl font-bold hover:bg-gray-400 text-white"
                                                        > Далее
                                                        </button>
                                                    )
                                                    }
                                                    <button
                                                        type="button"
                                                        className="w-[134px] h-[38px]  bg-gray-200 px-4  rounded-2xl font-bold hover:bg-gray-400"
                                                     onClick={handleCancelClick}
                                                    > Отмена
                                                    </button>
                                                </div>

                                            </div>
                                            {ModalComponent}


                                        </form>


                                    </div>
                                </div>


                            </div>
                        </div>


                    </div>
                </div>
            </div>


        </div>
    );
}


export default AddedProjects;