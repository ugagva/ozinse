import  { useState} from "react";
import VideoPlayer from "./VideoPlayer.tsx";


interface Episode {
    seasonId: number;
    series: number;
    title: string;
    url: string;
    thumbnail: string;
}

interface VideoProject {
    type: string | null;
    series: {
        seasonCount: number;
        series: Episode[];
    };
}

interface SeriesPlayerProps {
    videos: VideoProject,

}


const SeriesPlayer = ({videos }: SeriesPlayerProps) => {
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [selectedEpisode, setSelectedEpisode] = useState(1);

    const episodes = videos.series.series.filter((ep) => ep.seasonId === selectedSeason);
    const currentEpisode = episodes.find((ep) => ep.series === selectedEpisode);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Сериал: {videos.type}</h2>

            {currentEpisode ? (

                <VideoPlayer videoUrl={currentEpisode.url} poster={currentEpisode.thumbnail}/>
            ) : (
                <p className="text-center my-6">Серия не найдена</p>
            )}

            <div className="flex gap-2 mt-6 mb-2  flex-wrap ">

                {Array.from({length: videos.series.seasonCount}).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setSelectedSeason(index + 1);
                            setSelectedEpisode(1);
                        }}
                        className={`px-3 py-1 w-[97px] h-[32px] rounded-l font-bold ${
                            selectedSeason === index + 1 ? "bg-gray-100 text-black " : "bg-[#0052CC1A] text-[#0052CC]"
                        }`}
                    >
                        {index + 1} сезон
                    </button>
                ))}
            </div>

            <div className="flex gap-2  flex-wrap font-bold">
                {episodes.map((ep) => (
                    <button
                        key={ep.series}
                        onClick={() => setSelectedEpisode(ep.series)}
                        className={`px-3 py-1  ${
                            selectedEpisode === ep.series ? "bg-white text-blue-600 border-b  " : "bg-white text-gray-500 "
                        }`}
                    >
                        {ep.series} серия
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SeriesPlayer;