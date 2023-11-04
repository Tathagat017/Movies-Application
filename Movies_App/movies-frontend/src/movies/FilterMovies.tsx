import axios, { AxiosResponse } from "axios";
import { Field, Form, Formik } from "formik";
import { useEffect, useRef, useState } from "react";

import Button from "../utils/Button";
import Pagination from "../utils/Pagination";

import MoviesList from "./MoviesList";
import { useLocation, useNavigate } from "react-router-dom";
import { URLgenres, URLmovies } from "../Endpoints";
import { genreDTO } from "../Genres/genres.model";
import { moviesDTO } from "./movies.model";

export default function FilterMovies() {
  const initialValues: filterMoviesForm = {
    title: "",
    genreId: 0,
    upcomingReleases: false,
    inTheaters: false,
    page: 1,
    recordsPerPage: 10,
  };

  const [genres, setGenres] = useState<genreDTO[]>([]);
  const [movies, setMovies] = useState<moviesDTO[]>([]);
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const [totalAmountOfPages, setTotalAmountOfPages] = useState(0);
  const selectRef = useRef(null);
  useEffect(() => {
    axios
      .get(`${URLgenres}?Page=1&RecordsPerPage=50`)
      .then((response: AxiosResponse<genreDTO[]>) => {
        setGenres(response.data);
      });
  }, [movies]);

  useEffect(() => {
    if (query.get("title")) {
      initialValues.title = query.get("title")!;
    }

    if (query.get("genreId")) {
      initialValues.genreId = parseInt(query.get("genreId")!, 10);
    }

    if (query.get("upcomingReleases")) {
      initialValues.upcomingReleases = true;
    }

    if (query.get("inTheaters")) {
      initialValues.inTheaters = true;
    }

    if (query.get("page")) {
      initialValues.page = parseInt(query.get("page")!, 10);
    }

    searchMovies(initialValues);
  }, []);

  function searchMovies(values: filterMoviesForm) {
    modifyURL(values);
    axios
      .get(`${URLmovies}/filter`, { params: values })
      .then((response: AxiosResponse<moviesDTO[]>) => {
        const records = parseInt(response.headers["totalamountofrecords"], 10);
        setTotalAmountOfPages(Math.ceil(records / values.recordsPerPage));
        setMovies(response.data);
      });
  }

  function modifyURL(values: filterMoviesForm) {
    const queryStrings: string[] = [];

    if (values.title) {
      queryStrings.push(`title=${values.title}`);
    }

    if (values.genreId !== 0) {
      queryStrings.push(`genreId=${values.genreId}`);
    }

    if (values.upcomingReleases) {
      queryStrings.push(`upcomingReleases=${values.upcomingReleases}`);
    }

    if (values.inTheaters) {
      queryStrings.push(`inTheaters=${values.inTheaters}`);
    }

    queryStrings.push(`page=${values.page}`);
    navigate(`/movies/filter?${queryStrings.join("&")}`);
  }

  return (
    <>
      <h3>Filter Movies</h3>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          values.page = 1;
          searchMovies(values);
        }}
      >
        {(formikProps) => (
          <>
            <Form>
              <div className="row gx-3 align-items-center mb-3">
                <div className="col-auto">
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    placeholder="Title of the movie"
                    {...formikProps.getFieldProps("title")}
                    ref={selectRef}
                  />
                </div>
                <div className="col-auto">
                  <select
                    id="genreId"
                    className="form-select"
                    onChange={(event) => {
                      console.log(
                        event.target.value,
                        `${URLmovies}/movie-genre?${parseInt(
                          event.target.value
                        )}`
                      );
                      axios
                        .get(
                          `${URLmovies}/movie-genre?genreId=${parseInt(
                            event.target.value
                          )}`
                        )
                        .then((res) => {
                          // console.log("Res", res);
                          setMovies(res.data);
                        })
                        .catch((err) => {
                          setMovies([]);
                          console.log(err);
                        });
                    }}
                  >
                    <option value="0">--Choose a genre--</option>
                    {genres.map((genre) => (
                      <option key={genre.id} value={genre.id}>
                        {genre.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-auto">
                  <div className="form-check">
                    <Field
                      className="form-check-input"
                      id="upcomingReleases"
                      name="upcomingReleases"
                      type="checkbox"
                      onClick={(event) => {
                        console.log(selectRef);
                        axios
                          .get(
                            `${URLmovies}/movie-genre-inTheater?inTheater=${
                              event.target.checked ? false : true
                            }`
                          )
                          .then((res) => {
                            console.log("Res", res);
                            setMovies(res.data);
                          })
                          .catch((err) => {
                            setMovies([]);
                            console.log(err);
                          });
                      }}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="upcomingReleases"
                    >
                      Upcoming Releases
                    </label>
                  </div>
                </div>
                <div className="col-auto">
                  <div className="form-check">
                    <Field
                      className="form-check-input"
                      id="inTheaters"
                      name="inTheaters"
                      type="checkbox"
                      onClick={(event) => {
                        console.log(
                          event.target.value,
                          `${URLmovies}/movie-genre-inTheater?inTheater=${true}`
                        );

                        if (event.target.checked) {
                          axios
                            .get(
                              `${URLmovies}/movie-genre-inTheater?inTheater=${
                                event.target.checked ? true : false
                              }`
                            )
                            .then((res) => {
                              console.log("Res", res);
                              setMovies(res.data);
                            })
                            .catch((err) => {
                              setMovies([]);
                              console.log(err);
                            });
                        } else {
                          setMovies([]);
                        }
                      }}
                    />
                    <label className="form-check-label" htmlFor="inTheaters">
                      In Theaters
                    </label>
                  </div>
                </div>
                <div className="col-auto">
                  <Button
                    className="btn btn-primary"
                    onClick={() => formikProps.submitForm()}
                  >
                    Filter
                  </Button>
                  <Button
                    className="btn btn-danger ms-3"
                    onClick={() => {
                      formikProps.setValues(initialValues);
                      searchMovies(initialValues);
                    }}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </Form>

            <MoviesList movies={movies} />
            <Pagination
              totalAmountOfPages={totalAmountOfPages}
              currentPage={formikProps.values.page}
              onChange={(newPage) => {
                formikProps.values.page = newPage;
                searchMovies(formikProps.values);
              }}
            />
          </>
        )}
      </Formik>
    </>
  );
}

interface filterMoviesForm {
  title: string;
  genreId: number;
  upcomingReleases: boolean;
  inTheaters: boolean;
  page: number;
  recordsPerPage: number;
}
