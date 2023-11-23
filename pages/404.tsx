import React from 'react';
import Head from 'next/head';
import Button from '@/components/atoms/Button';
import { useRouter } from 'next/router';

const Page404 = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Página no encontrada | 404</title>
        <link rel="icon" href="https://sitechecker.pro/wp-content/uploads/2023/06/404-status-code.png" />
        <meta name="robots" content="noindex" />
        <meta name="googlebot" content="noindex" />
      </Head>
      <div className="h-screen flex items-center justify-center">
        <div className="text-center py-10">
          <h1 className="text-9xl font-bold">404</h1>
          <p className="text-xl text-gray-500">Página no encontrada</p>
          <p className="mt-5 text-normal text-gray-700">Ingresaste a una página no existente.</p>
          <div className="flex flex-col mt-10 md:flex-row justify-center gap-10">
            <Button variant="dark" size="large" onClick={() => router.push('/')}>
              Ir al inicio
            </Button>
            <Button variant="white" size="large" onClick={() => router.back()}>
              Volver atrás
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page404;
