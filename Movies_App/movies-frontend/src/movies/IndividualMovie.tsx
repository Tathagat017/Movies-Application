import { moviesDTO } from "./movies.model";
import css from "./IndividualMovie.model.css";
import { Link } from "react-router-dom";
import "@fontsource/roboto";

const IndividualMovie = ({ id, title, poster, releaseDate }: moviesDTO) => {
  const buildLink = () => `/movies/${id}`;
  return (
    <div key={id} className={css["main-container"]} id="main">
      <Link to={buildLink()}>
        <img src={poster}></img>
      </Link>

      <div
        style={{
          fontFamily: "Roboto",
          marginTop: "1%",
        }}
      >
        <Link to={buildLink()}>
          <b>{title}</b>
          <p>{new Date(releaseDate).toUTCString().substring(0, 17)}</p>
        </Link>
      </div>
    </div>
  );
};

export default IndividualMovie;
