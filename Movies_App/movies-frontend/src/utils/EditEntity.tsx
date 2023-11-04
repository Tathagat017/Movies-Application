import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ValidateParamsId } from "../Routes/validateParams";
import RedirectToLandingPage from "./RedirectToLandingPage";
import axios, { AxiosResponse } from "axios";
import DisplayErrors from "./DisplayError";
import Loading from "./Loading";

const EditEntity = <TCreation, TRead>({
  url,
  transform,
  indexURL,
  transformFormData,
  entityName,
  children,
}: editEntityProps<TCreation, TRead>) => {
  const { id }: any = useParams();
  const [entity, setEntity] = useState<TCreation>();
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  if (!ValidateParamsId(id)) {
    return <RedirectToLandingPage />;
  }

  useEffect(() => {
    axios
      .get(`${url}/${id}`)
      .then((res: AxiosResponse<TRead>) => {
        console.log(res.data);
        setEntity(() => transform(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const edit = async (entityToEdit: TCreation) => {
    try {
      if (transformFormData) {
        const formData = transformFormData(entityToEdit);
        console.log(formData);
        let res = await axios({
          method: "put",
          url: `${url}/${id}`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(res.headers.message);
      } else {
        await axios.put(`${url}/${id}`, entityToEdit);
      }

      navigate(indexURL);
    } catch (err: object | any) {
      if (err && err.response) {
        console.info(err);
        //setErrors(err.response.message);
      }
    }
  };

  return (
    <>
      <h3>Edit {entityName} </h3>
      <DisplayErrors errors={errors} />
      {entity ? children(entity, edit) : <Loading />}
    </>
  );
};

export default EditEntity;

interface editEntityProps<TCreation, TRead> {
  url: string;
  transform(entity: TRead): TCreation;
  transformFormData?(model: TCreation): FormData;
  indexURL: string;
  entityName: string;
  children(
    entity: TCreation,
    edit: (entity: TCreation) => void
  ): React.ReactElement;
}

EditEntity.defaultProps = {
  transform: (entity: any) => entity,
};
