import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import Link from 'next/link';
import React from 'react';

const Dashboard = () => {
  return (
    <Layout layout={LayoutEnum.DASHBOARD}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-row gap-10">
          <div className="border border-red-500 flex-1">CARD 1</div>
          <div className="border border-red-500 flex-1">CARD 2</div>
          <div className="border border-red-500 flex-1">CARD 3</div>
        </div>
        <div className="border border-red-500">
          <Link href="/" className="bg-green-400">
            TO PUBLIC
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
