import React, {ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import TrashSvgIcon from "../../../Icons/TrashSvgIcon.tsx";
import {Upload} from "lucide-react";
import {NewProject} from "../ProjectStructure.tsx";

// interface ScreenshotsSectionProps {
//     isFilledSection?: boolean,
//
// }
type Screenshot = {
    type: "file" | "url";
    value: File | string;

}

interface ScreenshotsSectionProps {
    newProject: NewProject;
    screenshots: Screenshot[],
    setScreenshots: (screenshot: Screenshot[]) => void,
    setCover: (cover: string) => void,
    cover?: string,
    setIsFilledSection?: Dispatch<SetStateAction<Record<string, boolean>>>,
}


const ScreenshotsSection = ({
                                screenshots,
                                newProject,
                                setScreenshots,
                                setCover,
                                cover,
                                setIsFilledSection
                            }: ScreenshotsSectionProps) => {
        const [url, setUrl] = useState("");


        // Добавление файлов
        const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
                const newFiles = Array.from(e.target.files).map((file) => ({
                    type: "file" as const,
                    value: file,
                }));
                setScreenshots([...screenshots, ...newFiles]);
            }
        };

        // Добавление URL
        const handleAddUrl = () => {
            if (url.trim()) {
                setScreenshots([...screenshots, {type: "url", value: url.trim()}]);
                setUrl("");
            }
        };

        // Удаление
        const handleRemove = (index: number) => {
            setScreenshots(screenshots.filter((_, i) => i !== index));
        };

        // загрузка обложки
        const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files[0]) {
                const file = e.target.files[0];
                const reader = new FileReader();

                reader.onloadend = () => {
                    setCover(reader.result as string); // base64 строка
                };

                reader.readAsDataURL(file);
            }
        };
        // Удаление обложки
        const handleRemoveCover = () => {
            setCover(""); //  сбрасываем в пустую строку
        };


        const checkIfFilled = useCallback(() => {
            // проверка  обложки
            const isCoverFilled = !!newProject.images.imageSrc;
            // проверка скриншотов
            const isScreenshotsFilled =
                Array.isArray(newProject.images.screenshots) &&
                newProject.images.screenshots.length > 0;
            // финальная проверка
            const isAllFilled = isCoverFilled && isScreenshotsFilled;

            console.log("cover заполнен?", isCoverFilled);
            console.log("screenshots заполнены?", isScreenshotsFilled);
            console.log("Все поля заполнены?", isAllFilled);
            setIsFilledSection?.(prev => ({
                ...prev,
                "Обложка и скриншоты": isAllFilled,
            }));
        }, [newProject, setIsFilledSection]);


        useEffect(() => {
            checkIfFilled();
        }, [checkIfFilled]);


        return (
            <div className=" flex w-full ">
                <div className="w-full mx-auto gap-4 flex flex-col  relative ">

                    {/* Обложка */}

                    <h1 className=" text-2xl font-bold mb-4">Обложка</h1>
                    <p className="text-m "> Рекомендуется использовать картинки размером не менее 375×550px</p>

                    <div className="mt-2 relative flex flex-col  items-center justify-center w-full   ">
                        <label
                            htmlFor="cover-upload"
                            className="flex flex-col items-center justify-center w-[760px] h-[200px] border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">

                            {cover ? (
                                // превью если обложка выбрана
                                <div className=" relative w-[150px] h-[220px] rounded-xl overflow-hidden">
                                    <img
                                        src={cover}
                                        alt="Превью обложки"
                                        className="absolute inset-0 w-full h-full  "
                                    />
                                    {/*Кнопка удаления*/}
                                    <button
                                        type="button"
                                        onClick={handleRemoveCover}
                                        className="absolute top-2 right-2  bg-[#FFFFFF66]  bg-opacity-60 text-white rounded-full p-1 hover:bg-opacity-80"
                                    >
                                        <TrashSvgIcon className="w-4 h-4 "/>
                                    </button>
                                </div>
                            ) : (
                                // иконка + текст если обложка не выбрана
                                <>
                                    <Upload className="w-10 h-10 text-gray-400"/>

                                    <span className="mt-2 text-sm text-gray-500">Перетищите картинку или  <span
                                        className="text-blue-600">загрузите</span></span>
                                </>
                            )}
                        </label>


                        <input
                            id="cover-upload"
                            type="file"
                            accept="image/*"
                            placeholder="Перетащите картинку или загрузите"
                            onChange={handleCoverChange}   // Запись картинки
                            className=" hidden  w-auto h-auto  object-cover rounded-2xl border-2 border-dashed border-gray-200 p-2 rounded "

                        />

                    </div>
                    {/*  СКРИНШОТЫ  */}
                    <h1 className="text-2xl font-bold mb-4">Скриншоты</h1>
                    <p className="text-m "> Рекомендуется использовать картинки размером не менее 400×226px</p>

                    <div
                        className="flex flex-col items-center justify-center relative object-cover  w-[760px] h-[200px] border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50">

                        <Upload className="w-10 h-10 text-gray-400"/>
                        <div className="flex flex-col  items-center justify-center ">


                            <span className="mt-2 text-sm text-gray-500">Перетищите картинку или  <span
                                className="text-blue-600">загрузите</span></span>


                            <input
                                type="text"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                className="hidden  mx-auto rounded-2xl border-2 border-dashed border-gray-200   p-2 rounded "
                            />

                            <button
                                type="button"
                                onClick={handleAddUrl}
                                className="bg-blue-600 text-white px-4 py-2 rounded-2xl hidden hover:bg-opacity-80 "
                            >
                                Добавить
                            </button>
                        </div>


                        {/* Загрузка файлов */}
                        <div className="mb-4 ">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}/>
                        </div>



                    </div>
                    {/* Превью */}
                    <div className=" grid grid-cols-4  gap-4 ">

                        {screenshots.map((s, i) => {
                                const src = s.type === "url" ? (s.value as string) : URL.createObjectURL(s.value as File);
                                return (
                                    <div key={i}
                                         className="group relative rounded-xl  shadow w-auto h-[108px] m-3">

                                        <img
                                            className=" rounded-xl overflow-hidden w-full h-full object-cover  "
                                            src={src}
                                            alt={`screenshot-${i}`}
                                        />

                                        {/* Полупрозрачный overlay при hover */}
                                        <div
                                            className="absolute inset-0  "/>
                                        <button
                                            type="button"
                                            onClick={() => handleRemove(i)}
                                            className="absolute top-2 right-2  bg-[#FFFFFF66] text-[ #171717CC] rounded-full w-6 h-6 flex items-center justify-center
                                        "
                                        >
                                            <TrashSvgIcon className="w-4 h-4  "/>

                                        </button>


                                    </div>
                                )
                            }
                        )}

                    </div>
                </div>
            </div>

        )
            ;
    }
;

export default ScreenshotsSection;