import Card from '@/components/atoms/Card';
import List from '@/components/molecules/List';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import { IMAGE_LIST } from '@/utils/constants';
import React from 'react';

const Profile = () => {
  return (
    <Layout layout={LayoutEnum.DASHBOARD}>
      <Card className="flex flex-col items-center">
        <div className="flex flex-col items-center gap-5 max-w-md">
          <div
            className="h-[150px] w-[150px] rounded-full shadow-md border-4 border-gray-300 shadow-gray-500 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${IMAGE_LIST[0]})` }}
          />
          <List
            title="Datos personales"
            data={[
              { title: 'Nombres', value: 'Aldo' },
              { title: 'Apellidos', value: 'Ordoñez Hilario' },
              { title: 'Correo', value: 'Lorem ipsum dolor sit amet consectetur' },
              { title: 'Celular', value: 'Lorem ipsum dolor sit amet consectetur' },
              { title: 'Documento', value: 'Lorem ipsum dolor sit amet consectetur' },
              { title: 'Sexo', value: 'Lorem ipsum dolor sit amet consectetur' },
              { title: 'Fecha de nacimiento', value: 'Lorem ipsum dolor sit amet consectetur' },
              { title: 'Dirección', value: 'Lorem ipsum dolor sit amet consectetur' },
              { title: 'Ubicación', value: 'Lorem ipsum dolor sit amet consectetur' },
            ]}
          />
          <div className="border" style={{ height: '300px', width: '100%', borderRadius: '10px', overflow: 'hidden' }}>
            {/* <GoogleMaps /> */}
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default Profile;
