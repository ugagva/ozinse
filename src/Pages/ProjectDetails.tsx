import {useContext, useEffect, useState,} from "react";

import {useNavigate, useParams} from "react-router-dom";

import api from "../featechers/api/api.tsx";
import SideBar from "../components/sidebar'sElements/SideBar.tsx";
import Header from "../components/page'sElements/Header.tsx";
import clapperIcon from "/assets/detailsProjects/clapperIcon.svg"
import tv from "/assets/detailsProjects/info_categories.svg"
import {useModalManager} from "../components/Modals/useModalMeneger.tsx";
import VideoListContext from "../components/context/VideoListProvider.tsx";
import ModalFactory from "../components/Modals/ModalFactory.tsx";
import TrashSvgIcon from "../Icons/TrashSvgIcon.tsx";
import arrow from "../Icons/arrow-right.svg";
import EyeSvgIcon from "../Icons/EyeSvgIcon.tsx";
import ShareIcon from "../Icons/ShareIcon.tsx";
import StarIcon from "../Icons/StarIcon.tsx";
import ClockSvgIcon from "../Icons/ClockSvgIcon.tsx";
import {formatDate} from "../utils/formateDate.tsx";

import {mockSeries} from "../mocks/mockSeriesProject.tsx";
import SeriesPlayer from "../components/videoPlayer/SeriesPlayer.tsx";


type videoItemDetailsType = {

    id: number;
    title: string;
    description: string;
    director: string;
    producer: string;
    release_year: number;
    keywords: string;
    created_at: string;
    updated_at: string;
    duration_in_mins: number;
    type: {
        Id: number;
        Title: string;
    };
    age_categories: {
        Id: number;
        Title: string;
    }[];
    genres: {
        Id: number;
        Title: string;
    }[];
    cover: {
        Id: string;
        ProjectID: number;
        CreatedAt: string;
        UpdatedAt: string;
    };
    images: {
        id: string;
        projectID: number;
        createdAt: string;
        updatedAt: string;
    }[];
    videos: {
        id: string;
        projectID: number;
        season: number;
        serie: number;
        createdAt: string;
        updatedAt: string;
    }[];
}
// export  type  VideoData = {
//     id: number;
//     projectId: number;
//     url: string;
//     title: string;
//     description: string;
//     duration: number;
//     thumbnail: string;
//     format: string;
//     resolution: string;
//     createdAt: string;
// }

interface Series {
    seasonCount: number;
    series: {
        seasonId: number;
        series: number;
        movieId: string;
        title: string;
        url: string;
        thumbnail: string;
    }[];
}

interface ProjectType {
    id: number;
    title: string;
    type: string; // например: "Сериал"
    series: Series;
}

