import { MapContainer, TileLayer, useMapEvent, Marker } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { coordinatesDTO } from "./coordinates.model";
import { useState } from "react";

interface mapClickProps {
  setCoordinates(coordinates: coordinatesDTO): void;
}

const MapClick = (props: mapClickProps): null => {
  useMapEvent("click", (eventArgs) => {
    console.log(eventArgs.latlng.lat, eventArgs.latlng.lng);
    props.setCoordinates({
      lat: eventArgs.latlng.lat,
      lng: eventArgs.latlng.lng,
    });
  });

  return null;
};

let defaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [16, 37],
});
L.Marker.prototype.options.icon = defaultIcon;
//12.977790, 77.564936

const Map = (props: mapProps) => {
  const [coordinatesState, setCoordinatesState] = useState<coordinatesDTO[]>(
    props.coordinates
  );
  return (
    <>
      <MapContainer
        center={[12.97779, 77.564936]}
        zoom={13}
        scrollWheelZoom={true}
        style={{
          height: `${props.height}`,
          border: "8px solid black",
          borderRadius: "5px",
        }}
      >
        <TileLayer
          attribution="React Movies"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.readOnly ? null : (
          <MapClick
            setCoordinates={(coordinates) => {
              setCoordinatesState([coordinates]);
              props.handleMapClick(coordinates);
            }}
          />
        )}
        {coordinatesState.map((points) => (
          <Marker
            key={`${points.lat} + ${points.lng}`}
            position={[points.lat, points.lng]}
          />
        ))}
      </MapContainer>
    </>
  );
};

export default Map;

interface mapProps {
  height: string;
  coordinates: coordinatesDTO[];
  handleMapClick(coordinates: coordinatesDTO): void;
  readOnly: boolean;
}
Map.defaultProps = {
  height: "300px",
  readOnly: false,
};
