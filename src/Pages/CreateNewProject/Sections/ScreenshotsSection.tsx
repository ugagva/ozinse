import React, {ChangeEvent, useState} from "react";
import TrashSvgIcon from "../../../Icons/TrashSvgIcon.tsx";


// interface ScreenshotsSectionProps {
//     isFilledSection?: boolean,
//
// }
type Screenshot = {
    type: "file" | "url";
    value: File | string;

}

interface ScreenshotsSectionProps {
    screenshots: Screenshot[]
    setScreenshots: (screenshot: Screenshot[]) => void;
    setCover: (cover: string) => void; // 👈для обложки
}

const ScreenshotsSection = ({screenshots, setScreenshots, setCover}: ScreenshotsSectionProps) => {
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



    return (

        <div>
            {/* Обложка */}
            <div className="mb-4">
                <label className="block text-sm font-bold mb-2">Обложка проекта</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="border p-2 rounded w-full"
                />

                {/* превью */}
                <div className="mt-2">
                    {setCover && (
                        <img
                            src={typeof setCover === "string" ? setCover : ""}
                            alt="Превью обложки"
                            className="w-full h-56 object-cover rounded"
                        />
                    )}
                </div>
            </div>
            <div className="mt-6  p-4">
                <h1 className="text-2xl font-bold mb-4">Скриншоты</h1>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Введите URL-адрес картинки"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    <button
                        type="button"
                        onClick={handleAddUrl}
                        className="bg-blue-600 text-white px-4 py-2 rounded-2xl"
                    >
                        Добавить
                    </button>
                </div>


                {/* Загрузка файлов */}
                <div className="mb-4">
                    <input type="file" accept="image/*" multiple onChange={handleFileChange}/>
                </div>

                {/* Превью */}
                <div className=" grid grid-cols-4  gap-4 ">


                    {screenshots.map((s, i) => {
                            const src = s.type === "url" ? (s.value as string) : URL.createObjectURL(s.value as File);
                            return (
                                <div key={i}
                                     className="group relative rounded-xl overflow-hidden shadow w-auto h-[108px] m-3">

                                    <img
                                        className="w-full h-full  object-cover   "
                                        src={src}
                                        alt={`screenshot-${i}`}
                                    />
                                    {/* Полупрозрачный overlay при hover */}
                                    <div
                                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>
                                    <button
                                        type="button"
                                        onClick={() => handleRemove(i)}
                                        className="absolute top-2 right-2 bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center z-20
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-200"
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
};

export default ScreenshotsSection;