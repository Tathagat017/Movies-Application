import { moviesDTO } from "./movies.model";
import IndividualMovie from "./IndividualMovie";
import css from "./MoviesList.module.css";
import GenericList from "../utils/GenericListComponen";

const MoviesList = (props: moviesListProps) => {
  console.log(props);
  return (
    <GenericList list={props.movies}>
      <div className={css.div}>
        {props.movies?.map((movie) => (
          <IndividualMovie {...movie} key={movie.id} />
        ))}
      </div>
    </GenericList>
  );
};

export default MoviesList;

interface moviesListProps {
  movies?: moviesDTO[];
}
