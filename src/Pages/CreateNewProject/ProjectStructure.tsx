

export interface UploadEpisodes {
    seasonId: number;
    episode: number;
    videoLink: string;
}
export  interface Screenshot {
    type: "file" | "url";
    value: File | string;
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
        screenshots:Screenshot[];
    };
    views: null;
    video: {
        seasonCount: number;
        episodes: UploadEpisodes[];
    };
}

