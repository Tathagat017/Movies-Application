import CreateGenre from "../Genres/CreateGenre";
import EditGenre from "../Genres/EditGenre";
import IndexGenres from "../Genres/IndexGenres";
import CreateMovieTheater from "../MovieTheaters/CreateMovieThreaters";
import EditMovieTheater from "../MovieTheaters/EditMovieThreaters";
import IndexMovieTheaters from "../MovieTheaters/IndexMovieTheaters";
import CreateActors from "../actors/CreateActor";
import EditActors from "../actors/EditActors";
import IndexActors from "../actors/IndexActors";
import CreateMovie from "../movies/CreateMovie";
import EditMovie from "../movies/EditMovie";
import FilterMovies from "../movies/FilterMovies";
import LandingPage from "../movies/LandingPage";
import MovieDetails from "../movies/MovieDetail";
import RedirectToLandingPage from "../utils/RedirectToLandingPage";
import LoginPage from "./../Login/LoginPage";

export const routes = [
  { path: "/", component: LandingPage, exact: true },

  { path: "/genres", component: IndexGenres, exact: true },
  { path: "/genres/create", component: CreateGenre, exact: true },
  { path: "/genres/edit/:id", component: EditGenre, exact: true },

  { path: "/actors", component: IndexActors, exact: true },
  { path: "/actors/create", component: CreateActors, exact: true },
  { path: "/actors/edit/:id", component: EditActors, exact: true },

  { path: "/movietheaters", component: IndexMovieTheaters, exact: true },
  { path: "/movietheaters/create", component: CreateMovieTheater, exact: true },
  { path: "/movietheaters/edit/:id", component: EditMovieTheater, exact: true },

  { path: "/movies/filter", component: FilterMovies, exact: true },
  { path: "/movies/create", component: CreateMovie, exact: true },
  { path: "/movies/edit/:id", component: EditMovie, exact: true },
  { path: "/movies/:id", component: MovieDetails, exact: true },

  { path: "/login", component: LoginPage, exact: true },

  { path: "*", component: RedirectToLandingPage, exact: false },
];
