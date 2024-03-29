import React, { useEffect, useState } from 'react';
import Select from '../atoms/Select';
import Spinner from './Spinner';
import GoogleMapReact from 'google-map-react';
import { InputMapsStateType } from './InputMaps';
import { combineClassnames } from '@/utils/functions';
import useUserLocation from '@/hooks/useUserLocation';

interface SearchLocationWithMapsProps {
  setAuxValue: (params: InputMapsStateType) => void;
  auxValue: InputMapsStateType;
  className?: string;
  error?: boolean;
  errorMessage?: string;
}

const getGeoAddress: any = (location: any) => {
  // @ts-ignore
  return new window.google.maps.Geocoder().geocode({ location }, (predictions: any) => (predictions?.length > 0 ? predictions[0] : []));
};

const getGeoCode: any = (placeId: string) => {
  // @ts-ignore
  return new window.google.maps.Geocoder().geocode({ placeId }, (predictions: any) => (predictions?.length > 0 ? predictions[0] : []));
};

const SearchLocationWithMaps = ({ setAuxValue, auxValue, className, error, errorMessage }: SearchLocationWithMapsProps) => {
  const useLocation = useUserLocation();
  const [marker, setMarker] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 0, lng: 0 });
  const [currentZoom, setCurrentZoom] = useState(13);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Array<Record<string, any>>>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();

  useEffect(() => {
    setCurrentLocation(useLocation);
  }, [useLocation]);

  const loadMap = (map: any, maps: any) => {
    const myMarker = new maps.Marker({
      map,
      draggable: true,
      icon: '/icons/marker.svg',
      position: { lat: 0, lng: 0 },
    });

    myMarker.addListener('dragend', async () => {
      const locationAddress = await getGeoAddress(myMarker.getPosition());
      const location = { lat: myMarker.getPosition().lat(), lng: myMarker.getPosition().lng() };
      setAuxValue({
        location,
        text: locationAddress.results[0].formatted_address,
        value: locationAddress.results[0].place_id,
      });
      setCurrentLocation(location);
    });
    map.addListener('click', async (e: any) => {
      myMarker?.setPosition(e.latLng);

      const locationAddress = await getGeoAddress(e.latLng);
      const location = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setAuxValue({
        location,
        text: locationAddress.results[0].formatted_address,
        value: locationAddress.results[0].place_id,
      });
      setCurrentLocation(location);
    });
    map.addListener('zoom_changed', () => setCurrentZoom(map.getZoom()));

    if (auxValue?.location) {
      myMarker?.setPosition(auxValue.location);
      setCurrentLocation(auxValue.location);
    }
    setMarker(myMarker);
  };

  const onSearch = async (input: string) => {
    if (!input) return;
    setLoading(true);

    clearTimeout(searchTimeout);
    const timeoutAux = setTimeout(() => {
      // @ts-ignore
      new google.maps.places.AutocompleteService().getPlacePredictions(
        { input: `${input}`, componentRestrictions: { country: 'PE' } }, // `${input} ${input ? commune : ''} ${input ? region : ''}`
        async (predictions: any) => {
          setLoading(false);
          if (predictions) {
            const optionsClean = predictions.map(async (resp: any) => {
              const location = await getGeoCode(resp.place_id);
              return {
                text: resp.description,
                value: resp.place_id,
                location: location?.results[0]?.geometry?.location?.toJSON() ?? [],
              };
            });
            setOptions(await Promise.all(optionsClean));
          } else {
            setOptions([]);
          }
        }
      );
    }, 800);
    setSearchTimeout(timeoutAux);
  };

  return (
    <div>
      <Select
        initialSearch={auxValue?.text}
        value={auxValue?.value}
        setValue={(_, newItem) => {
          setAuxValue(newItem as InputMapsStateType);
          marker?.setPosition(newItem.location);
          setCurrentLocation(newItem.location);
        }}
        data={options}
        keyToGey="value"
        keyToShow="text"
        placeholder="Buscar dirección"
        onSearch={onSearch}
        error={error}
        errorMessage={errorMessage}
      />

      <Spinner loading={loading}>
        <div className={combineClassnames('border rounded', className ?? 'h-[400px] w-[400px] md:w-[768px] mt-5')}>
          <GoogleMapReact
            yesIWantToUseGoogleMapApiInternals
            center={currentLocation}
            zoom={currentZoom}
            onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
          />
        </div>
      </Spinner>
    </div>
  );
};

export default SearchLocationWithMaps;
