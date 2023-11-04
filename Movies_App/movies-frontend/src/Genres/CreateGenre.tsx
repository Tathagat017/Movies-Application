import axios from "axios";
import GenreForm from "./GenreForm";
import { genreCreationDTO } from "./genres.model";
import { URLgenres } from "../Endpoints";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DisplayErrors from "../utils/DisplayError";
const CreateGenre = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string[]>([]);
  const create = async (genre: genreCreationDTO) => {
    try {
      await axios.post(URLgenres, genre);
      navigate("/genres");
    } catch (err: object | any) {
      console.log(err);
      if (err && err.response) {
        setError(err.response.data);
      }
    }
  };

  return (
    <>
      <h3>Create Genre</h3>
      <DisplayErrors errors={error} />
      <GenreForm
        model={{ name: "" }}
        onSubmit={async (value) => {
          await create(value);
        }}
      />
    </>
  );
};

export default CreateGenre;
