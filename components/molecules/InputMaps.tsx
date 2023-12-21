import React, { useId, useState, useEffect } from 'react';
import { combineClassnames } from '@/utils/functions';
import GoogleMapReact from 'google-map-react';
import { TbMapSearch } from 'react-icons/tb';
import Modal from './Modal';
import Select from '../atoms/Select';
import Button from '../atoms/Button';
import Spinner from './Spinner';

export type InputMapsStateType = null | {
  location: { lat: number; lng: number };
  text: string;
  value: string;
};

interface InputMapsProps {
  required?: boolean;
  disabled?: boolean;
  className?: string;
  label?: string;
  value?: InputMapsStateType;
  sizes: keyof typeof sizeClasses;
  setValue?: (value: InputMapsStateType) => void;
  onCheckResults?: (hasResults: boolean) => void;
}

const sizeClasses = {
  medium: 'p-2',
  small: 'p-1',
};

const getGeoAddress: any = (location: any) => {
  // @ts-ignore
  return new window.google.maps.Geocoder().geocode({ location }, (predictions: any) => (predictions?.length > 0 ? predictions[0] : []));
};

const getGeoCode: any = (placeId: string) => {
  // @ts-ignore
  return new window.google.maps.Geocoder().geocode({ placeId }, (predictions: any) => (predictions?.length > 0 ? predictions[0] : []));
};

const InputMaps = ({ label, className, sizes, value, setValue, onCheckResults, required, disabled }: InputMapsProps) => {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [marker, setMarker] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: -12.044062386030685, lng: -77.04334164909426 });
  const [currentZoom, setCurrentZoom] = useState(13);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Array<Record<string, any>>>([]);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>();
  const [auxValue, setAuxValue] = useState<InputMapsStateType>(null);

  useEffect(() => {
    if (!value) return;
    setAuxValue(value);
  }, [value]);

  const loadMap = (map: any, maps: any) => {
    const myMarker = new maps.Marker({
      map,
      draggable: true,
      icon: '/icons/marker.svg',
      position: { lat: 0, lng: 0 },
    });

    myMarker.addListener('dragend', async (e: any) => {
      const locationAddress = await getGeoAddress(e.latLng);
      setAuxValue({
        location: { lat: e.latLng.lat(), lng: e.latLng.lng() },
        text: locationAddress.results[0].formatted_address,
        value: locationAddress.results[0].place_id,
      });

      setCurrentLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    });
    map.addListener('click', async (e: any) => {
      myMarker?.setPosition(e.latLng);

      const locationAddress = await getGeoAddress(e.latLng);
      setAuxValue({
        location: { lat: e.latLng.lat(), lng: e.latLng.lng() },
        text: locationAddress.results[0].formatted_address,
        value: locationAddress.results[0].place_id,
      });
      setCurrentLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
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
            onCheckResults?.(true);
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
            onCheckResults?.(false);
            setOptions([]);
          }
        }
      );
    }, 800);
    setSearchTimeout(timeoutAux);
  };

  return (
    <React.Fragment>
      <div className="w-full">
        {label ? (
          <label htmlFor={id} className="font-semibold">
            {`${label} ${required ? '*' : ''}`}
          </label>
        ) : null}
        <div className="flex flex-row">
          <input
            id={id}
            onFocus={() => setOpen(true)}
            className={combineClassnames(
              'border-2 border-gray-200 rounded-md rounded-r-none shadow-sm w-full outline-none',
              sizeClasses[sizes],
              className
            )}
            readOnly
            placeholder="Ingresa una ubicación"
            disabled={disabled}
            required={required}
            value={value?.text ?? ''}
          />
          <button
            disabled={disabled}
            className={combineClassnames('border-2 border-gray-200 rounded-md rounded-l-none border-l-0 text-sm text-blue-400', sizeClasses[sizes])}
            onClick={() => setOpen(true)}
          >
            <TbMapSearch size={20} />
          </button>
        </div>
      </div>
      {open && (
        <Modal>
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
          />

          <Spinner loading={loading}>
            <div className="border h-[400px] w-[400px] md:w-[768px] rounded mt-5">
              <GoogleMapReact
                yesIWantToUseGoogleMapApiInternals
                center={currentLocation}
                zoom={currentZoom}
                onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
              />
            </div>
          </Spinner>
          <div className="mt-5 flex flex-row gap-2">
            <Button
              fullWidth
              variant="white"
              size="large"
              className="!border-black"
              onClick={() => {
                setAuxValue(value ?? null);
                setOpen(false);
              }}
            >
              Cancelar
            </Button>
            <Button
              fullWidth
              size="large"
              onClick={() => {
                setValue?.(auxValue);
                setOpen(false);
              }}
              disabled={!auxValue}
            >
              Aplicar
            </Button>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
};

InputMaps.defaultProps = {
  sizes: 'medium',
};

export default InputMaps;
