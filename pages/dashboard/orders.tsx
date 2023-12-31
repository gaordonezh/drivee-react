import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';

const Orders = () => {
  return (
    <Layout layout={LayoutEnum.DASHBOARD}>
      <h1>MY RENTALS</h1>
    </Layout>
  );
};

export default Orders;
