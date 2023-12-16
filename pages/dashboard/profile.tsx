import React, { useState } from 'react';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import Tabs from '@/components/organisms/dashboard/Tabs';
import PersonalDocuments from '@/components/organisms/profile/PersonalDocuments';
import PersonalData from '@/components/organisms/profile/PersonalData';

const labels = ['Datos Personales', 'Documentos'];

const Profile = () => {
  const [tab, setTab] = useState(labels[0]);

  const tabs = {
    [labels[0]]: <PersonalData />,
    [labels[1]]: <PersonalDocuments />,
  };

  return (
    <Layout layout={LayoutEnum.DASHBOARD}>
      <Tabs labels={labels} active={tab} onChange={setTab} />
      {tabs[tab]}
    </Layout>
  );
};

export default Profile;
