import { ErrorMessage, Field } from "formik";

const TextField = (props: textFieldProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={props.field}>
        {props.field.split("").map((el, ind) => {
          if (ind == 0 && typeof el !== "number") {
            return el.toLocaleUpperCase();
          } else return el;
        })}{" "}
      </label>
      <Field id={props.field} name={props.field} className="form-control" />
      <ErrorMessage name={props.field}>
        {(msg) => <div className="text-danger">{msg}</div>}
      </ErrorMessage>
    </div>
  );
};

export default TextField;

interface textFieldProps {
  field: string;
}
