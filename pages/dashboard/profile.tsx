import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import React from 'react';

const Profile = () => {
  return (
    <Layout layout={LayoutEnum.DASHBOARD}>
      <div>PROFILE</div>
    </Layout>
  );
};

export default Profile;
