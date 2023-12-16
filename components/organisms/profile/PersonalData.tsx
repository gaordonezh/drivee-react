import { useState } from 'react';
import Fab from '@/components/atoms/Fab';
import Input from '@/components/atoms/Input';
import List from '@/components/molecules/List';
import { IMAGE_LIST } from '@/utils/constants';
import { MdEdit } from 'react-icons/md';
import Button from '@/components/atoms/Button';

const PersonalData = () => {
  const [edit, setEdit] = useState(false);

  return (
    <div className="flex flex-col items-center gap-5">
      <div
        className="h-[150px] w-[150px] rounded-full shadow-md border-4 border-gray-300 shadow-gray-500 bg-no-repeat bg-cover bg-center mt-5"
        style={{ backgroundImage: `url(${IMAGE_LIST[0]})` }}
      />
      <List
        title="Datos personales"
        action={edit ? undefined : <Fab onClick={() => setEdit(true)} icon={<MdEdit size={20} />} size="medium" />}
        data={[
          { title: 'Nombres', value: edit ? <Input sizes="small" /> : 'Aldo' },
          { title: 'Apellidos', value: edit ? <Input sizes="small" /> : 'Ordoñez Hilario' },
          { title: 'Correo', value: edit ? <Input sizes="small" /> : 'Lorem ipsum dolor sit amet consectetur' },
          { title: 'Celular', value: edit ? <Input sizes="small" /> : 'Lorem ipsum dolor sit amet consectetur' },
          { title: 'Documento', value: edit ? <Input sizes="small" /> : 'Lorem ipsum dolor sit amet consectetur' },
          { title: 'Sexo', value: edit ? <Input sizes="small" /> : 'Lorem ipsum dolor sit amet consectetur' },
          { title: 'Fecha de nacimiento', value: edit ? <Input sizes="small" /> : 'Lorem ipsum dolor sit amet consectetur' },
          { title: 'Dirección', value: edit ? <Input sizes="small" /> : 'Lorem ipsum dolor sit amet consectetur' },
        ]}
      />
      {edit ? <Button onClick={() => setEdit(false)}>GUARDAR CAMBIOS</Button> : null}
    </div>
  );
};

export default PersonalData;
