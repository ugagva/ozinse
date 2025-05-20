import React, {createContext, useEffect, useState} from 'react';
import api from "../../featechers/api/api.tsx";
import {VideoItemType} from "../../Pages/ProjectsPage.tsx";



type Props = {
    children: React.ReactNode;
}


interface VideoListContextType {
    videoItems: VideoItemType[];

    loading: boolean;
    deleteVideoItem: (id: number) => void,
    addVideoItem: (newItem:FormData) => Promise<void>,
    updateVideoItem: (id:number, updatedProject:FormData) =>Promise<void>,

}

const VideoListContext =createContext<VideoListContextType>({
    loading: true,
    videoItems:[],

    deleteVideoItem(): void {},
    addVideoItem: async ()=>  {},
    updateVideoItem: async ()=>  {},


})

export  const VideoListProvider = ({children}:Props) => {

    const [videoItems, setVideoItems] = useState<VideoItemType[]>([])

    const [loading, setLoading] = useState<boolean>(true)



                                                          // ** Получаем список проектов
    const fetchVideoItems = async () => {
            try {
                const response = await api.get(`v1/projects`);
                setVideoItems(response.data as VideoItemType[]);

                console.log(response.data)
            } catch (error) {
                console.log("Ошибка загрузки видео:", error)
            } finally
            {setLoading(false)}
        };


                                              // Загрузка одного проекта





    // ** Добваляем новый  проект
    const addVideoItem = async (newItem:FormData) => {
        try {
            const response = await api.post("v1/projects", newItem, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            await fetchVideoItems(); // перезагружаем
            return response.data;
        } catch (error) {
            console.error("Ошибка добавления проекта:", error);
        }
    };

    const updateVideoItem = async (id:number, updatedProject:FormData) => {
        try {
            await api.patch(`v1/projects/${id}`, updatedProject, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            await fetchVideoItems();
        } catch (error) {
            console.error("Ошибка обновления проекта:", error);
        }
    };

    const deleteVideoItem = async (id:number) => {
        try {
            await api.delete(`v1/projects/${id}`);
            await fetchVideoItems();
        } catch (error) {
            console.error("Ошибка удаления проекта:", error);
        }
    };

    useEffect(() => {
        fetchVideoItems().then()

    }, []);





    return (
        <VideoListContext.Provider value={{videoItems,loading, addVideoItem, deleteVideoItem, updateVideoItem, }}>
                {children}
        </VideoListContext.Provider>

    );
};

export default VideoListContext;