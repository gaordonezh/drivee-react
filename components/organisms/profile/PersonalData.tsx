import { useState } from 'react';
import Fab from '@/components/atoms/Fab';
import Input from '@/components/atoms/Input';
import List from '@/components/molecules/List';
import { IMAGE_LIST } from '@/utils/constants';
import { MdEdit } from 'react-icons/md';
import Button from '@/components/atoms/Button';
import { useAppContext } from '@/context';
import { UserProps } from '@/store/user/user';

const defaultText = '—';

const PersonalData = () => {
  const { user } = useAppContext();
  const [edit, setEdit] = useState(false);
  const [fields, setFields] = useState<UserProps>({ ...user! });

  console.log(fields);

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
          { title: 'Nombres', value: edit ? <Input sizes="small" /> : fields.f_name },
          { title: 'Apellidos', value: edit ? <Input sizes="small" /> : fields.l_name || defaultText },
          { title: 'Correo', value: edit ? <Input sizes="small" /> : fields.email },
          { title: 'Celular', value: edit ? <Input sizes="small" /> : fields.phone || defaultText },
          { title: 'Documento', value: edit ? <Input sizes="small" /> : fields.t_doc ? `${fields.t_doc}: ${fields.n_doc}` : defaultText },
          { title: 'Sexo', value: edit ? <Input sizes="small" /> : fields.sex || defaultText },
          { title: 'Fecha de nacimiento', value: edit ? <Input sizes="small" /> : fields.date_birth || defaultText },
          { title: 'Dirección', value: edit ? <Input sizes="small" /> : fields.address ? fields.address.address : defaultText },
        ]}
      />
      {edit ? <Button onClick={() => setEdit(false)}>GUARDAR CAMBIOS</Button> : null}
    </div>
  );
};

export default PersonalData;
