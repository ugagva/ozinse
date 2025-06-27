import {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import NumericInput from "../NumericInput.tsx";
import SeasonSection from "./SeasonSection.tsx";
// import {NewProject} from "../ProjectStructure.tsx";


interface UploadEpisodes {
    seasonId: number;
    episode: number;
    videoLink: string;
}

interface NewProject {
    title: string;
    categoryId: string;
    typeId: string;
    ageCategoryId: string;
    releaseYear: number|null;
    durationInMins: number|null;
    keywords: string;
    description: string;
    director: string;
    producer: string;
    ageCategories: number[];
    genres: number[];
    images: {
        imageSrc: string;
        screenshots: File[];
    };
    views: null,
    video: {
        seasonCount: number,
        episodes: UploadEpisodes[];
    }
}

interface VideoContentSectionProps {
    setProject?: Dispatch<SetStateAction<NewProject>>,
    setIsFilledSection?: Dispatch<SetStateAction<boolean>>,
    project: NewProject,

}

export interface SeasonSectionProps {
    seasonNumber: number;
    episodes: UploadEpisodes[];
    isLastSeason: boolean;
    onChangeEpisodes: (
        newEpisodes: {
            seasonId: number;
            episode: number;
            videoLink: string;
        }[]
    ) => void;
}


const checkFilled = (value: string | number) => {
    if (typeof value === 'number') {
        return value > 0;
    }
    return false;
}

const VideoContentSection = ({
                                 project,
                                 setProject,
                                 setIsFilledSection,

                             }: VideoContentSectionProps) => {

    const [selectedSeasons, setSelectedSeasons] = useState<number>(project?.video?.seasonCount || 1);
    const [selectedCountEpisodes, setSelectedCountEpisodes] = useState(project.video?.episodes || []);


    const handleChangeSeasons = (value: number) => {
        setSelectedSeasons(value);
        if (setProject) {
            setProject((prev) => ({
                ...prev,
                video: {
                    ...prev.video,
                    seasonCount: value,
                },
            }));
        }
    };

    useEffect(() => {

        const areAllEpisodesFilled = (project.video?.episodes || []).every((episode: {
            videoLink: string | number;
        }) => checkFilled(episode.videoLink));
        if (setIsFilledSection) {
            setIsFilledSection(areAllEpisodesFilled);
        }
    }, [project.video, setIsFilledSection]);

    const handleEpisodesChange = useCallback((seasonsNumber: number, newEpisodes: {
        seasonId: number
        episode: number;
        videoLink: string
    }[]) => {
        setSelectedCountEpisodes((prevEpisodes) => {
            const updatedEpisodes = prevEpisodes.filter(episode => episode.seasonId !== seasonsNumber)
                .concat(newEpisodes);

            if (setProject) {
                setProject((prev) => ({
                    ...prev,
                    video: {
                        ...prev.video,
                        episodes: updatedEpisodes,
                    },
                }));
            }
            return updatedEpisodes;
        });
    }, [setProject]);

    function createArrayTo(n: number): number[] {
        return Array.from({length: n}, (_, i) => i + 1)
    }


    const arraySeasonsCount = createArrayTo(selectedSeasons);

    return (
        <div className="w-[760px] m-1">
            <NumericInput
                placeholder="Количество сезонов"
                selectedValue={selectedSeasons}
                setSelectedValue={handleChangeSeasons}
            />

            <div className="w-full m-1">
                {arraySeasonsCount.length > 0 &&
                    <div className="mt-4 w-full">
                        {arraySeasonsCount.map((seasonsNumber, index) => {
                                const isLastSeason = index === arraySeasonsCount.length - 1;

                                return (
                                    <SeasonSection
                                        key={seasonsNumber}
                                        seasonNumber={seasonsNumber}
                                        episodes={selectedCountEpisodes.filter(episode => episode.seasonId === seasonsNumber)}
                                        isLastSeason={isLastSeason}
                                        onChangeEpisodes={(newEpisodes) => handleEpisodesChange(seasonsNumber, newEpisodes)}
                                    />

                                )
                            }
                        )}
                    </div>
                }
            </div>
        </div>
    );
};

export default VideoContentSection;