import {useEffect, useState} from "react";
import TrashSvgIcon from "../../../Icons/TrashSvgIcon.tsx";
import {SeasonSectionProps} from "./VideoContentSection.tsx"






const SeasonSection = ({
                           seasonNumber,
                           episodes,
                           isLastSeason,
                           onChangeEpisodes
                       }: SeasonSectionProps) => {

    const [tempEpisodes, setTempEpisodes] = useState(
        episodes.length > 0 ? episodes : [{
        seasonId: seasonNumber?? 1,
        episode: 1,
        videoLink: ''
    }]);


    const seasonEpisodes = tempEpisodes.filter((episode) => episode.seasonId === seasonNumber);

    const handleChangeVideoId = (episodeNum: number,value: string) => {

        const updatedEpisodes = tempEpisodes.map((episode) =>
            episode.episode === episodeNum&& episode.seasonId === seasonNumber ? {...episode, videoLink: value} : episode
        );
        setTempEpisodes(updatedEpisodes);
    };

    const handleRemoveEpisode = (id: number | undefined) => {
        const updatedSeasonEpisodes = seasonEpisodes.filter((episode) => episode.episode !== id);

        if (updatedSeasonEpisodes.length === 0) {
            alert('В сезоне должна быть хотя бы 1 серия');
            return;
        }

        const reorderedEpisodes = updatedSeasonEpisodes.map((episode, index) => ({
            ...episode,
            episode: index + 1,
        }));

        const updatedEpisodes = [
            ...tempEpisodes.filter((episode) => episode.seasonId !== seasonNumber),
            ...reorderedEpisodes,
        ];

        setTempEpisodes(updatedEpisodes);
    };

    const handleAddEpisode = () => {
        const nextEpisodeNumber =
            seasonEpisodes.length > 0 ? Math.max(...seasonEpisodes.map((ep) => ep.episode)) + 1 : 1;

        const newEpisode = {
            seasonId: seasonNumber,
            episode: nextEpisodeNumber,
            videoLink: '',
        };

        setTempEpisodes([...tempEpisodes, newEpisode]);
    };


    useEffect(() => {
        if (JSON.stringify(tempEpisodes) !== JSON.stringify(episodes))
            onChangeEpisodes(tempEpisodes)
    }, [tempEpisodes, episodes, onChangeEpisodes]);

    return (
        <div className="  w-full ">
            <h1 className="text-2xl font-bold"> {seasonNumber} сезон</h1>
            {seasonEpisodes.map((item) => (
                <div className="w-full " key={item.episode}>
                    <div className="flex w-full  ">
                        <div className="w-full m-2  h-[50px] rounded-2xl  bg-gray-50  border border-gray-300  hover:border-blue-500 focus:outline-none focus:border-blue-600 ">
                            <div className="w-full   p-2">
                                <input
                                    type="text"
                                    value={item.videoLink}
                                    placeholder={`${item.episode} серия/ Youtube VideoID`}
                                    onChange={(e) => handleChangeVideoId(item.episode, e.target.value)}
                                    className="focus:outline-none "
                                />
                            </div>
                            {item.videoLink && (
                                <p className="w-full"> { item.episode}   серия </p>
                            )}
                        </div>
                        <button type="button"  onClick={() => handleRemoveEpisode(item.episode)}>
                            <TrashSvgIcon className="w-[20px] h-[20px]"/>
                        </button>
                    </div>
                    {item.videoLink && (
                        <div className="">
                           {/*<VideoPlayer  poster={item.videoLink} videoId={item.videoLink} />*/}
                        </div>
                    )}
                </div>
            ))}

            <div className="">
            <button className=" p-2 mt-4 text-blue-700 hover:text-blue-200 font-bold"
                    type="button"
                onClick={handleAddEpisode} >
                Добавить серию
            </button>
            </div>
            {!isLastSeason && <div className='project-info-line'></div>}
        </div>
    )

};

export default SeasonSection;