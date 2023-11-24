import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import React from 'react';

const Logout = () => {
  return (
    <Layout layout={LayoutEnum.AUTH}>
      <div>Logout</div>
    </Layout>
  );
};

export default Logout;
