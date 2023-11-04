import { Form, Formik, FormikHelpers } from "formik";
import TextField from "./../forms/TextField";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import { movieTheaterCreationDTO } from "./movietheater.model";
import * as Yup from "yup";
import css from "./MovieTheaterForm.module.css";

import MapField from "./../forms/MapField";
import { coordinatesDTO } from "../utils/coordinates.model";
const MovieTheaterForm = (props: MovieTheaterProps) => {
  function transformCoordinates(): coordinatesDTO[] | undefined {
    if (props.model.latitude && props.model.longitude) {
      const response: coordinatesDTO = {
        lat: props.model.latitude,
        lng: props.model.longitude,
      };
      return [response];
    }
    return undefined;
  }

  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("This field is required")
          .FirstLetterUppercase(),
      })}
    >
      {(formikProps) => (
        <Form>
          <TextField field="name" />
          <div className={css["div"]}>
            <MapField
              latField="latitude"
              lngField="longitude"
              coordinates={transformCoordinates()}
            />
          </div>
          <Button type="submit" disabled={formikProps.isSubmitting}>
            Save Changes
          </Button>
          <Link className="btn btn-secondary" to={"/movietheaters"}>
            {" "}
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default MovieTheaterForm;

interface MovieTheaterProps {
  model: movieTheaterCreationDTO;
  onSubmit(
    values: movieTheaterCreationDTO,
    actions: FormikHelpers<movieTheaterCreationDTO>
  ): void;
}
