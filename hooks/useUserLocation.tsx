import { useEffect, useState } from 'react';

const useUserLocation = () => {
  const [location, setLocation] = useState({ lat: -12.044062386030685, lng: -77.04334164909426 });

  useEffect(() => {
    if ('geolocation' in navigator) {
      window.navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setLocation({ lat: coords.latitude, lng: coords.longitude });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              console.error('El usuario ha denegado el permiso para obtener la ubicación.');
              break;
            case error.POSITION_UNAVAILABLE:
              console.error('La información de ubicación no está disponible.');
              break;
            case error.TIMEOUT:
              console.error('La solicitud para obtener la ubicación del usuario ha expirado.');
              break;
            default:
              console.error('Se ha producido un error desconocido al obtener la ubicación.');
              break;
          }
        }
      );
    } else {
      console.error('La geolocalización no está disponible en este navegador.');
    }
  }, []);

  return location;
};

export default useUserLocation;
