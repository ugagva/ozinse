import SideBar from "../components/sidebar'sElements/SideBar.tsx";
import Header from "../components/page'sElements/Header.tsx";


import {useContext} from "react";



import BodyHeader from "../components/page'sElements/BodyHeader.tsx";
import VideoListContext from "../components/context/VideoListProvider.tsx";
import {useModalManager} from "../components/Modals/useModalManager.tsx";
import {useNavigate} from "react-router-dom";
import ProjectCardItem from "../components/listsElements/ProjectCardItem.tsx";



const ProjectsPage = () => {
    const navigate = useNavigate();
    const {videoItems, loading, deleteVideoItem, } = useContext(VideoListContext)
    const {    openModal, closeModal, ModalComponent  } = useModalManager();





    const handleAddProject = async () => {
     navigate("/projects/add");
    };

    if (loading) return <p>Загрузка страницы со списком проектов...</p>;





    return (
        <div className=" flex flex-grow  ">
            <SideBar/>
            <div className="flex-1  ">
                <Header/>

                <div className="relative w-[1190px] h-[2864px] bg-gray-50 rounded-xl mr-[250px] mt-[32px] ">

                    <BodyHeader
                        value={'Проекты'}
                        onClick={handleAddProject}/>

                    <div className="flex flex-wrap mt-[80px] mb-[14px]  ">


                        {videoItems.length === 0 ? (
                                <p className="text-center w-full">Нет доступных проектов.</p>
                            ) :
                            (Array.isArray(videoItems) && videoItems.map((videoItem) => (
                                <ProjectCardItem key={videoItem.id}
                                    {...videoItem}
                                           onDelete={() => {
                                               openModal("delete", {
                                                   label: `проект “${videoItem.title}”`,
                                                   onConfirm: () => {
                                                       deleteVideoItem(videoItem.id);   // здесь удаляем выбранный проект
                                                       closeModal();
                                                   },
                                                   closeModal,
                                               });
                                           }}
                                />
                                )
                            )
                           )
                        }


                    </div>
                    {/* Рендерим модалку только если она открыта и props у неё есть */}

                    {  ModalComponent}
                </div>

            </div>

        </div>
    );
};

export default ProjectsPage;

type Genre = {
    ID: number;
    Title: string;
};

type AgeCategory = {
    ID: number;
    Title: string;
};

type Cover = {
    ID: string;
    CreatedAt: string;
    UpdatedAt: string;
    ProjectID: number;
};

type VideoType = {
    ID: number;
    Title: string;
};

export type ProjectCardItemType = {
    id: number,
    created_at: string,
    updated_at: string,
    title: string,
    description: string,
    type: VideoType,
    release_year: number,
    director: string,
    producer: string,
    keywords: string,
    cover: Cover,
    genres: Genre[],
    age_categories: AgeCategory[],
    images: string,
    videos: [],

};

