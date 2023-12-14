import React, { useState } from 'react';
import Card from '@/components/atoms/Card';
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
      <Card className="flex flex-col items-center">
        <Tabs labels={labels} active={tab} onChange={setTab} />
        {tabs[tab]}
      </Card>
    </Layout>
  );
};

export default Profile;
