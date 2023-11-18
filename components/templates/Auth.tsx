import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex h-auto lg:h-screen">
      <div className="auth__image">
        <div className="flex flex-col items-center gap-1 max-w-sm text-center">
          <h1 className="text-white font-normal text-4xl">
            Bienvenido a <span className="font-extrabold">Drivee</span>
          </h1>
          <p className="text-white text-xl mt-5 font-medium">El mejor mercado de vehículos compartidos</p>
          <p className="text-white text-sm mt-10 font-light">
            ¿Tiene un vehículo? Gana dinero como Anfitrión. Alquile el coche de sus sueños como invitado.
          </p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-3 md:p-0 md:py-10">
        <div className="max-w-xs">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
