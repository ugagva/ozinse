

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
    cover?: {                // 👈 добавляем cover
        id?: string | number;
        createdAt?: string;
        updatedAt?: string;
        projectID?: number;
    };
    releaseYear: number|null;
    durationInMints: number|null;
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

