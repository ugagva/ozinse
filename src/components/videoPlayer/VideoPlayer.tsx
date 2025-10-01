import {useRef, useState} from "react";
import { Play, Pause } from "lucide-react";

        //Параметры ({ videoUrl, poster })  приходят из родительского компонента, а именно из SeriesPlayer + SeasonSection//




const VideoPlayer = ({videoUrl, poster, videoId}: { videoUrl: string, poster?: string, videoId?:string }) => {

    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const isYouTube = videoUrl.includes("youtu");
    const isVimeo = videoUrl.includes("vimeo");

    const handlePlay = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }

        setIsPlaying(!isPlaying);
    };
const getEmbedUrl = (url:string) => {
    try {
        const youTuBeShort = url.match(/youtu\.be\/([^?]+)/);
        if (youTuBeShort) return `https://www.youtube.com/embed/${youTuBeShort[1]}`;

        const youTubeLong = url.match(/v=([^&]+)/);
        if (youTubeLong) return `https://www.youtube.com/embed/${youTubeLong[1]}`;

    if (url.includes("vide.com")) {
        const id=url.split("vimeo.com")[1];
        return `https://player.vimeo.com.com/video/${id}`;
    }
    return url;
}catch {
    return url;
    }
}



    return (
        <div className="relative w-full max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg">
            {isYouTube || isVimeo? (
                <iframe
                    src={getEmbedUrl(videoUrl)}
                    className="w-full rounded-xl overflow-hidden shadow-lg"
                    allow={"accelerometer;autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}
                   allowFullScreen
                />

            ):(
                <>
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        poster={poster}
                        className="w-full h-auto"
                    />
                    {/* Play/Pause overlay */}
                    <button
                        type="button"
                        onClick={handlePlay}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="bg-black/50 rounded-full p-4 hover:bg-black/70 transition">
                            {isPlaying ? (
                                <Pause className="w-10 h-10 text-white"/>
                            ) : (
                                <Play className="w-10 h-10 text-white"/>
                            )}
                        </div>
                    </button>

                </>
                )}
            {/* Доп инфо: например id видео */}
            {videoId && (
                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {videoId}
                </div>
            )}
        </div>

    );
};

export default VideoPlayer;