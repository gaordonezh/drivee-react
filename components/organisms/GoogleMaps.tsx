import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

const getGeoAddress: any = (location: any) => {
  // @ts-ignore
  return new window.google.maps.Geocoder().geocode({ location }, (predictions: any) => (predictions?.length > 0 ? predictions[0] : []));
};

const GoogleMaps = () => {
  const [currentLocation, setCurrentLocation] = useState({ lat: 4.626233, lng: -74.080653 });
  const [currentZoom, setCurrentZoom] = useState(13);

  const loadMap = (map: any, maps: any) => {
    const myMarker = new maps.Marker({
      map,
      draggable: true,
      icon: '/icons/marker.svg',
      position: { lat: 0, lng: 0 },
    });

    myMarker.addListener('dragend', async () => {
      const locationAddress = await getGeoAddress(myMarker.getPosition());
      console.log(1, locationAddress?.results[0]?.formatted_address, locationAddress?.results);
      setCurrentLocation({ lat: myMarker.getPosition().lat(), lng: myMarker.getPosition().lng() });
    });
    map.addListener('click', async (e: any) => {
      myMarker?.setPosition(e.latLng);

      const locationAddress = await getGeoAddress(e.latLng);
      console.log(2, locationAddress?.results[0]?.formatted_address, locationAddress?.results);
      setCurrentLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    });
    map.addListener('zoom_changed', () => setCurrentZoom(map.getZoom()));
    console.log(3, myMarker);
  };

  return (
    <GoogleMapReact
      yesIWantToUseGoogleMapApiInternals
      center={currentLocation}
      zoom={currentZoom}
      onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
    />
  );
};

export default GoogleMaps;
