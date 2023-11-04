import { useState } from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { movieCreationDTO } from "./movies.model";
import * as Yup from "yup";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import TextField from "../forms/TextField";
import DateField from "../forms/DateField";
import ImageField from "../forms/ImageField";
import CheckboxField from "./../forms/CheckBoxField";
import MultipleSelector, {
  multipleSelectorModel,
} from "./../forms/MultipleSelector";
import css from "./MutlipleForm.module.css";
import { genreDTO } from "../Genres/genres.model";
import { movieTheaterDTO } from "../MovieTheaters/movietheater.model";
import TypeAheadActors from "./../forms/TypeAheadActors";
import { actorMovieDTO } from "../actors/actorsmodel";
import MarkdownField from "../forms/MarkdownField";

const MovieForm = (props: movieFormProps) => {
  const MapToModel = (
    item: { id: number; name: string }[]
  ): multipleSelectorModel[] => {
    return item?.map((el) => {
      return { key: el.id, value: el.name };
    });
  };
  const [selectedGenresState, setSelectedGenresState] = useState(
    MapToModel(props.selectedGenresState)
  );

  const [nonSelectedGenresState, setNonSelectedGenresState] = useState(
    MapToModel(props.nonSelectedGenresState)
  );
  //

  const [selectedMovieTheaterState, setSelectedMovieTheaterState] = useState(
    MapToModel(props.selectedMovieTheater)
  );

  const [nonSelectedMovieTheaterState, setNonSelectedMovieTheaterState] =
    useState(MapToModel(props.nonSelectedMovieTheater));

  const [SelectedActorsState, setSelectedActorsState] = useState(
    props.SelectedActorsState
  );
  return (
    <>
      <Formik
        initialValues={props.model}
        onSubmit={(values, actions) => {
          values.genresIds = selectedGenresState.map((el) => el.key);
          values.movieTheaterIds = selectedMovieTheaterState.map(
            (el) => el.key
          );
          values.actors = SelectedActorsState;
          props.onSubmit(values, actions);
        }}
        validationSchema={Yup.object({
          title: Yup.string()
            .required("This is requried")
            .FirstLetterUppercase(),
        })}
      >
        {(formikProps) => (
          <Form>
            <TextField field="title" />
            <CheckboxField displayName="In Theaters" field="inTheaters" />
            <TextField field="trailer" />
            <DateField displayName="Release Date" field={"releaseDate"} />
            <ImageField
              displayName="Poster"
              field="poster"
              imageUrl={props.model.posterUrl}
            />

            <MarkdownField displayName="Summary" field="summary" />
            <MultipleSelector
              displayName="Genres"
              nonSelected={nonSelectedGenresState}
              selected={selectedGenresState}
              onChange={(selected, nonSelected) => {
                setSelectedGenresState(selected);
                setNonSelectedGenresState(nonSelected);
              }}
            />
            <MultipleSelector
              displayName="Movie Theater"
              nonSelected={nonSelectedMovieTheaterState}
              selected={selectedMovieTheaterState}
              onChange={(selected, nonSelected) => {
                setSelectedMovieTheaterState(selected);
                setNonSelectedMovieTheaterState(nonSelected);
              }}
            />

            <TypeAheadActors
              displayName="Actors"
              actors={SelectedActorsState}
              onAdd={(actors) => {
                console.log(actors);
                setSelectedActorsState(actors);
              }}
              onRemove={(actor) => {
                setSelectedActorsState(actor);
              }}
              listUI={(actor: actorMovieDTO) => (
                <>
                  {actor.name} /{" "}
                  <input
                    placeholder="Character"
                    type="text"
                    value={actor.character}
                    onChange={(e) => {
                      const index = SelectedActorsState.findIndex(
                        (x) => x.id === actor.id
                      );

                      const actors = [...SelectedActorsState];
                      actors[index].character = e.currentTarget.value;

                      setSelectedActorsState(actors);
                    }}
                  />
                </>
              )}
            />
            <Button
              className={`btn btn-primary ${css.ButtonSaveExit}`}
              disabled={formikProps.isSubmitting}
              type="submit"
            >
              Save Changes
            </Button>
            <Link
              className={`btn btn-secondary ${css.ButtonSaveExit}`}
              to={"/genres"}
            >
              Cancel
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default MovieForm;

interface movieFormProps {
  model: movieCreationDTO;
  onSubmit(
    values: movieCreationDTO,
    actions: FormikHelpers<movieCreationDTO>
  ): void;
  selectedGenresState: genreDTO[];
  nonSelectedGenresState: genreDTO[];
  selectedMovieTheater: movieTheaterDTO[];
  nonSelectedMovieTheater: movieTheaterDTO[];
  SelectedActorsState: actorMovieDTO[];
}
