import { useEffect, useState } from "react";
import { genreDTO } from "../Genres/genres.model";
import { movieTheaterDTO } from "../MovieTheaters/movietheater.model";
import MovieForm from "./MovieForm";
import axios, { AxiosResponse } from "axios";
import { URLmovies } from "../Endpoints";
import { MoviesPostGetDTO, movieCreationDTO } from "./movies.model";
import Loading from "../utils/Loading";
import { movieToFormData } from "../utils/formDataUtils";
import { useNavigate } from "react-router-dom";
import DisplayErrors from "../utils/DisplayError";
const CreateMovie = () => {
  const [nonSelectedGenres, setNonSelectedGenres] = useState<genreDTO[]>([]);
  const [nonSelectedMovieTheaters, setNonSelectedMovieTheaters] = useState<
    movieTheaterDTO[]
  >([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);

  const [errors, setErrors] = useState<string[]>([]);
  useEffect(() => {
    axios
      .get(`${URLmovies}/postget`)
      .then((res: AxiosResponse<MoviesPostGetDTO>) => {
        setNonSelectedGenres(res.data.genres);
        setLoading(false);
        setNonSelectedMovieTheaters(res.data.movieTheaters);
      })
      .catch((err) => {
        if (err && err.response) {
          setErrors(err.response.data);
        }
      });
  }, []);

  async function create(movie: movieCreationDTO) {
    try {
      console.log(movie);
      const formData = movieToFormData(movie);
      console.log(formData, "formdata");
      let response = await axios({
        method: "Post",
        url: URLmovies,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/movies/${response.data}`);
    } catch (err) {}
  }
  return (
    <>
      <h3>Create Movies</h3>
      <DisplayErrors errors={errors} />
      {loading ? (
        <Loading />
      ) : (
        <MovieForm
          model={{
            title: "",
            inTheaters: false,
            upcompingReleases: false,
            trailer: "",
          }}
          onSubmit={async (value) => await create(value)}
          nonSelectedGenresState={nonSelectedGenres}
          selectedGenresState={[]}
          nonSelectedMovieTheater={nonSelectedMovieTheaters}
          selectedMovieTheater={[]}
          SelectedActorsState={[]}
        />
      )}
    </>
  );
};

export default CreateMovie;
