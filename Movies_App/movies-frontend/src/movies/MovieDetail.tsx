import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { URLmovies } from "../Endpoints";
import { moviesDTO } from "./movies.model";
import ReactMarkdown from "react-markdown";
import Loading from "../utils/Loading";
import Map from "../utils/Map";
import coordinateDTO from "./coordinates.model";
import DisplayErrors from "../utils/DisplayError";
import Button from "../utils/Button";
import cssStyles from "./MovieDetails.module.css";
import { useAdminAuthContext } from "../Admin/AuthContext";
import "@fontsource/titillium-web";
export default function MovieDetails() {
  const navigate = useNavigate();
  const { id }: any = useParams();
  const [movie, setMovie] = useState<moviesDTO>();
  const [errors, setErrors] = useState<string[]>([]);
  const adminContext = useAdminAuthContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  console.log(adminContext?.adminAuth);
  useEffect(() => {
    axios
      .get(`${URLmovies}/${id}`)
      .then((response: AxiosResponse<moviesDTO>) => {
        response.data.releaseDate = new Date(response.data.releaseDate);

        setMovie(response.data);
      })
      .catch((err) => {
        if (err.response.data.status == 404) {
          setErrors(["Resource Not Found in the Database"]);
        }
      });
  }, [id]);
  // console.log(movie);
  function transformCoordinates(): coordinateDTO[] {
    if (movie?.movieTheaters) {
      const coordinates = movie.movieTheaters.map((movieTheater) => {
        return {
          lat: movieTheater.latitude,
          lng: movieTheater.longitude,
          name: movieTheater.name,
        } as coordinateDTO;
      });

      return coordinates;
    }

    return [];
  }

  function generateEmbeddedVideoURL(trailer: string): string {
    if (!trailer) {
      return "";
    }

    if (trailer.includes("/embed")) {
      return trailer;
    }

    return `${trailer}`;
  }

  if (errors.length) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <DisplayErrors errors={errors} font="25px" />
      </div>
    );
  }

  function deleteMovie(id: number) {
    console.log(`${URLmovies}/${id}`);
    axios
      .delete(`${URLmovies}/${id}`)
      .then((res: AxiosResponse<object>) => {
        if (res) {
          console.log("deleted");
        }
        alert(`${movie?.title} deleted successfully`);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }
  console.log(isLoading);
  return movie ? (
    <div style={{ textAlign: "center", fontFamily: "Titillium-Web" }}>
      <h2>
        {movie.title} ({movie.releaseDate.getFullYear()})
      </h2>
      {movie.genres?.map((genre) => (
        <Link
          key={genre.id}
          style={{ marginRight: "5px" }}
          className="btn btn-primary btn-sm rounded-pill"
          to={`/movies/filter?genreId=${genre.id}`}
        >
          {genre.name}
        </Link>
      ))}{" "}
      | {movie.releaseDate.toDateString()}
      <div
        style={{
          display: "flex",
          marginTop: "1rem",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <span
          style={{
            display: "inline-block",
            marginRight: "1rem",
            textAlign: "center",
          }}
          className={cssStyles["poster-container"]}
        >
          <img
            src={movie.poster}
            style={{ width: "370px", height: "315px", borderRadius: "5px" }}
            alt="poster"
          />
        </span>
        {movie.trailer ? (
          <div className={cssStyles["iframe-container"]}>
            <iframe
              title="youtube-trailer"
              width="640"
              height="315"
              src={generateEmbeddedVideoURL(movie.trailer)}
              frameBorder={0}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setIsLoading(() => false)}
              className={isLoading ? cssStyles["hidden"] : cssStyles["active"]}
            ></iframe>
            <h4
              className={isLoading ? cssStyles["active"] : cssStyles["hidden"]}
              style={{ color: "wheat" }}
            >
              Loading...
            </h4>
          </div>
        ) : null}
      </div>
      {movie.summary ? (
        <div
          style={{
            margin: "auto",
            marginTop: "30px",
            width: "90%",
          }}
        >
          <h3
            style={{
              fontFamily: "Titillium-Web",
              fontSize: "2rem",
              textDecoration: "underline #f2f4",
            }}
          >
            Summary
          </h3>
          <div style={{ padding: " 0px 50px" }}>
            <ReactMarkdown>{movie.summary}</ReactMarkdown>
          </div>
        </div>
      ) : null}
      {movie.actors && movie.actors.length > 0 ? (
        <div style={{ marginTop: "1rem" }}>
          <h3
            style={{
              fontFamily: "Titillium-Web",
              fontSize: "2rem",
              textDecoration: "underline #f2f4",
            }}
          >
            Actors
          </h3>
          <div className={cssStyles["actor-card-container"]}>
            {movie.actors?.map((actor) => (
              <div
                key={actor.id}
                style={{
                  marginBottom: "2px",
                  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  padding: "20px",
                  width: "250px",
                  height: "280px",
                  borderRadius: "5px",
                }}
                className={cssStyles.card}
              >
                <img
                  alt="pic"
                  src={actor.picture}
                  style={{
                    width: "150px",
                    height: "130px",
                    verticalAlign: "middle",
                    borderRadius: "5px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      width: "200px",
                      marginLeft: "1rem",
                    }}
                  >
                    <b>{actor.name} </b>
                  </span>

                  <span> staring as </span>
                  <span>
                    <b>{actor.character}</b>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
      {movie.movieTheaters && movie.movieTheaters.length > 0 ? (
        <div>
          <h2
            style={{
              fontFamily: "Titillium-Web",
              fontSize: "2.2rem",
              textDecoration: "underline dashed #f2f4",
              marginTop: "20px",
            }}
          >
            Showing on
          </h2>
          <ol style={{ display: "flex", justifyContent: "space-evenly" }}>
            {movie &&
              movie.movieTheaters?.map((theaters, id) => (
                <li
                  key={id}
                  style={{
                    margin: "10px",
                  }}
                >
                  <h6 style={{ fontFamily: "monospace", fontSize: "1rem" }}>
                    {theaters.name}
                  </h6>
                </li>
              ))}
          </ol>
          <Map
            coordinates={transformCoordinates()}
            readOnly={true}
            handleMapClick={() => console.log(1)}
          />

          {adminContext?.adminAuth ? (
            <>
              {" "}
              <Link to={`/movies/edit/${id}`}>
                <Button
                  className={`btn btn-warning ${cssStyles["edit-button"]}`}
                >
                  Edit Movie
                </Button>
              </Link>
              <Button
                onClick={() => deleteMovie(id)}
                className={`btn btn-danger ${cssStyles["edit-button"]}`}
              >
                Delete Movie
              </Button>
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  ) : (
    <Loading />
  );
}
