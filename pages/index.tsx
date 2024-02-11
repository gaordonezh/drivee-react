import React, { useState } from 'react';
import Button from '@/components/atoms/Button';
import Container from '@/components/molecules/Container';
import { BsSearch, BsArrowUpRight } from 'react-icons/bs';
import DescriptionPublicItem from '@/components/organisms/DescriptionPublicItem';
import Carousel from '@/components/organisms/Carousel';
import { useRouter } from 'next/router';
import { objectCleaner } from '@/utils/functions';
import GeneralInputFilters, { FieldsFiltersType } from '@/components/organisms/GeneralInputFilters';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';

const opinions = [
  {
    id: 1,
    name: 'María López',
    title: 'Servicio excepcional y sin complicaciones',
    comment:
      'Increíble experiencia utilizando esta plataforma de alquiler de vehículos. Necesitaba un coche para un viaje de negocios y la gestión a través de la plataforma fue impecable. El proceso de reserva fue rápido y sencillo, y el coche estaba en excelentes condiciones. Definitivamente volveré a utilizar este servicio en el futuro.',
  },
  {
    id: 2,
    name: 'Juan Pérez',
    title: 'La mejor opción para aventuras al aire libre',
    comment:
      'Alquilé una camioneta para un viaje de aventura por la montaña y fue perfecto. La plataforma fue fácil de usar, el proceso de alquiler fue rápido y el vehículo estaba en excelentes condiciones. ¡Altamente recomendado para aventuras al aire libre!',
  },
  {
    id: 3,
    name: 'Ana Martínez',
    title: 'Comodidad y espacio para toda la familia',
    comment:
      'Utilizamos esta plataforma para alquilar un SUV para nuestras vacaciones familiares y quedamos encantados. Fue fácil encontrar un vehículo espacioso y cómodo, y el proceso de reserva fue rápido y sin complicaciones. Sin duda utilizaremos esta plataforma en nuestro próximo viaje en familia.',
  },
];

