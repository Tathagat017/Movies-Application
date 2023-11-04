import { Field } from "formik";

const CheckboxField = (props: checkBoxFieldProps) => {
  return (
    <div className="mb-3 form-check">
      <Field
        type="checkbox"
        className="form-check-input"
        id={props.field}
        name={props.field}
      />
      <label htmlFor={props.field}>{props.displayName}</label>
    </div>
  );
};

export default CheckboxField;
interface checkBoxFieldProps {
  displayName: string;
  field: string;
}
