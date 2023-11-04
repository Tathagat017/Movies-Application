import ActorForm from "./ActorForm";
import EditEntity from "./../utils/EditEntity";
import { actorDTO, actorsCreationDTO } from "./actorsmodel.d";
import { URLactors } from "../Endpoints";

import { convertActorToFormData } from "../utils/formDataUtils";

const EditActors = () => {
  function transform(actor: actorDTO): actorsCreationDTO {
    return {
      name: actor.name,
      imageUrl: actor.picture,
      biography: actor.biography,
      DateOfBirth: new Date(actor.dateOfBirth),
    };
  }

  return (
    <>
      <EditEntity<actorsCreationDTO, actorDTO>
        url={URLactors}
        indexURL="/actors"
        entityName="Actor"
        transformFormData={convertActorToFormData}
        transform={transform}
      >
        {(entity, edit) => (
          <>
            <ActorForm
              model={entity}
              onSubmit={async (values) => await edit(values)}
            />
          </>
        )}
      </EditEntity>
    </>
  );
};

export default EditActors;
