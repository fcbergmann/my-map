import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import React from "react";
import "./MapPage.css";

export interface MapPageProps {}

const MapPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAoyKb-HYZnsvRtabAzmZxOQBq34qptkwo",
  });

  const position = {
    lat: -27.590824,
    lng: -48.551262,
  };

  return (
    <div className="map">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={position}
          zoom={15}
        >
          <Marker
            position={position}
            options={{
              label: {
                text: "Posição Teste",
                className: "map-marker",
              },
            }}
          />
        </GoogleMap>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MapPage;
