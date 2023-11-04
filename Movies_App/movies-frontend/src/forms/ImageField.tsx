import { useFormikContext } from "formik";
import { useState } from "react";

const divStyle = { marginTop: "10px" };
const imageStyle = { width: "250px", height: "250px" };

const ImageField = (props: ImageFieldProps) => {
  const [ImageBase64, setImageBase64] = useState<string>("");
  const [ImageUrlState, setImageUrlState] = useState<string>(props.imageUrl);

  const { values } = useFormikContext<any>();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        ToBase64(file)
          .then((base64file: string) => {
            setImageBase64(base64file);
          })
          .catch((err) => console.log(err));
        values[props.field] = file;
        setImageUrlState("");
      } else {
        setImageBase64("");
      }
    }
  };

  const ToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  return (
    <div className="mb-3">
      <label htmlFor={props.displayName}>{props.displayName}</label>
      <div>
        <input
          type="file"
          id={props.displayName}
          name={props.displayName}
          accept=".jpg,.jprg,.webp,.png"
          onChange={(e) => handleOnChange(e)}
        />
      </div>
      <div>
        {ImageBase64 ? (
          <div style={divStyle}>
            <img style={imageStyle} src={ImageBase64} alt="selected Image" />
          </div>
        ) : null}
      </div>
      <div>
        {ImageUrlState ? (
          <div style={divStyle}>
            <img style={imageStyle} src={ImageUrlState} alt="selected Image" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ImageField;

interface ImageFieldProps {
  displayName: string;
  imageUrl: string;
  field: string;
}

ImageField.defaultProps = {
  imageUrl: "",
};
