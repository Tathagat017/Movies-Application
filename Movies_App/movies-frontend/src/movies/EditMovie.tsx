import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { URLmovies } from "../Endpoints";
import DisplayErrors from "../utils/DisplayError";
import Loading from "../utils/Loading";
import { convertMovieToFormData } from "../utils/formDataUtils";
import MovieForm from "./MovieForm";
import { movieCreationDTO, moviePutGetDTO } from "./movies.model";

const EditMovie = () => {
  const { id }: any = useParams();
  const [movie, setMovie] = useState<movieCreationDTO>();
  const [moviePutGet, setMoviePutGet] = useState<moviePutGetDTO>();
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${URLmovies}/PutGet/${id}`)
      .then((response: AxiosResponse<moviePutGetDTO>) => {
        const model: movieCreationDTO = {
          title: response.data.movie.title,
          inTheaters: response.data.movie.inTheaters,
          trailer: response.data.movie.trailer,
          poster: response.data.movie.poster,
          summary: response.data.movie.summary,
          releaseDate: new Date(response.data.movie.releaseDate),
        };

        setMovie(model);
        setMoviePutGet(response.data);
      });
  }, [id]);

  async function edit(movieToEdit: movieCreationDTO) {
    try {
      const formData = convertMovieToFormData(movieToEdit);
      await axios({
        method: "put",
        url: `${URLmovies}/${id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate(`/movies/${id}`);
    } catch (error: object | any) {
      setErrors(error.response.data);
    }
  }

  return (
    <>
      <h3>Edit Movie</h3>
      <DisplayErrors errors={errors} />
      {movie && moviePutGet ? (
        <MovieForm
          model={movie}
          onSubmit={async (values) => await edit(values)}
          nonSelectedGenresState={moviePutGet.nonSelectedGenres}
          selectedGenresState={moviePutGet.selectedGenres}
          nonSelectedMovieTheater={moviePutGet.nonSelectedMovieTheaters}
          selectedMovieTheater={moviePutGet.selectedMovieTheaters}
          SelectedActorsState={moviePutGet.actors}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default EditMovie;
