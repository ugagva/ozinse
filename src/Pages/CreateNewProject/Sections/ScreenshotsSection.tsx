import {useState} from "react";


interface ScreenshotsSectionProps {
    isFilledSection?: boolean,
    setIsFilledSection?: (value: (((prevState: boolean) => boolean) | boolean)) => void
}

const ScreenshotsSection = ({isFilledSection, setIsFilledSection}: ScreenshotsSectionProps) => {
    const [url, setUrl] = useState("");
    const [screenshots, setScreenshots] = useState<string[]>([]);


    const handleAddScreenshot = () => {
        if (url.trim()) {
            setScreenshots([...screenshots, url.trim()]);
            setUrl("");
        }
    };

    return (
        <div>
            <div className="mt-6  p-4">
                <h1 className="text-2xl font-bold mb-4">Скриншоты</h1>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Введите URL картинки"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                    <button
                        type="button"
                        onClick={handleAddScreenshot}
                        className="bg-blue-600 text-white px-4 py-2 rounded-2xl"
                    >
                        Добавить
                    </button>
                </div>

                <div className=" grid grid-cols-4 gap-4 ">

                    {screenshots.map((imageURL, i) => (
                            <div key={i}
                                 className="rounded-xl overflow-hidden shadow w-auto h-[108px] m-3">

                                <img
                                    className="w-full h-full object-cover "
                                    src={imageURL}
                                    alt={`screenshot-${i}`}
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default ScreenshotsSection;