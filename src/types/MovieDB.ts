type Movie = {
    id: number;
    media_type: 'movie';
    genre_ids: number[];
    overview: string;
    poster_path: string;
    popularity: number;
    title: string;
    release_date: string;
    vote_average: number;

};

type TVShow = {
    id: number;
    media_type: 'tv';
    genre_ids: number[];
    overview: string;
    poster_path: string;
    popularity: number;
    name: string;
    first_air_date: string;
    vote_average: number;
};

type MovieDB = {
    page: number;
    results: (Movie | TVShow)[];
};

type Credits = {
    cast: {
        id: number;
        popularity: number;
        profile_path: string;
        name: string;
        character: string;
    }[];
}

type Providers = {
    id: number;
    results: {
        US: {
            flatrate: { 
                provider_name: string;
                logo_path: string;
                provider_id: number;
            }[];
            buy: {
                provider_name: string;
                logo_path: string;
                provider_id: number;
            }[];    
            rent: {
                provider_name: string;
                logo_path: string;
                provider_id: number;
            }[];
        }
    };
}

export type { Movie, TVShow, MovieDB, Credits, Providers };