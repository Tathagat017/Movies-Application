import { URLgenres } from "../Endpoints";
import EditEntity from "./../utils/EditEntity";
import GenreForm from "./GenreForm";
import { genreCreationDTO, genreDTO } from "./genres.model.d";

const EditGenre = () => {
  return (
    <>
      <EditEntity<genreCreationDTO, genreDTO>
        url={URLgenres}
        entityName="Edit Genre"
        indexURL="/genres"
      >
        {(entity, edit) => (
          <GenreForm
            model={entity}
            onSubmit={async (value) => {
              await edit(value);
            }}
          />
        )}
      </EditEntity>
    </>
  );
};

export default EditGenre;
