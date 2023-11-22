import { useState } from 'react';
import { NextPageContext } from 'next';
import Container from '@/components/molecules/Container';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import { IMAGE_LIST } from '@/utils/constants';
import Fab from '@/components/atoms/Fab';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import DetailsForm from '@/components/organisms/DetailsForm';

interface DetailsPageProps {
  name: string;
  description: string;
  details: [{ key: string; value: string }];
  id: string;
  image: string;
  images: Array<string>;
  price: number;
}

const DetailsPage = ({ name, description, details, id, images, image, price }: DetailsPageProps) => {
  const [index, setIndex] = useState(0);

  const handleChange = (action: 'next' | 'prev') => {
    const total = images.length - 1;
    if (action === 'next') setIndex(index === total ? 0 : index + 1);
    if (action === 'prev') setIndex(index === 0 ? total : index - 1);
  };

  const selected = images[index];

  return (
    <Layout layout={LayoutEnum.PUBLIC} title={name} description={description} image={image} key={id}>
      <Container className="flex flex-col gap-10 py-5 px-10 md:gap-20 md:py-10 md:px-20 ">
        <h1 className="font-bold text-2xl md:text-4xl">{name}</h1>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-[50%] lg:w-[60%] flex flex-col gap-5">
            <div className="rounded-xl bg-slate-200 h-[300px] md:h-[400px] lg:h-[500px] relative overflow-hidden">
              <div className="z-10 absolute top-0 left-0 bottom-0 flex items-center px-5">
                <Fab icon={<FaArrowLeft size={30} color="#757575" />} size="large" className="bg-white" onClick={() => handleChange('prev')} />
              </div>
              <Image img={selected} />
              <div className="z-10 absolute top-0 right-0 bottom-0 flex items-center px-5">
                <Fab icon={<FaArrowRight size={30} color="#757575" />} size="large" className="bg-white" onClick={() => handleChange('next')} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {images.slice(index, index + 3).map((item) => (
                <div className="bg-slate-200 flex-1 rounded-lg h-[100px] md:h-[150px] lg:h-[200px] overflow-hidden" key={item}>
                  <Image img={item} />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-[50%] lg:w-[40%] rounded-xl bg-white p-5 xl:p-10 border border-gray-300">
            <DetailsForm price={price} />
          </div>
        </div>

        <p className="text-gray-700">{description}</p>

        <div>
          <p className="font-bold text-2xl mb-5">Especificaciones</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-16 gap-y-2">
            {details.map((item) => (
              <li key={item.key} className="flex justify-between border-b">
                <p className="text-gray-500">{item.key}</p>
                <p className="text-gray-500">{item.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const code = context.query.code;
  if (!code) return { redirect: { permanent: false, destination: '/' } };

  const data = {
    id: code,
    price: 36.65,
    name: 'BMW M2 2020',
    description:
      'EL BMW ME es la versión de alto rendimiento del cupé de 2 puertas de la serie 2. La primera generación del M2 es el F87 COUPÉ y está propulsado por turboalimentado. EL BMW ME es la versión de alto rendimiento del cupé de 2 puertas de la serie 2. La primera generación del M2 es el F87 COUPÉ y está propulsado por turboalimentado. EL BMW ME es la versión de alto rendimiento del cupé de 2 puertas de la serie 2. La primera generación del M2 es el F87 COUPÉ y está propulsado por turboalimentado.',
    image: IMAGE_LIST[3],
    images: IMAGE_LIST,
    details: [
      { key: 'Asientos', value: '4' },
      { key: 'Puertas', value: '2' },
      { key: 'Transmisión', value: 'Automatico' },
      { key: 'Año', value: '2020' },
      { key: 'Combustible', value: 'Híbrido' },
      { key: 'Caballos de fuerza', value: '400' },
    ],
  };

  return { props: { ...data } };
}

export default DetailsPage;

const Image = ({ img }: { img: string }) => (
  <div className="h-full w-full bg-no-repeat bg-contain bg-center" style={{ backgroundImage: `url(${img})` }} />
);
