import { URLmovieTheater } from "../Endpoints";
import EditEntity from "../utils/EditEntity";
import MovieTheaterForm from "./MovieTheaterForm";
import { movieTheaterCreationDTO, movieTheaterDTO } from "./movietheater.model";

const EditMovieTheater = () => {
  return (
    <>
      <EditEntity<movieTheaterCreationDTO, movieTheaterDTO>
        url={URLmovieTheater}
        indexURL="/movietheaters"
        entityName="Movie Theater"
      >
        {(entity, edit) => (
          <MovieTheaterForm
            model={entity}
            onSubmit={async (values) => await edit(values)}
          />
        )}
      </EditEntity>
    </>
  );
};

export default EditMovieTheater;