const Home = () => {
  const router = useRouter();
  const [fields, setFields] = useState<FieldsFiltersType>({ location: null, startAt: '', endAt: '' });

  const handleRedirect = () => {
    const queryParams = { ...fields, location: fields.location ? JSON.stringify(fields.location) : null };
    router.push({ pathname: '/booking', query: objectCleaner(queryParams) });
  };

  const setVehicleParam = (type: 'car' | 'bike') => {
    router.push({ pathname: '/booking', query: { type } });
  };

  return (
    <Layout layout={LayoutEnum.PUBLIC}>
      <div className="hero__image">
        <div className="hero__height">
          <Container className="w-full">
            <div className="flex flex-col md:flex-row px-10">
              <div className="flex-1 flex flex-col gap-10">
                <h1 className="text-white text-xl md:text-5xl">
                  Consigue el vehículo de tus sueños con <b>Drivee</b>
                </h1>
                <p className="text-gray-300 text-sm md:text-lg">
                  Contribuye al cambio positivo y logra nuestros objetivos de sostenibilidad con muchas acciones extraordinarias.
                </p>
                <div className="flex flex-col md:flex-row gap-5">
                  <Button variant="white" size="large" onClick={() => setVehicleParam('car')}>
                    Alquilar un carro
                  </Button>
                  <Button variant="outlined" size="large" onClick={() => setVehicleParam('bike')}>
                    Alquilar una moto
                  </Button>
                </div>
              </div>
              <div className="flex-1" />
            </div>
          </Container>
        </div>
      </div>

      <Container className="relative h-auto md:h-[125px] lg:h-[75px]">
        <div className="relative md:absolute mt-10 bottom-0 right-0 left-0 bg-white rounded-md shadow-md shadow-gray-500 mx-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-10">
            <GeneralInputFilters
              location={fields.location}
              startAt={fields.startAt}
              endAt={fields.endAt}
              setFields={(newParams) => setFields({ ...fields, ...newParams })}
            />
            <div className="flex items-end">
              <Button fullWidth size="large" onClick={handleRedirect}>
                BUSCAR <BsSearch />
              </Button>
            </div>
          </div>
        </div>
      </Container>

      <Container className="px-10 mb-20">
        <DescriptionPublicItem
          reverse
          className="my-20"
          title="Alquila un carro"
          tags={['COMFORT', 'PRESTIGIO', 'LUJO']}
          description="Reservar un coche sin conductor es sencillo y fácil. Puede explorar nuestra selección de vehículos en línea, elegir el automóvil que mejor se adapte a sus necesidades y reservarlo durante el tiempo que elija. Nuestra plataforma fácil de usar le permite administrar su reserva y ver su historial de viajes con facilidad."
          buttonProps={{ label: 'Alquilar un carro', link: '/booking?type=car' }}
          imageProps={{ src: '/images/rent-a-car.jpg', alt: 'Alquilar un carro' }}
        />
        <DescriptionPublicItem
          title="Alquila una moto"
          tags={['PRESTIGIO', 'LUJO']}
          description="Reservar una moto es sencillo y fácil. Puede explorar nuestra selección de vehículos en línea, elegir el automóvil que mejor se adapte a sus necesidades y reservarlo durante el tiempo que elija. Nuestra plataforma fácil de usar le permite administrar su reserva y ver su historial de viajes con facilidad."
          buttonProps={{ label: 'Alquilar una moto', link: '/booking?type=bike' }}
          imageProps={{ src: '/images/rent-a-bike.jpg', alt: 'Alquilar una motocicleta' }}
        />
        <DescriptionPublicItem
          reverse
          className="mt-20"
          title="¿Quieres compartir tu vehículo?"
          description="Usaremos la ubicación de su automóvil para calcular su bonificación que recibirá. Cada código postal pertenecerá a una de las cinco zonas. Las zonas se basan en la demanda de automóviles de los huéspedes: una mayor demanda de huéspedes significa una zona más alta y mayores bonificaciones para los automóviles. La zona 1 obtiene la bonificación más alta, mientras que las zonas 4 y 5 no son elegibles para la bonificación a bordo"
          buttonProps={{
            label: (
              <>
                Ver más <BsArrowUpRight />
              </>
            ),
            link: '/share',
          }}
          imageProps={{ src: '/images/car-owner.jpg', alt: 'Dueño del vehiculo' }}
        />
        <div className="mt-20 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h3 className="text-3xl font-bold">¿Por qué elegirnos?</h3>
            <p className="text-gray-500 mt-5">
              Nos enorgullecemos de ofrecer una experiencia confiable y de calidad. Desde coches compactos hasta vehículos de lujo, nuestra amplia
              gama de opciones garantiza encontrar el vehículo perfecto para tus necesidades, todo a precios competitivos y transparentes. Con
              rigurosas inspecciones de seguridad y mantenimiento regular en todos nuestros vehículos, junto con un proceso de reserva en línea fácil
              y rápido, estamos comprometidos a proporcionarte una experiencia de alquiler sin complicaciones y segura en cada viaje.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <div className="shadow-md shadow-gray-500 grid grid-cols-1 md:grid-cols-3 rounded-2xl max-w-[450px] p-5 gap-5">
              <div className="text-center">
                <h4 className="text-3xl font-extrabold">100 +</h4>
                <p className="text-gray-500 text-sm">Operaciones finalizadas</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-extrabold">75 +</h4>
                <p className="text-gray-500 text-sm">Cliente felices</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl font-extrabold">1 +</h4>
                <p className="text-gray-500 text-sm">Años de experiencia</p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="bg-gray-100 pb-32">
        <Container className="px-10">
          <div className="text-center pt-20 pb-10">
            <h3 className="text-xl md:text-3xl lg:text-5xl font-bold">Lo que dicen nuestros clientes...</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
            {opinions.map((item) => (
              <div key={item.id} className="rounded-xl bg-slate-800 shadow-md shadow-gray-500 overflow-hidden flex flex-col items-end justify-end">
                <div className="p-5 bg-people-say flex flex-col gap-3 h-full">
                  <p className="text-white font-bold text-base">{item.title}</p>
                  <p className="text-white font-light text-base">{item.comment}</p>
                  <p className="flex-1"></p>
                  <p className="text-white font-semibold text-base">—— {item.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h3 className="text-xl md:text-3xl lg:text-5xl font-bold mt-32 mb-20">Principales lugares donde brindamos nuestros servicios en Perú</h3>
            <Carousel />
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default Home;
