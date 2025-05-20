import {useRef, useState} from "react";


interface Episode {
    seasonId: number;
    series: number;
    title: string;
    url: string;
    thumbnail: string;
}

interface Project {
    type: string | null;
    series: {
        seasonCount: number;
        series: Episode[];
    };
}

interface SeriesPlayerProps {
    project: Project,

}

const VideoPlayer = ({videoUrl, poster}: { videoUrl: string; poster?: string }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handlePlay = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }

        setIsPlaying(!isPlaying);
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            <video
                ref={videoRef}
                src={videoUrl}
                poster={poster}
                className="w-full h-auto"
            />
            <button
                onClick={handlePlay}
                className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-full"
            >
                {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>
        </div>
    );
};

const SeriesPlayer = ({project, }: SeriesPlayerProps) => {
    const [selectedSeason, setSelectedSeason] = useState(1);
    const [selectedEpisode, setSelectedEpisode] = useState(1);

    const episodes = project.series.series.filter((ep) => ep.seasonId === selectedSeason);
    const currentEpisode = episodes.find((ep) => ep.series === selectedEpisode);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Сериал: {project.type}</h2>

            {currentEpisode ? (
                <VideoPlayer videoUrl={currentEpisode.url} poster={currentEpisode.thumbnail}/>
            ) : (
                <p className="text-center my-6">Серия не найдена</p>
            )}

            <div className="flex gap-2 mt-6 mb-2 justify-center flex-wrap">
                {Array.from({length: project.series.seasonCount}).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setSelectedSeason(index + 1);
                            setSelectedEpisode(1);
                        }}
                        className={`px-3 py-1 border rounded-xl ${
                            selectedSeason === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                        }`}
                    >
                        {index + 1} сезон
                    </button>
                ))}
            </div>

            <div className="flex gap-2 justify-center flex-wrap">
                {episodes.map((ep) => (
                    <button
                        key={ep.series}
                        onClick={() => setSelectedEpisode(ep.series)}
                        className={`px-3 py-1 border rounded-xl ${
                            selectedEpisode === ep.series ? "bg-blue-600 text-white" : "bg-gray-300"
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