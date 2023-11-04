import { Formik, Form, FormikHelpers } from "formik";
import { actorsCreationDTO } from "./actorsmodel";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import TextField from "../forms/TextField";
import DateField from "./../forms/DateField";
import ImageField from "../forms/ImageField";
import Button from "../utils/Button";

//css
import css from "./ActorForm.module.css";
import MarkdownField from "./../forms/MarkdownField";

export default function ActorForm(props: ActorFormProps) {
  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        name: Yup.string()
          .required("* This field is required")
          .FirstLetterUppercase(),
        DateOfBirth: Yup.date().nullable().required("This field is required"),
      })}
    >
      {(formikProps) => (
        <Form className={css.form}>
          <TextField field="name" />
          <DateField displayName="Date Of Birth" field="DateOfBirth" />
          <ImageField
            displayName="Actor Image"
            field={"image"}
            imageUrl={props.model.imageUrl}
          />
          <MarkdownField displayName="Biography" field={"biography"} />
          <Button type="submit" disabled={formikProps.isSubmitting}>
            Save Changes
          </Button>
          <Link to="/actors" className="btn btn-secondary">
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
}
interface ActorFormProps {
  model: actorsCreationDTO;
  onSubmit(
    values: actorsCreationDTO,
    action: FormikHelpers<actorsCreationDTO>
  ): void;
}
