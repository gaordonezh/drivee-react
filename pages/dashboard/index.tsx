import Layout from '@/components/templates';
import { useAppContext } from '@/context';
import LayoutEnum from '@/enums/layout.enum';
import { UserRolesEnum } from '@/store/user/user.enum';

const Dashboard = () => {
  const { user } = useAppContext();

  return (
    <Layout layout={LayoutEnum.DASHBOARD} authRoles={[UserRolesEnum.USER, UserRolesEnum.OWNER, UserRolesEnum.ADMIN]}>
      <h1 className="text-3xl font-bold">Hola {user?.f_name}</h1>
      <p className="font-normal text-slate-500">
        Bienvenido de nuevo a <b>Drivee</b>. Aquí podrás gestionar todas tus transacciones.
      </p>
      <img src="/logo/drivee-logo-light.png" alt="Drivee" className="w-full h-auto" />
    </Layout>
  );
};

export default Dashboard;
