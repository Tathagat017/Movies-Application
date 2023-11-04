import { genreDTO } from "../Genres/genres.model";
import { movieTheaterDTO } from "../MovieTheaters/movietheater.model";
import { actorMovieDTO } from "../actors/actorsmodel";

export interface moviesDTO {
  id: number;
  title: string;
  poster: string;
  inTheaters: boolean;
  trailer: string;
  summary?: string;
  releaseDate: Date;
  genres: genreDTO[];
  movieTheaters: movieTheaterDTO[];
  actors: actorMovieDTO[];
}

export interface LandingPageDTO {
  inTheaters?: moviesDTO[];
  upcomingReleases?: moviesDTO[];
}

export interface movieCreationDTO {
  title: string;
  inTheaters: boolean;
  upcompingReleases?: boolean;
  trailer: string;
  summary?: string;
  releaseDate?: Date;
  poster?: File;
  posterUrl?: string;
  genresIds?: number[];
  movieTheaterIds?: number[];
  actors?: actorMovieDTO[];
}

export interface MoviesPostGetDTO {
  genres: genreDTO[];
  movieTheaters: movieTheaterDTO[];
}

export interface landingPageDTO {
  inTheaters?: movieDTO[];
  upcomingReleases?: movieDTO[];
}

export interface moviesPostGetDTO {
  genres: genreDTO[];
  movieTheaters: movieTheaterDTO[];
}

export interface moviePutGetDTO {
  movie: movieDTO;
  selectedGenres: genreDTO[];
  nonSelectedGenres: genreDTO[];
  selectedMovieTheaters: movieTheaterDTO[];
  nonSelectedMovieTheaters: movieTheaterDTO[];
  actors: actorMovieDTO[];
}
