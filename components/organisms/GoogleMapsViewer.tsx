import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

interface GoogleMapsViewerProps {
  initialLocation?: { lat: number; lng: number };
}

const GoogleMapsViewer = ({ initialLocation }: GoogleMapsViewerProps) => {
  const [currentZoom, setCurrentZoom] = useState(13);

  const loadMap = (map: any, maps: any) => {
    new maps.Marker({ map, draggable: true, icon: '/icons/marker.svg', position: initialLocation });
    map.addListener('zoom_changed', () => setCurrentZoom(map.getZoom()));
  };

  return (
    <GoogleMapReact
      yesIWantToUseGoogleMapApiInternals
      center={initialLocation}
      zoom={currentZoom}
      onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
    />
  );
};

export default GoogleMapsViewer;
