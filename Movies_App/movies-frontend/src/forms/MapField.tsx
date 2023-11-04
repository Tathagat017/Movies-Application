import { useFormikContext } from "formik";
import Map from "../utils/Map";
import { coordinatesDTO } from "../utils/coordinates.model";

const MapField = (props: mapFieldProps) => {
  const { values } = useFormikContext<any>();
  const handleMapClick = (coordinates: coordinatesDTO) => {
    values[props.latField] = coordinates.lat;
    values[props.lngField] = coordinates.lng;
  };

  return (
    <>
      <Map coordinates={props.coordinates} handleMapClick={handleMapClick} />
    </>
  );
};

export default MapField;

interface mapFieldProps {
  coordinates: coordinatesDTO[];
  latField: string;
  lngField: string;
}

MapField.defaultProps = {
  coordinates: [],
};
