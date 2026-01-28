import Header from "../../components/page'sElements/Header.tsx";

import {useContext} from "react";
import VideoListContext from "../../components/context/VideoListProvider.tsx";
import {useModalManager} from "../../components/Modals/useModalManager.tsx";
import SideBar from "../../components/sidebar'sElements/SideBar.tsx";
import BodyHeader from "../../components/page'sElements/BodyHeader.tsx";


import ProjectCardItem from "../../components/listsElements/ProjectCardItem.tsx";



const ProjectsOnMain = () => {

    const {videoItems, loading,  mainProjects, setMainProjects} = useContext(VideoListContext)
    const {  openModal, closeModal, ModalComponent} = useModalManager();


    const handleAddProject = async () => {

            // 🔹 исключаем уже добавленные проекты
            const availableForAdding = videoItems.filter(
                (project) => !mainProjects.includes(project.id)
            );
            // показываем модалку вместо навигации

            openModal('addOnMain', {
                label: 'Добавить проект на главную',
                availableProjects: availableForAdding.map((v) => ({
                        id: v.id,
                        title: v.title   // передаем доступные проекты
                    })
                ),
                onChange: (selectedIds: number[]) => {
                    setMainProjects(prev => [...prev, ...selectedIds]);
                },
                onConfirm: (selectedIds: number[]) => {
                    setMainProjects(prev => [...prev, ...selectedIds]);
                    closeModal();
                },
                closeModal
            });

    };

    // 🔹 Фильтрация по флагу
    const filteredItems = videoItems.filter(item => mainProjects.includes(item.id));

    if (loading) return <p>Загрузка проектов на главной странице...</p>;


    return (
        <div className=" flex flex-grow  ">
            <SideBar/>
            <div className="flex-1  ">
                <Header/>

                <div className="relative w-[1190px] h-[2864px] bg-gray-50 rounded-xl mr-[250px] mt-[32px] ">
                    <BodyHeader
                        value={'Проекты на главной'}
                        count={videoItems.length}
                        onClick={handleAddProject}
                    />

                    <div className="flex flex-wrap mt-[80px] mb-[14px]  ">
                        {filteredItems.length === 0 ? (
                            <p className="text-center w-full">На главной старнице нет проектов. </p>)
                        :
                            ( Array.isArray(filteredItems) && filteredItems.map((videoItem) =>(

                                <ProjectCardItem key={videoItem.id}
                                                 {...videoItem}
                                                 onDelete={() => {
                                                     openModal("delete", {
                                                         label: ` “${videoItem.title}” с главной страницы`,
                                                         onConfirm: () => {
                                                             setMainProjects(prev => prev.filter(id => id !== videoItem.id))  // здесь удаляем выбранный проект с главной стр.
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

                    { ModalComponent  }
                </div>

            </div>

        </div>
    );
};

export default ProjectsOnMain;