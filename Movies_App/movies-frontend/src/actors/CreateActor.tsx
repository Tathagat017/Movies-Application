import { useState } from "react";
import ActorForm from "./ActorForm";
import { actorsCreationDTO } from "./actorsmodel";
import DisplayErrors from "./../utils/DisplayError";
import { convertActorToFormData } from "../utils/formDataUtils";
import axios from "axios";
import { URLactors } from "../Endpoints";
import { useNavigate } from "react-router-dom";

const CreateActors = () => {
  const [errors, setErrors] = useState<string[]>();
  const navigate = useNavigate();
  async function create(actor: actorsCreationDTO) {
    try {
      const formData = convertActorToFormData(actor);

      let res = await axios({
        method: "post",
        url: URLactors,
        data: formData,
        headers: { "Content-type": "multipart/form-data" },
      });
      console.log("posted error:", res);
      navigate("/actors");
    } catch (err: object | any) {
      if (err && err.response) {
        setErrors(err.response.data);
      }
    }
  }

  return (
    <>
      <h3>Create Actors</h3>
      <DisplayErrors errors={errors} />
      <ActorForm
        model={{
          name: "",
          DateOfBirth: undefined,
        }}
        onSubmit={async (values) => await create(values)}
      />
    </>
  );
};
export default CreateActors;
