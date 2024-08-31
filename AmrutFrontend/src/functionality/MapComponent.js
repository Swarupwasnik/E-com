import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const MapComponent = () => {
  const mapStyles = {
    height: '500px',
    width: '100%'
  };

  const defaultCenter = {
    lat: 40.7128, // Latitude
    lng: -74.0060 // Longitude
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyCIwF204lFZg1y4kPSIhKaHEXMLYxxuMhA" // Replace with your Google Maps API key
    >
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={10}
        center={defaultCenter}
      >
        {/* You can add markers, polygons, or any other Google Maps components here */}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
