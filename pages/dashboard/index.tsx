import Alert from '@/components/atoms/Alert';
import Divider from '@/components/protons/Divider';
import Layout from '@/components/templates';
import { useAppContext } from '@/context';
import LayoutEnum from '@/enums/layout.enum';
import { UserRolesEnum } from '@/store/user/user.enum';

const Dashboard = () => {
  const { user } = useAppContext();

  return (
    <Layout layout={LayoutEnum.DASHBOARD} authRoles={[UserRolesEnum.USER, UserRolesEnum.OWNER, UserRolesEnum.ADMIN]}>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-3xl font-bold">Hola {user?.f_name}</h1>
          <p className="font-normal text-slate-500">
            Bienvenido de nuevo a <b>Drivee</b>. Aquí podrás gestionar todas tus transacciones.
          </p>
        </div>
        <Divider />
        <Alert
          title="Documentos personales"
          description="Te queda pendiente adjuntar tus documentos personales. Puedes realizarlo en el apartado de 'Mis documentos'."
          variant="warning"
        />
        <Alert
          title="Documentos vehículares"
          description="Te queda pendiente adjuntar algunos documentos de tu vehículo. Puedes realizarlo en el apartado de 'Automóviles'."
          variant="warning"
        />
      </div>
    </Layout>
  );
};

export default Dashboard;
