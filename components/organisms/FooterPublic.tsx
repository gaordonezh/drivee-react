import React from 'react';
import Container from '../molecules/Container';
import Link from 'next/link';
import Image from 'next/image';

const FooterPublic = () => (
  <footer className="bg-black px-10 py-20">
    <Container>
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="flex-1">
          <Image
            src="/logo/drivee-logo-dark.png"
            alt="Drivee logo"
            width={100}
            height={100}
            loading="lazy"
            className="border-2 border-gray-500 rounded-full mt-5"
          />

          <p className="text-gray-400 text-sm mt-5">
            Está a sólo un <b>Drivee</b> de distancia. Toma el control de tu viaje hoy
          </p>
        </div>
        <div className="flex-1">
          <h1 className="text-white text-lg font-extrabold">Enlaces de interés</h1>
          <ul className="mt-5 flex flex-col gap-5">
            <li>
              <Link className="text-gray-400 hover:text-gray-300" href="/">
                Drivee
              </Link>
            </li>
            <li>
              <Link className="text-gray-400 hover:text-gray-300" href="/booking">
                Alquila un vehículo
              </Link>
            </li>
            <li>
              <Link className="text-gray-400 hover:text-gray-300" href="/share">
                Conviertete en socio
              </Link>
            </li>
            <li>
              <Link className="text-gray-400 hover:text-gray-300" href="/rent">
                Únete a nosotros
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <h1 className="text-white text-lg font-extrabold mb-5">Contacto</h1>
          <Link className="text-gray-400 text-sm" href="mailto:drivee.services@gmail.com">
            drivee.services@gmail.com
          </Link>
        </div>
      </div>
    </Container>
  </footer>
);

export default FooterPublic;
