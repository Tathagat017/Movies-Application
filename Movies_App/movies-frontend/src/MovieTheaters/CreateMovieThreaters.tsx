import axios from "axios";
import { URLmovieTheater } from "../Endpoints";
import MovieTheaterForm from "./MovieTheaterForm";
import { movieTheaterCreationDTO } from "./movietheater.model";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DisplayErrors from "../utils/DisplayError";

const CreateMovieTheater = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  async function create(movieTheater: movieTheaterCreationDTO) {
    try {
      console.log(movieTheater);
      await axios.post(URLmovieTheater, movieTheater);
      navigate("/movietheaters");
    } catch (error: object | any) {
      if (error && error.response) {
        setErrors(error.response.data);
      }
    }
  }

  return (
    <>
      <h3>Create Movie Theater</h3>
      <DisplayErrors errors={errors} />
      <MovieTheaterForm
        model={{ name: "" }}
        onSubmit={async (values) => await create(values)}
      />
    </>
  );
};

export default CreateMovieTheater;
