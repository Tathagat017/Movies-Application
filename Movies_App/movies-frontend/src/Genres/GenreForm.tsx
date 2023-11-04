import { Form, Formik, FormikHelpers } from "formik";
import Button from "../utils/Button";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import css from "./CreateGenre.module.css";
import TextField from "./../forms/TextField";
import { genreCreationDTO } from "./genres.model";

const GenreForm = (props: genreFormProps) => {
  return (
    <>
      {" "}
      <Formik
        initialValues={props.model}
        // onSubmit={async (value) => {
        //   await new Promise((r) => setTimeout(r, 1));
        //   console.log(value);
        // }}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
          name: Yup.string()
            .required("* This field is required")
            .max(50, "The name of the genre cannot be more than 50 characters")
            .FirstLetterUppercase(),
        })}
      >
        {(formikProps) => (
          <Form className={css.form}>
            <TextField field="name" />
            <Button type="submit" disabled={formikProps.isSubmitting}>
              Save Genre
            </Button>
            <Link className="btn btn-secondary" to="/genres">
              Cancel
            </Link>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default GenreForm;

interface genreFormProps {
  model: genreCreationDTO;
  onSubmit(
    values: genreCreationDTO,
    action: FormikHelpers<genreCreationDTO>
  ): void;
}
