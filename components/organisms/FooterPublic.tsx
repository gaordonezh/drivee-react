import React from 'react';
import Container from '../molecules/Container';
import Link from 'next/link';

const FooterPublic = () => (
  <footer className="bg-black px-10 py-20">
    <Container>
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="flex-1">
          <h1 className="text-white text-2xl font-extrabold">Drivee</h1>
          <p className="text-gray-400 text-sm mt-5">
            Está a sólo un <b>Drivee</b> de distancia. Toma el control de tu viaje hoy
          </p>
        </div>
        <div className="flex-1">
          <h1 className="text-white text-lg font-extrabold">Enlaces de interés</h1>
          <ul className="mt-5">
            <li>
              <Link className="text-gray-400 hover:text-gray-300" href="/dashboard">
                Main
              </Link>
            </li>
            <li>
              <Link className="text-gray-400 hover:text-gray-300" href="/dashboard">
                Other
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <h1 className="text-white text-lg font-extrabold">Other</h1>
          <p className="text-gray-400 text-sm mt-5">Está a sólo un Drivee de distancia. Toma el control de tu viaje hoy</p>
        </div>
        <div className="flex-1">
          <h1 className="text-white text-lg font-extrabold">Other</h1>
          <p className="text-gray-400 text-sm mt-5">Está a sólo un Drivee de distancia. Toma el control de tu viaje hoy</p>
        </div>
      </div>
    </Container>
  </footer>
);

export default FooterPublic;
