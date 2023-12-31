import React, { useState } from 'react';
import TableOrders from '@/components/organisms/dashboard/TableOrders';
import Tabs from '@/components/organisms/dashboard/Tabs';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';

const labels = ['Pendientes', 'Completados', 'Cancelados'];

const Rentals = () => {
  const [tab, setTab] = useState(labels[0]);

  const tabs = {
    [labels[0]]: <TableOrders title="Servicios pendientes" />,
    [labels[1]]: <TableOrders title="Servicios completados" />,
    [labels[2]]: <TableOrders title="Servicios cancelados" />,
  };

  return (
    <Layout layout={LayoutEnum.DASHBOARD}>
      <Tabs labels={labels} active={tab} onChange={setTab} />
      <div className="border border-gray-200 border-t-0 p-2">{tabs[tab]}</div>
    </Layout>
  );
};

export default Rentals;
