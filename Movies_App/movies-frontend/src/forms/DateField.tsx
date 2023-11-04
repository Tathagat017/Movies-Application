import { useFormikContext } from "formik";

const DateField = ({ field, displayName }: dateFieldProps) => {
  const { values, validateForm, touched, errors } = useFormikContext<any>();
  return (
    <div className="mb-3">
      <label htmlFor={field}>{displayName}</label>
      <input
        type="date"
        className="form-control"
        id={field}
        name={field}
        defaultValue={values[field]?.toLocaleDateString("en-CA")}
        onChange={(e) => {
          const date = new Date(e.target.value);
          console.log(date);
          values[field] = date;
          validateForm();
        }}
      />
      {touched[field] && errors[field] ? (
        <div className="text-danger">{errors[field]?.toString()}</div>
      ) : null}
    </div>
  );
};

export default DateField;

interface dateFieldProps {
  field: string;
  displayName: string;
}
