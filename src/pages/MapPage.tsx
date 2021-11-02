import React from "react";
import { GoogleMap, Marker, LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { REACT_APP_GOOGLE_API_KEY } from "../App";
import "./MapPage.css";

export interface MapPageProps {}

const MapPage = () => {
  // const { isLoaded } = useJsApiLoader({
  //   id: "google-map-script",
  //   googleMapsApiKey: REACT_APP_GOOGLE_API_KEY,
  // });

  const [map, setMap] = React.useState<google.maps.Map>();
  const [searchBox, setSearchBox] = React.useState<google.maps.places.SearchBox>();
  const [markers, setMarkers] = React.useState<any[]>([]);

  const position = {
    lat: -27.590824,
    lng: -48.551262,
  };

  const onMapLoad = (map: google.maps.Map) => {
    setMap(map)
  }

  const onLoad = (ref: google.maps.places.SearchBox) => {
    setSearchBox(ref)
  };

  const onPlacesChanged = () => {
    const places = searchBox!.getPlaces();
    console.log(places);
    const place = places![0];
    const location = {
      lat: place?.geometry?.location?.lat() || 0,
      lng: place?.geometry?.location?.lng() || 0,
    
    }
    setMarkers([...markers, location])
    map?.panTo(location)
  };

  return (
    <div className="map">
      <LoadScript
        googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}
        libraries={['places']}>
        <GoogleMap
          onLoad={onMapLoad}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={position}
          zoom={15}
        >
          <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
            <input className="address" placeholder="Digite um endereço" />
          </StandaloneSearchBox>
          {markers.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))}
          
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapPage;
