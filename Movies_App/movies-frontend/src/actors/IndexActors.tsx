import IndexEntity from "./../utils/IndexEntity";
import { actorDTO } from "./actorsmodel.d";
import { URLactors } from "../Endpoints";

const IndexActors = () => {
  return (
    <>
      <IndexEntity<actorDTO>
        url={URLactors}
        createURL="/actors/create"
        title="Actors"
        entityName="Actors"
      >
        {(actors, buttons) => (
          <>
            <thead className="thead-dark">
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              {actors?.map((actor) => (
                <tr key={actor.id} className="table-light ">
                  <td scope="row">
                    {buttons(`/actors/edit/${actor.id}`, actor.id)}
                  </td>
                  <td>{actor.name}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </IndexEntity>
    </>
  );
};

export default IndexActors;
