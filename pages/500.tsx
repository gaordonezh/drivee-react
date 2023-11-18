import React from 'react';
import Head from 'next/head';
import Button from '@/components/atoms/Button';
import { useRouter } from 'next/router';

const Page500 = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Ha ocurrido un error | 500</title>
        <link rel="icon" href="https://sitechecker.pro/wp-content/uploads/2023/07/500-status-code.png" />
        <meta name="robots" content="noindex"></meta>
        <meta name="googlebot" content="noindex"></meta>
      </Head>
      <div className="h-screen border-2 border-green-600 flex flex-col items-center justify-center">
        <h1 className="text-9xl font-bold">500</h1>
        <p className="text-xl text-gray-500">Ocurrió un error inesperado</p>
        <Button fullWidth variant="white" className="mt-5" size="large" onClick={() => router.push('/')}>
          Ir al inicio
        </Button>
      </div>
    </>
  );
};

export default Page500;
