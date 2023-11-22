import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import Link from 'next/link';
import React from 'react';

const Dashboard = () => {
  return (
    <Layout layout={LayoutEnum.DASHBOARD}>
      <div>
        <Link href="/" className="bg-green-400">
          TO PUBLIC
        </Link>
      </div>
    </Layout>
  );
};

export default Dashboard;
