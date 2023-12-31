import Card from '@/components/atoms/Card';
import TableResume from '@/components/organisms/dashboard/TableResume';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { IconType } from 'react-icons/lib';

const Dashboard = () => {
  return (
    <Layout layout={LayoutEnum.DASHBOARD}>
      <div className="flex flex-col gap-5 border border-red-500">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <ResumeItem icon={AiOutlineUnorderedList} title="03" subtitle="Total servicios" />
          <ResumeItem icon={AiOutlineUnorderedList} title="12" subtitle="Servicios cancelados" />
          <ResumeItem icon={AiOutlineUnorderedList} title="02" subtitle="Solicitudes nuevas" />
        </div>

        <TableResume />
      </div>
    </Layout>
  );
};

export default Dashboard;

const ResumeItem = ({ icon: Icon, title, subtitle }: { icon: IconType; title: string; subtitle: string }) => (
  <Card className="flex flex-col gap-3">
    <Icon size={40} color="#2F2F2F" />
    <p className="font-bold text-4xl">{title}</p>
    <p className="text-gray-500">{subtitle}</p>
  </Card>
);
