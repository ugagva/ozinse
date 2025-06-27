
export interface UploadEpisodes {
    seasonId: number;
    episode: number;
    videoLink: string;
}

export interface NewProject {
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
    genres:number [];
    images: {
        imageSrc: string;
        screenshots: File[];
    };
    views: null;
    video: {
        seasonCount: number;
        episodes: UploadEpisodes[];
    };
}

