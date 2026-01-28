import EditSvgIcon from "../../Icons/EditSvgIcon.tsx";
import TrashSvgIcon from "../../Icons/TrashSvgIcon.tsx";
import EyeSvgIcon from "../../Icons/EyeSvgIcon.tsx";


import {FC, MouseEvent,} from "react";


import {ProjectCardItemType} from "../../Pages/ProjectsPage.tsx";
import {useNavigate} from "react-router-dom";


type Props = ProjectCardItemType & {
    onDelete: () => void;
};


const ProjectCardItem: FC<Props> = ({id, age_categories, images, genres = [], title, onDelete,}) => {

    const navigate = useNavigate()

    const genre = ((genres ?? []).map((genre) => genre.Title));
    const ages = ((age_categories ?? []).map((ages) => ages.Title)) || [];

    const handleItemClick = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        navigate(`/projects/${id}`);
    };

    const handleEdit = (e: MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/projects/edit/${id}`);
    };





    return (
        <div
            className="relative w-[250px] h-[500px]  left-10 bg-white rounded-lg shadow hover:shadow-lg transition-all p-4 mr-[28px] mb-6 overflow-hidden">

            {/*Возрастные категории*/}
            <div className="absolute top-6 left-4 flex flex-wrap m-1 gap-1 p-2 z-10">
                <span className="bg-black bg-opacity-40 text-white text-xs px-3 py-2 rounded-md">
            {ages.join(',')}
          </span>
            </div>
            {/*Обложка */}

            {/* Обёртка картинки */}
            <div className="overflow-hidden rounded-xl w-full h-[320px]">
                <img
                    className="w-full h-full object-cover cursor-pointer"
                    src={images}
                    onClick={handleItemClick}
                />
            </div>

            {/* Название */}
            <h2 className="mt-3 text-base font-semibold font-Roboto line-clamp-2"

            >{title}</h2>

            Жанры
            <div className="flex flex-wrap gap-1 mt-1">
                {genre.length > 0 && (
                    <span className="text-gray-700 text-xs px-1 py-1 ">
                    {genre.join(" • ")}

                    </span>
                )
                }


            </div>


            {/* Кнопки управления */  }
            <div >
            <div className=" bottom-2 right-1 flex flex-wrap gap-1 py-2 ">
                <EyeSvgIcon/>
            </div>

            <div className="absolute bottom-2 right-2 flex flex-wrap gap-2">

                <button className="p-1 rounded-full " onClick={onDelete}>
                    <TrashSvgIcon className="text-red-500  hover:text-red-700"  />
                </button>
                <button className="p-1 hover:text-blue-500 rounded-full" onClick={handleEdit}>
                    <EditSvgIcon className="text-gray-500  hover:text-blue-500" />
                </button>
            </div>
            </div>
        </div>

    );

};

export default ProjectCardItem;