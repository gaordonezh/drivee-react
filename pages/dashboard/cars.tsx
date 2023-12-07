import React, { useState, FormEvent } from 'react';
import Card from '@/components/atoms/Card';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import { IMAGE_LIST } from '@/utils/constants';
import { IoMdAdd } from 'react-icons/io';
import Chip from '@/components/atoms/Chip';
import Fab from '@/components/atoms/Fab';
import { MdCarCrash, MdEdit, MdDelete } from 'react-icons/md';
import Drawer from '@/components/molecules/Drawer';
import CustomDropZone from '@/components/organisms/DropZone';
import { ModalStateEnum } from '@/interfaces/global.enum';
import Input from '@/components/atoms/Input';
import List from '@/components/molecules/List';
import Button from '@/components/atoms/Button';
import GoogleMapReact from 'google-map-react';

const getGeoAddress: any = (location: any) => {
  return new google.maps.Geocoder().geocode(
    {
      location,
    },
    (predictions) => (predictions?.length > 0 ? predictions[0] : [])
  );
};

const Cars = () => {
  const [modal, setModal] = useState<{ mode: null | ModalStateEnum; data: null }>({ mode: null, data: null });
  const [files, setFiles] = useState<Array<File>>([]);
  const [details, setDetails] = useState<Array<{ title: string; value: string }>>([]);
  const [values, setValues] = useState<{ title: string; value: string }>({ title: '', value: '' });
  const [currentLocation, setCurrentLocation] = useState({ lat: 4.626233, lng: -74.080653 });
  const [currentZoom, setCurrentZoom] = useState(13);

  const loadMap = (map: any, maps: any) => {
    const myRangeCircle = new google.maps.Circle({
      map,
      strokeColor: '#ec0091',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#ec0091',
      fillOpacity: 0.35,
      radius: 0,
      center: { lat: 0, lng: 0 },
    });

    const myMarker = new maps.Marker({
      map,
      draggable: true,
      icon: '/icons/marker.svg',
      position: { lat: 0, lng: 0 },
    });

    myMarker.addListener('dragend', async () => {
      myRangeCircle?.setCenter(myMarker.getPosition());

      const locationAddress = await getGeoAddress(myMarker.getPosition());
      console.log(1, {
        commercialAddress: locationAddress?.results[0]?.formatted_address ?? '',
        autocomplete: locationAddress?.results[0]?.formatted_address ?? '',
        location: JSON.stringify({
          lat: myMarker.getPosition().lat(),
          lng: myMarker.getPosition().lng(),
        }),
      });
      setCurrentLocation({
        lat: myMarker.getPosition().lat(),
        lng: myMarker.getPosition().lng(),
      });
    });
    map.addListener('click', async (e) => {
      myMarker?.setPosition(e.latLng);
      myRangeCircle?.setCenter(e.latLng);

      const locationAddress = await getGeoAddress(e.latLng);
      console.log(2, {
        commercialAddress: locationAddress?.results[0]?.formatted_address ?? '',
        autocomplete: locationAddress?.results[0]?.formatted_address ?? '',
        location: JSON.stringify({
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        }),
      });
      setCurrentLocation({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    });
    map.addListener('zoom_changed', () => setCurrentZoom(map.getZoom()));
    // if (form.getFieldValue('location')) {
    //   myMarker?.setPosition(JSON.parse(form.getFieldValue('location')));
    //   myRangeCircle?.setCenter(JSON.parse(form.getFieldValue('location')));
    //   myRangeCircle?.setRadius(form.getFieldValue('attendanceRatio') || 0);
    //   setCurrentLocation(JSON.parse(form.getFieldValue('location')));
    //   setUpdateZoom(true);
    // }
    // setMarker(myMarker);
    // setRangeCircle(myRangeCircle);
  };

  const handleClose = () => setModal({ mode: null, data: null });
  const handleClear = () => setValues({ title: '', value: '' });

  const handleDelete = (index: number) => {
    details.splice(index, 1);
    setDetails([...details]);
  };

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    details.push(values);
    setDetails([...details]);
    handleClear();
  };

  return (
    <Layout layout={LayoutEnum.DASHBOARD}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-10">
        {Array.from(Array(5).keys()).map((item) => (
          <Card key={item}>
            <div className="flex flex-col gap-5">
              <figure
                className="h-[200px] w-full rounded-md bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url(${IMAGE_LIST[item % 2 ? 1 : 2]})` }}
              />

              <Chip label="DISPONIBLE" size="small" className="!bg-green-500" />
              <div className="flex flex-wrap gap-1 justify-between">
                <h2 className="font-semibold">TOYOTA</h2>
                <p className="text-base text-gray-600">
                  <span className="font-bold">S/ 23.40</span> por hora
                </p>
              </div>
              <div className="flex flex-wrap gap-1 justify-between">
                <Fab
                  icon={<MdEdit size={20} />}
                  size="large"
                  title="Actualizar información"
                  onClick={() => setModal({ mode: ModalStateEnum.BOX, data: null })}
                />
                <Fab icon={<MdCarCrash size={20} />} size="large" title="Desactivar vehículo" />
                {/* <Fab icon={<CgDetailsMore size={20} />} size="large" title="Ver historial" /> */}
              </div>
            </div>
          </Card>
        ))}
        <Card
          className="cursor-pointer flex items-center justify-center hover:opacity-75 hover:shadow-lg"
          onClick={() => setModal({ mode: ModalStateEnum.BOX, data: null })}
        >
          <IoMdAdd size={50} className="hover:scale-105 hover:transition-all" />
        </Card>
      </div>

      {modal.mode === ModalStateEnum.BOX && (
        <Drawer position="right" onClose={handleClose}>
          <div className="flex flex-col gap-5">
            <div>
              <h1 className="font-bold text-xl">AGREGAR VEHÍCULO</h1>
              <p className="text-gray-500 text-sm">Todos los campos son requeridos (*)</p>
            </div>
            <Input label="Nombre del vehículo (*)" placeholder="Ej.: BMW M2 2020" />
            <Input label="Precio por horas S/ (*)" type="number" placeholder="Ej.: 12.50" />
            <Input label="Ubicación" placeholder="Ej.: Av. Los heroes 434" />
            <div className="border" style={{ height: '300px', width: '100%', borderRadius: '10px', overflow: 'hidden' }}>
              <GoogleMapReact
                yesIWantToUseGoogleMapApiInternals
                center={currentLocation}
                zoom={currentZoom}
                onGoogleApiLoaded={({ map, maps }) => loadMap(map, maps)}
              />
            </div>
            <div>
              <p className="font-semibold">Adjunte imágenes de tu coche (*)</p>
              <p className="text-gray-500 text-sm">Tiene que adjuntar 4 imágenes como mínimo.</p>
              <CustomDropZone files={files} setFiles={setFiles} max={7} maxFiles={5} />
            </div>
            <div className="">
              <List
                title="Detalles"
                subtitle="Especifique todos los detalles del vehículo para ofrecer una una mayor información al usuario."
                data={details.map((item, index) => ({
                  ...item,
                  iconNode: <MdDelete size={18} onClick={() => handleDelete(index)} className="cursor-pointer text-red-500" />,
                }))}
              />

              <Card className="mt-5">
                <form onSubmit={handleAdd}>
                  <Input
                    label="Título"
                    placeholder="Ej.: Asientos"
                    value={values.title}
                    onChange={(event) => setValues({ ...values, title: event.target.value })}
                    required
                  />
                  <Input
                    label="Valor"
                    placeholder="Ej.: 4"
                    value={values.value}
                    onChange={(event) => setValues({ ...values, value: event.target.value })}
                    required
                  />
                  <Button type="submit" className="!border-black mt-5" fullWidth variant="white" disabled={!values.title || !values.value}>
                    AGREGAR
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </Drawer>
      )}
    </Layout>
  );
};

export default Cars;
