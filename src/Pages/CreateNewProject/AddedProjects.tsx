import React, {useEffect, useState} from "react";

import arrow from "../../Icons/arrow-right.svg";
import arrowLeft from "/assets/detailsProjects/ArrowLeft.svg"
// import { NewProject } from "./ProjectStructure.tsx";

import {useNavigate} from "react-router-dom";

import SideBar from "../../components/sidebar'sElements/SideBar.tsx";
import Header from "../../components/page'sElements/Header.tsx";

import {BASE_URL} from "../../utils/constants.tsx";

import MainContentSection from "./Sections/MainContentSection.tsx";
import SwitcherSection from "../../components/switcher/SwitcherSection.tsx";
import VideoContentSection from "./Sections/VideoContentSection.tsx";
import ScreenshotsSection from "./Sections/ScreenshotsSection.tsx";
import ModalFactory from "../../components/Modals/ModalFactory.tsx";
import {useModalManager} from "../../components/Modals/useModalMeneger.tsx";

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
    durationInMins: number | null;
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
    }
}

const AddedProjects = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [ageCategories, setAgeCategories] = useState<AgeCategory[]>([]);
    const [projectTypes, setProjectTypes] = useState<ProjectType[]>([]);
    const [isFilledSection, setIsFilledSection] = useState(false);
    const { modalType,  openModal, closeModal, modalProps   } = useModalManager();


    const [newProject, setNewProject] = useState<NewProject>({
        title: "",
        categoryId: "",
        typeId: "",
        ageCategoryId: "",
        releaseYear: null,
        durationInMins: null,
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
        }
    });
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
        // formData.append("duration_in_mins", newProject.durationInMins.toString());
        formData.append("director", newProject.director);
        formData.append("producer", newProject.producer);
        formData.append("keywords", Array.isArray(newProject.keywords) ? newProject.keywords.join(", ") : newProject.keywords || "");

        formData.append("type_id", newProject.typeId.toString());


        // Массивы ( несколько ключей genre_ids, age_category_ids и т.д.)
        newProject.ageCategories.forEach((id) => formData.append("age_category_ids", id.toString()));
        newProject.genres.forEach((id) => formData.append("genre_ids", id.toString()));


        // Скриншоты  проходит по массиву и присваивает в ключ "screenshots"
        newProject.images.screenshots.forEach((screenshot) => {
            if (screenshot.type==="file" && screenshot.value instanceof File) {
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
            duration_in_mins: newProject.durationInMins,
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
        return result.id; // сервер вернёт { id: number }
    }

    // *****  Загрузка обложки
    const uploadCover = async (projectId: number, imageUrl: string, title: string) => {
        const payload = {
            cover: newProject.images.imageSrc
        }
        const formData = new FormData();
        const blob = await fetch(imageUrl).then(res => res.blob());
        const file = new File([blob], `${title}_coverImage.png`, {type: blob.type});

        formData.append("cover", file);
        const response = await fetch(`${BASE_URL}v1/projects/${projectId}/cover`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error("Ошибка загрузки обложки проекта!");
    };

    // Объединение в одну функцию
    const handleAddNewProject = async () => {

        try {
            setLoading(true);
            const projectId = await createProject();
            if (newProject.images.imageSrc) {
            await uploadCover(projectId, newProject.images.imageSrc, newProject.title);
            alert("Проект успешно создан и обложка загружена!");}


        }
        catch (error) {
            console.error("Ошибка при добавлении проекта:", error);
            alert("Произошла ошибка. Попробуйте снова.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setNewProject((prev) => ({
            ...prev,
            [name]: ['typeId', 'releaseYear', 'durationInMins'].includes(name)
                ? Number(value)
                : value,
        }));
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        openModal("added", {
            label: `проект “${newProject.title}”`,
            onConfirm: () => {
                console.log("✅ Подтверждено");
                closeModal();
                navigate("projects/");
            },
            closeModal,

        });


        e.preventDefault();
        await handleAddNewProject();



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
                                    className="h-auto justify-items-start items-start bg-white  m-4 p-4  mt-8 gap-2 rounded-xl ">
                                    <div className="flex justify-between items-start mb-4">

                                        <form
                                            className="w-auto p-3 m-2 rounded-2xl space-y-8">
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
                                                        isFilledSection={isFilledSection}
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
                                            {activeSection === sections[2] &&(
                                                <ScreenshotsSection
                                                    newProject={newProject}
                                                    screenshots={newProject.images.screenshots}
                                                    setIsFilledSection={setIsFilledSection}

                                                    setScreenshots={(ss)=>
                                                        setNewProject({
                                                            ...newProject,
                                                            images:{...newProject.images,screenshots:ss},
                                                        })
                                                    }
                                                    cover={newProject.images.imageSrc}   // значение
                                                    setCover={(cover)=>{
                                                        setNewProject({
                                                            ...newProject,
                                                            images:{...newProject.images,imageSrc:cover},

                                                        })
                                                    }

                                                    }
                                                />

                                            )


                                            }
                                            {isFilledSection ?
                                                (<button
                                                    onClick={handleSubmit}
                                                    type="button"
                                                    className="w-[134px] h-[38px]  bg-purple-300 px-4 py-2 rounded-2xl font-bold hover:bg-gray-400 text-white">
                                                    Добавить
                                                </button>) : (
                                                    <>
                                                    </>)
                                            }


                                            <div className="flex  justify-end  space-x-2 pt-4 m-2">
                                                <button
                                                    type="button"
                                                    className="w-[134px] h-[38px]  bg-gray-200 px-4  rounded-2xl font-bold hover:bg-gray-400"
                                                > Отмена
                                                </button>

                                                {activeSection === sections[1] && (
                                                    <div className="flex justify-end  space-x-2  ">
                                                        <button
                                                            onClick={handleReturn}
                                                            type="button"
                                                            className="w-[134px] h-[38px] bg-gray-200 px-4 py-2 rounded-2xl font-bold hover:bg-purple-400 "
                                                        > Назад
                                                        </button>

                                                        <button
                                                            onClick={handleSkip}
                                                            type="button"
                                                            className="w-[134px] h-[38px]  bg-purple-300 px-4 py-2 rounded-2xl font-bold hover:bg-gray-400 text-white"
                                                        > Далее
                                                        </button>

                                                    </div>
                                                )
                                                }
                                                { activeSection ! === sections[2] &&(
                                                    <div>
                                                        <button
                                                            onClick={handleReturn}
                                                            type="button"
                                                            className="w-[134px] h-[38px] bg-gray-200 px-4 py-2 rounded-2xl font-bold hover:bg-purple-400 "
                                                        > Назад
                                                        </button>

                                                    </div>
                                                )
                                                }
                                                {activeSection === sections[0] &&
                                                    (<div className="flex justify-end  space-x-2  ">
                                                        <button
                                                            onClick={handleSkip}
                                                            type="button"
                                                            className="w-[134px] h-[38px]  bg-purple-300 px-4 py-2 rounded-2xl font-bold hover:bg-gray-400 text-white"
                                                        > Далее
                                                        </button>
                                                    </div>)
                                                }

                                            </div>
                                            {
                                                modalType && modalProps && (
                                                    <ModalFactory
                                                        type={modalType}
                                                        modalProps={modalProps}
                                                    />
                                                )
                                            }


                                            <div className="flex justify-end  space-x-2 pt-4 ">
                                                {/*<button*/}
                                                {/*    onClick={handleReturn}*/}
                                                {/*    type="button"*/}
                                                {/*    className="w-[134px] h-[38px] bg-gray-200 px-4 py-2 rounded-2xl font-bold hover:bg-purple-400 "*/}
                                                {/*>*/}
                                                {/*    Назад*/}
                                                {/*</button>*/}

                                                {/*<button*/}
                                                {/*    type="button"*/}
                                                {/*    className="w-[134px] h-[38px]  bg-gray-200 px-4 py-2 rounded-2xl font-bold hover:bg-gray-400"*/}
                                                {/*> Отмена*/}
                                                {/*</button>*/}
                                            </div>
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