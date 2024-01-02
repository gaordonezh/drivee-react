import { useState } from 'react';
import Fab from '@/components/atoms/Fab';
import List from '@/components/molecules/List';
import { MdEdit } from 'react-icons/md';
import { useAppContext } from '@/context';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import { UserRolesEnum } from '@/store/user/user.enum';
import ProfileForm from '@/components/organisms/dashboard/ProfileForm';
import { RequestStatusEnum } from '@/interfaces/global.enum';
import Alert from '@/components/atoms/Alert';
import { useAppSelector } from '@/hooks/useStore';

const defaultText = '—';

const Profile = () => {
  const { user } = useAppContext();
  const [edit, setEdit] = useState(false);
  const { updateUserState } = useAppSelector((state) => state.user);

  return (
    <Layout layout={LayoutEnum.DASHBOARD} authRoles={[UserRolesEnum.USER, UserRolesEnum.OWNER, UserRolesEnum.ADMIN]}>
      <div className="flex flex-col items-center gap-5 max-w-xl mx-auto">
        {updateUserState === RequestStatusEnum.SUCCESS && (
          <Alert
            className="w-full"
            title="Tus datos se actualizaron correctamente"
            description="Recuerda que serán los cambios serán visibles la proxima vez que inicies sesión."
          />
        )}
        {edit ? (
          <ProfileForm handleClose={() => setEdit(false)} />
        ) : (
          <>
            <div
              className="h-[150px] w-[150px] rounded-full shadow-md border-4 border-gray-300 shadow-gray-500 bg-no-repeat bg-cover bg-center mt-5"
              style={{ backgroundImage: `url(${user?.photo ?? '/images/profile.png'})` }}
            />
            <List
              title="Datos personales"
              action={<Fab onClick={() => setEdit(true)} icon={<MdEdit size={20} />} size="medium" />}
              data={[
                { title: 'Nombres', value: user?.f_name ?? defaultText },
                { title: 'Apellidos', value: user?.l_name ?? defaultText },
                { title: 'Correo', value: user?.email ?? defaultText },
                { title: 'Fecha de nacimiento', value: user?.date_birth ?? defaultText },
                { title: 'Celular', value: user?.phone ?? defaultText },
                { title: 'Tipo documento', value: user?.t_doc ?? defaultText },
                { title: 'Nro documento', value: user?.n_doc ?? defaultText },
                { title: 'Sexo', value: user?.sex ?? defaultText },
                { title: 'Dirección', value: user?.address?.address ?? defaultText },
              ]}
            />
          </>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
