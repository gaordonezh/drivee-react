import { useState } from 'react';
import List from '@/components/molecules/List';
import { MdEdit } from 'react-icons/md';
import { useAppContext } from '@/context';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import { UserRolesEnum } from '@/store/user/user.enum';
import ProfileForm from '@/components/organisms/dashboard/ProfileForm';
import { USER_TDOC_TRANSLATE } from '@/utils/translate';
import moment from 'moment-timezone';
import { IoCarSportSharp, IoRocketSharp } from 'react-icons/io5';
import Button from '@/components/atoms/Button';
import { useAppDispatch } from '@/hooks/useStore';
import { updateUser } from '@/store/user/user.slice';
import server from '@/server';
import { staticGoogleData } from '@/utils/constants';
import { useSession } from 'next-auth/react';
import Spinner from '@/components/molecules/Spinner';
import ChangePassword from '@/components/organisms/dashboard/ChangePassword';
import Accordion from '@/components/atoms/Accordion';

const defaultText = '—';

const Profile = () => {
  const { user } = useAppContext();
  const { update } = useSession();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(false);
      const res = await dispatch(updateUser({ body: { roles: [UserRolesEnum.USER, UserRolesEnum.OWNER] }, user_id: user?._id! }));
      // @ts-ignore
      if (res.error) throw new Error('Not posible');

      const response = await server.post('auth/google', { email: user?.email, f_name: staticGoogleData.provider, ...staticGoogleData });
      await update({ info: response.data });
      window.location.reload();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout layout={LayoutEnum.DASHBOARD} authRoles={[UserRolesEnum.USER, UserRolesEnum.OWNER, UserRolesEnum.ADMIN]}>
      <div className="max-w-xl mx-auto">
        <div className="flex flex-col items-center gap-5 mb-5">
          <div
            className="h-[150px] w-[150px] rounded-full shadow-md border-4 border-gray-300 shadow-gray-500 bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url(${user?.photo ?? '/images/profile.png'})` }}
          />
          <p className="w-full text-gray-500">
            Hola <b>{user?.f_name}</b>, aquí puedes gestionar tu información personal.
          </p>
        </div>

        {user?.roles.includes(UserRolesEnum.USER) && user.roles.length === 1 && user.n_doc ? (
          <Accordion title="Sube de nivel" className="my-5">
            <Spinner loading={loading}>
              <div className="flex flex-col justify-center items-center gap-5">
                <IoCarSportSharp size={100} color="#3B82F6" />
                <p className="text-xl text-slate-800 font-semibold">¿Quieres dar en alquiler tus vehículos?</p>
                <Button size="large" onClick={handleUpdate}>
                  COMENZAR <IoRocketSharp />
                </Button>
              </div>
            </Spinner>
          </Accordion>
        ) : null}

        <Accordion title="Datos personales" className="my-5">
          {edit ? (
            <ProfileForm handleClose={() => setEdit(false)} />
          ) : (
            <div className="flex flex-col items-end">
              <Button onClick={() => setEdit(true)} size="small">
                Editar <MdEdit size={20} />
              </Button>
              <List
                showDivider={false}
                data={[
                  { title: 'Nombres', value: user?.f_name ?? defaultText },
                  { title: 'Apellidos', value: user?.l_name ?? defaultText },
                  { title: 'Correo', value: user?.email ?? defaultText },
                  { title: 'Fecha de nacimiento', value: user?.date_birth ? moment(user?.date_birth).format('DD/MM/YYYY') : defaultText },
                  { title: 'Celular', value: user?.phone ?? defaultText },
                  { title: 'Tipo documento', value: user?.t_doc ? USER_TDOC_TRANSLATE[user.t_doc] : defaultText },
                  { title: 'Nro documento', value: user?.n_doc ?? defaultText },
                  // { title: 'Sexo', value: user?.sex ? USER_SEX_TRANSLATE[user.sex] : defaultText },
                  { title: 'Dirección', value: user?.address?.address ?? defaultText },
                ]}
              />
            </div>
          )}
        </Accordion>

        <Accordion title="Cambiar contraseña" className="my-5">
          <ChangePassword />
        </Accordion>
      </div>
    </Layout>
  );
};

export default Profile;
