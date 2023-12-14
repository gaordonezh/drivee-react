import Fab from '@/components/atoms/Fab';
import List from '@/components/molecules/List';
import { IMAGE_LIST } from '@/utils/constants';
import { MdEdit } from 'react-icons/md';

const PersonalData = () => {
  return (
    <div className="flex flex-col items-center gap-5 max-w-md">
      <div
        className="h-[150px] w-[150px] rounded-full shadow-md border-4 border-gray-300 shadow-gray-500 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${IMAGE_LIST[0]})` }}
      />
      <List
        title="Datos personales"
        action={<Fab icon={<MdEdit size={20} />} size="medium" />}
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
  );
};

export default PersonalData;
