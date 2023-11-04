import { URLgenres } from "../Endpoints";
import IndexEntity from "../utils/IndexEntity";
import { genreDTO } from "./genres.model";
const IndexGenres = () => {
  return (
    <>
      <IndexEntity<genreDTO>
        url={URLgenres}
        createURL="/genres/create"
        title="Genres"
        entityName="Genre"
      >
        {(genres, buttons) => (
          <>
            <thead className="thead-dark">
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
              </tr>
            </thead>
            <tbody>
              {genres?.map((genre, genId) => (
                <tr key={genId} className="table-light ">
                  <td scope="row">
                    {buttons(`/genres/edit/${genre.id}`, genre.id)}
                  </td>
                  <td>{genre.name}</td>
                </tr>
              ))}
            </tbody>
          </>
        )}
      </IndexEntity>
    </>
  );
};

export default IndexGenres;
