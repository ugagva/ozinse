import {useRef, useState} from "react";


        //Параметры ({ videoUrl, poster })  приходят из родительского компонента, а именно из SeriesPlayer + SeasonSection//

const VideoPlayer = ({videoUrl, poster, videoId}: { videoUrl: string, poster?: string, videoId?:string }) => {

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
            <div className='video-player'>{videoId}</div>
            <button
               type="button"
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center text-white px-4 py-2 rounded-full"
            >
                {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>
        </div>
    );
};

export default VideoPlayer;