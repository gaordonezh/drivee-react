import { useState } from 'react';
import { NextPageContext } from 'next';
import Container from '@/components/molecules/Container';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import Fab from '@/components/atoms/Fab';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';
import DetailsForm from '@/components/organisms/DetailsForm';
import Comments from '@/components/organisms/comments/Comments';
import server from '@/server';
import { VehicleProps } from '@/store/vehicle/vehicle';

const DetailsPage = ({ _id, name, description, images, pricexhour, address, details }: VehicleProps) => {
  const [index, setIndex] = useState(0);

  const handleChange = (action: 'next' | 'prev') => {
    const total = images.length - 1;
    if (action === 'next') setIndex(index === total ? 0 : index + 1);
    if (action === 'prev') setIndex(index === 0 ? total : index - 1);
  };

  const selected = images[index];

  return (
    <Layout layout={LayoutEnum.PUBLIC} title={name} description={description} image={images[0]}>
      <Container className="flex flex-col gap-10 p-5 md:gap-20 md:p-10">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-2xl md:text-4xl">{name}</h1>
          <p className="text-gray-700">{description}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-[50%] lg:w-[60%] flex flex-col gap-5">
            <div className="rounded-xl bg-slate-200 h-[300px] md:h-[400px] lg:h-[500px] relative overflow-hidden">
              <div className="z-10 absolute top-0 left-0 bottom-0 flex items-center px-5">
                <Fab icon={<FaArrowLeft size={30} color="#757575" />} size="large" className="bg-white" onClick={() => handleChange('prev')} />
              </div>
              <ItemImage img={selected} />
              <div className="z-10 absolute top-0 right-0 bottom-0 flex items-center px-5">
                <Fab icon={<FaArrowRight size={30} color="#757575" />} size="large" className="bg-white" onClick={() => handleChange('next')} />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {images.slice(index, index + 3).map((item) => (
                <div className="bg-slate-200 flex-1 rounded-lg h-[100px] md:h-[150px] lg:h-[200px] overflow-hidden" key={item}>
                  <ItemImage img={item} />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-[50%] lg:w-[40%] rounded-xl bg-white p-5 xl:p-10 border border-gray-300">
            <DetailsForm price={pricexhour} location={address} />
          </div>
        </div>

        <div>
          <p className="font-bold text-2xl mb-5">Especificaciones</p>
          <ul className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-2">
            {details.map((item, index) => (
              <li key={index} className="border-b">
                <p className="text-gray-600 text-sm">{item.title}</p>
                <p className="text-gray-400 text-xs">{item.value}</p>
              </li>
            ))}
          </ul>
        </div>

        <Comments />
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const code = context.query.code;
  if (!code) return { redirect: { permanent: false, destination: '/' } };

  const res = await server.get<VehicleProps>(`/vehicles/list/${code}`);
  if (!res.data?._id) return { redirect: { permanent: false, destination: '/' } };

  return { props: res.data };
}

export default DetailsPage;

const ItemImage = ({ img }: { img: string }) => (
  <div className="h-full w-full bg-no-repeat bg-contain bg-center" style={{ backgroundImage: `url(${img})` }} />
);
