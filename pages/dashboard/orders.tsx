import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import { UserRolesEnum } from '@/store/user/user.enum';

const Orders = () => {
  return (
    <Layout layout={LayoutEnum.DASHBOARD} authRoles={[UserRolesEnum.USER, UserRolesEnum.OWNER, UserRolesEnum.ADMIN]}>
      <h1>MY RENTALS</h1>
    </Layout>
  );
};

export default Orders;