const ProjectDetails = () => {
    const navigate = useNavigate();
    const {projectId} = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [videoItemDetails, setVideoItemDetails] = useState<videoItemDetailsType | null>(null)
    const [images, setImages] = useState("")
    const {modalType, openModal, closeModal, modalProps} = useModalManager();
    const {deleteVideoItem,} = useContext(VideoListContext);
    const [mockVideo, setMockVideo] = useState<ProjectType | null>(null);
    const [selectedSeason] = useState(1);
    const [selectedEpisode] = useState(1);

    const screenshots = Array.from({length: 8}, (_, i) => i + 1);


    useEffect(() => {
        const getProjectDetails = async (id: number) => {
            setLoading(true);
            try {
                const response = await api.get(`v1/projects/${id}`);
                setVideoItemDetails(response.data as videoItemDetailsType);
                return response.data;
            } catch (error) {
                console.log("Ошибка открытия проекта:", error)
            } finally {
                setLoading(false)
            }
        };

        if (projectId) {
            getProjectDetails(parseInt(projectId)).catch(console.error);
        }
    }, [projectId,]);


    useEffect(() => {
        let isMounted = true;
        let objectUrl: string | null = null;
        const fetchImage = async (projectId: number) => {
            try {
                const response = await api.get(`/v1/projects/images/${projectId}`, {
                    responseType: "blob"
                });
                const blob = response?.data;

                if (!blob || typeof blob.type !== "string" || !blob.type.startsWith("image/")) {
                    throw new Error(`Неверный или пустой blob: ${blob?.type}`);
                }

                objectUrl = URL.createObjectURL(blob);
                if (isMounted) {
                    setImages(objectUrl);
                }
                console.log("Ответ сервера (blob):", response);
            } catch (error) {
                console.error("Ошибка загрузки изображения:", error);
                if (isMounted) {
                    setImages("/assets/detailsProjects/coverImage2.png");
                }
            }
        };


        if (videoItemDetails) {

            if (videoItemDetails.images != null) {
                fetchImage(Number(projectId));
            } else {
                setImages("/assets/detailsProjects/coverImage2.png");
            }
        }
        return () => {
            isMounted = false;
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [videoItemDetails, projectId]);


    useEffect(() => {
        setMockVideo(mockSeries);
        setLoading(false);

    }, [])
    const currentEpisode = mockVideo ? mockVideo.series.series.find(
            (ep) =>
                ep.seasonId === selectedSeason &&
                ep.series === selectedEpisode
        )
        : null;

    // const fetchVideo = async (projectId: string | undefined) => {
    //     if(!projectId) {
    //         console.warn("projectId не найден");
    //         return;
    //     }
    //     try {
    //         const response = await api.get(`/v1/projects/videos/${projectId}`);
    //         setVideoData(response.data.result); //
    //
    //         console.log(response.data)
    //
    //     } catch (error) {
    //         console.error("Ошибка загрузки видео", error);
    //     }
    // };
    //
    // if (!videoItemDetails) return;
    //
    //
    // fetchVideo(projectId).then();

    // }, [videoItemDetails,projectId]);


    if (loading) {
        return <div>Загрузка данных проекта{videoItemDetails?.title}</div>;
    }
    if (!videoItemDetails) {
        return <div>Проект не найден </div>;
    }

// Деструктуризация,
    const {
        title,
        description,
        director,
        producer,
        release_year,
        created_at,
        updated_at,
        cover,
        type,
        duration_in_mins

    } = videoItemDetails;

    return (
        <div className="flex w-full ">
            <SideBar/>

            {/* Центр + правая панель */}
            <div className="flex w-full   ">
                {/* Центр */}
                <div className=" flex w-full  bg-white ">
                    <div className="mt-[-10px] ">
                        <Header/>
                        {/*/* Центр*/}
                        <div className="flex flex-row w-full ">
                            <div className="flex-1 w-[872px] bg-gray-50 rounded-2xl mt-10  ">
                                <div className="flex relative gap-4   px-[48px] pt-[40px] ">
                                    <button className="text-sm text-[#8F92A1] font-Roboto font-normal "
                                            onClick={() => navigate("/projects")}>Проекты
                                    </button>
                                    <img src={arrow} alt="arrow"/>
                                    <h2 className="font-Roboto font-bold text-sm">{title}</h2>
                                </div>
                                {/* Контент проекта */}
                                <div
                                    className="w-full max-w-[824px] justify-center items-center bg-white mx-auto p-8  mt-8 gap-2 rounded-xl ">
                                    {/* Левая часть: заголовок + иконки */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className=" flex-col ">
                                            <h1 className="  text-[22px] font-bold mb-0 ">{title}</h1>
                                            <div className="flex items-center text-gray-400 gap-2 mt-1 ">
                                                <EyeSvgIcon/>10329
                                                <StarIcon/>4
                                                <ShareIcon/>43
                                            </div>
                                        </div>
                                        {/* Правая часть: кнопки в одну строку */}
                                        <div className="ml-auto flex items-center gap-2">
                                            <button
                                                className="ml-auto flex   bg-[#F3F6F8] hover:bg-gray-600  px-4 py-2 rounded-xl transition"
                                                onClick={() => navigate(`/projects/edit/${projectId}`)}
                                            > Редактировать
                                            </button>
                                            <button
                                                className="flex  justify-center items-center bg-[#DE350B] w-[36px] h-[36px] rounded-2xl"
                                                onClick={() =>
                                                    openModal("delete", {
                                                        label: `проект “${videoItemDetails.title}”`,
                                                        onConfirm: () => {
                                                            deleteVideoItem(videoItemDetails.id);   // удаляем выбранный проект
                                                            closeModal();
                                                            navigate("/projects");
                                                        },
                                                        closeModal,
                                                    })
                                                }
                                            >
                                                <TrashSvgIcon className=" w-[20px] h-[20px] text-white fill-current"/>
                                            </button>
                                        </div>
                                    </div>
                                    {/*Видео*/}
                                    <div className="flex justify-center items-center p-2 mt-6  ">
                                        <div className="w-full  ">
                                            {mockVideo && currentEpisode && mockVideo.type === "Сериал" && (
                                                <div className="w-full">
                                                    <SeriesPlayer
                                                        videos={mockVideo}
                                                    />
                                                </div>
                                            )}
                                        </div>


                                    </div>

                                    <div className=" border-b border-[#8F92A1] border-dotted "></div>

                                    <div className="mt-6 ">
                                        <h2 className="text-xl font-semibold mb-4">Описание</h2>
                                        <p className="text-base text-gray-800 mt-6 ">{description}</p>
                                    </div>
                                    <div className="flex  items-center mb-4 gap-2 mt-4">
                                        <p className="text-sm text-gray-600">Режиссёр:</p>
                                        <h3 className="text-lg font-medium">{director}</h3>
                                    </div>
                                    <div className=" flex items-center gap-2 mb-4 mt-4">
                                        <p className="text-sm text-gray-600">Продюсер:</p>
                                        <h3 className="text-lg font-medium">{producer}</h3>
                                    </div>
                                    <div>

                                    </div>
                                    <div className=" border-b border-[#8F92A1] border-dotted "></div>

                                    <div className="mt-6  p-4">
                                        <h1 className="text-2xl font-bold mb-4">Скриншоты</h1>
                                        <div className=" grid grid-cols-4 gap-4 gap-4">

                                            {screenshots.map((i) => (
                                                    <div key={i}
                                                         className="rounded-xl overflow-hidden shadow w-[178px] h-[108px]">
                                                        <img
                                                            className="w-full h-full object-cover "
                                                            src={`https://picsum.photos/seed/image${i}/178/108`}
                                                            alt={`screenshot-${i}`}
                                                        />
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>


                                </div>
                            </div>

                            {/*Правый сайдбар*/}
                            <aside className="shrink-0 w-[254px] bg-white rounded-2xl mt-10 m-4 p-2  ">
                                <div className="space-y-4 text-sm text-gray-700">
                                    {/* Год релиза */}
                                    <div className="flex items-center gap-2">
                                        <ClockSvgIcon/>
                                        <h4>{release_year} год</h4>
                                    </div>

                                    {/*  */}
                                    <div className="flex items-center gap-2">
                                        <img src={tv} alt="television" className="w-5 h-5"/>
                                        <h4 className="font-medium">
                                            {(type.Title)}
                                        </h4>
                                    </div>
                                    {/* Длительность */}
                                    <div className="flex items-center gap-2">
                                        <img src={clapperIcon} alt="" className="w-5 h-5"/>
                                        {type.Title === "Mwltserïal" ? (
                                            <h4>
                                                {duration_in_mins} мин
                                            </h4>
                                        ) : (
                                            <h4>{duration_in_mins} мин</h4>
                                        )}
                                    </div>
                                    {/* Картинка */}
                                    <div className="">
                                        <img src={images} alt="" className="w-[150px] h-[220px] rounded-xl"/>
                                    </div>
                                    {/* Метаданные */}
                                    <div className=" pt-4 space-y-2 text-m  font-Roboto">
                                        <div className="flex flex-row ">
                                            <h4 className="font-semibold text-gray-400">Добавил: </h4>
                                            <h4>{cover.CreatedAt}</h4>
                                        </div>
                                        <div className="flex flex-row   gap-1">
                                            <h4 className="font-semibold text-gray-400">Дата добавления: </h4>
                                            <h3 className="font-semibold text-black">{formatDate(created_at)}</h3>
                                        </div>
                                        <div className="flex flex-row gap-1  ">
                                            <h4 className="font-semibold text-gray-400">Дата обновления: </h4>
                                            <h3 className="font-semibold text-black ">{formatDate(updated_at)}</h3>

                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>

            </div>
            {modalType && modalProps && (
                <ModalFactory type={modalType} modalProps={modalProps}/>
            )}
        </div>
    );
};

export default ProjectDetails;