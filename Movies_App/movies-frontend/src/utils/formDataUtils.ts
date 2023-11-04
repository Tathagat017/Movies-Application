import { actorsCreationDTO } from "../actors/actorsmodel";
import { movieCreationDTO } from "../movies/movies.model";

export function convertActorToFormData(actor: actorsCreationDTO): FormData {
  const formData = new FormData();

  formData.set("name", actor.name);
  if (actor.biography) {
    formData.set("biography", actor.biography);
  }

  if (actor.DateOfBirth) {
    formData.set("dateOfBirth", formatDate(actor.DateOfBirth));
  }

  if (actor.image) {
    formData.set("picture", actor.image);
  }
  console.log(formData, "from");
  return formData;
}

export function movieToFormData(movie: movieCreationDTO) {
  const formData = new FormData();

  formData.set("title", movie.title);

  if (movie.summary) {
    formData.set("summary", movie.summary);
  }

  formData.set("trailer", movie.trailer);
  formData.set("inTheaters", String(movie.inTheaters));

  if (movie.releaseDate) {
    formData.set("releaseDate", formatDate(movie.releaseDate));
  }

  if (movie.poster) {
    formData.set("poster", movie.poster);
  }

  formData.set("genresIds", JSON.stringify(movie.genresIds));
  formData.set("movieTheatersIds", JSON.stringify(movie.movieTheaterIds));
  formData.set("actors", JSON.stringify(movie.actors));
  console.log("here formdata in fucntion", formData.get("actors"));
  return formData;
}

export function convertMovieToFormData(movie: movieCreationDTO) {
  const formData = new FormData();

  formData.append("title", movie.title);

  if (movie.summary) {
    formData.append("summary", movie.summary);
  }

  formData.append("trailer", movie.trailer);
  formData.append("inTheaters", String(movie.inTheaters));

  if (movie.releaseDate) {
    formData.append("releaseDate", formatDate(movie.releaseDate));
  }

  if (movie.poster) {
    formData.append("poster", movie.poster);
  }

  formData.append("genresIds", JSON.stringify(movie.genresIds));
  formData.append("movieTheatersIds", JSON.stringify(movie.movieTheaterIds));
  formData.append("actors", JSON.stringify(movie.actors));

  return formData;
}

function formatDate(date: Date) {
  date = new Date(date);
  const format = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const [{ value: month }, , { value: day }, , { value: year }] =
    format.formatToParts(date);

  return `${year}-${month}-${day}`;
}
