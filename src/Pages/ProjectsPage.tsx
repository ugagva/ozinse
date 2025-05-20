import SideBar from "../components/sidebar'sElements/SideBar.tsx";
import Header from "../components/page'sElements/Header.tsx";


import {useContext, } from "react";


import VideoItem from "../components/listsElements/VideoItem.tsx";
import BodyHeader from "../components/page'sElements/BodyHeader.tsx";
import VideoListContext from "../components/context/VideoListProvider.tsx";
import {useModalManager} from "../components/Modals/useModalMeneger.tsx";
import ModalFactory from "../components/Modals/ModalFactory.tsx";



const ProjectsPage = () => {

    const {videoItems, loading, deleteVideoItem,} = useContext(VideoListContext)
    const { modalType,  openModal, closeModal, modalProps  } = useModalManager();

    if (loading) return <p>Загрузка страницы со списком проектов...</p>;

    return (
        <div className=" flex flex-grow  ">
            <SideBar/>
            <div className="flex-1  ">
                <Header/>

                <div className="relative w-[1190px] h-[2864px] bg-gray-50 rounded-xl mr-[250px] mt-[32px] ">
                    <BodyHeader value={'Проекты'}/>

                    <div className="flex flex-wrap mt-[80px] mb-[14px]  ">

                        {videoItems.length === 0 ? (
                                <p className="text-center w-full">Нет доступных проектов.</p>
                            ) :
                            (Array.isArray(videoItems) && videoItems.map((videoItem) => (
                                <VideoItem key={videoItem.id}
                                    {...videoItem}
                                           onDelete={() => {
                                               openModal("delete", {
                                                   label: `проект “${videoItem.title}”`,
                                                   onConfirm: () => {
                                                       deleteVideoItem(videoItem.id);   // здесь удаляем именно выбранный проект
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

                    {
                        modalType && modalProps && (
                        <ModalFactory
                            type={modalType}
                            modalProps={modalProps}
                        />
                        )
                    }
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

export type VideoItemType = {
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
    videos: string,

};