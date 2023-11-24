import React from 'react';
import Container from '../molecules/Container';
import Card from '../atoms/Card';
import { IMAGE_LIST } from '@/utils/constants';
import { MdHome, MdLogout } from 'react-icons/md';
import { FaUserAlt, FaListAlt, FaCar } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { combineClassnames } from '@/utils/functions';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  const { pathname } = useRouter();

  return (
    <>
      <div className="h-[260px] bg-dashboard-hero bg-no-repeat bg-center bg-cover" />
      <Container className="p-5 lg:p-10">
        <div className="flex flex-row gap-10">
          <div className="flex-1">
            <Card className="flex-1 flex flex-col justify-center items-center gap-5">
              <div
                className="h-[150px] w-[150px] rounded-full shadow-md border-4 border-gray-300 shadow-gray-500 bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url(${IMAGE_LIST[0]})` }}
              />
              <div className="text-center">
                <h1 className="font-bold text-xl">Aldo Ordoñez</h1>
                <p className="font-semibold text-sm text-gray-500">gaordonezh@gmail.com</p>
              </div>
              <ul className="w-full flex flex-col gap-2">
                <Item label="Principal" path="/dashboard" current={pathname} icon={<MdHome size={20} />} />
                <Item label="Perfil" path="/dashboard/profile" current={pathname} icon={<FaUserAlt size={18} />} />
                <Item label="Servicios" path="/dashboard/orders" current={pathname} icon={<FaListAlt size={18} />} />
                <Item label="Automóviles" path="/dashboard/cars" current={pathname} icon={<FaCar size={20} />} />
                <Item label="Salir" path="/auth/logout" current={pathname} icon={<MdLogout size={20} />} />
              </ul>
            </Card>
          </div>
          <div className="flex-[3]">{children}</div>
        </div>
      </Container>
    </>
  );
};

export default PrivateLayout;

const active = { li: 'bg-black', a: 'text-white' };
const inactive = { li: 'bg-white', a: 'text-black' };
const Item = ({ path, label, current, icon }: { path: string; label: string; current: string; icon: JSX.Element }) => {
  const isActive = path === current;

  return (
    <li className={combineClassnames('rounded overflow-hidden', isActive ? active.li : inactive.li)}>
      <Link className={combineClassnames('px-5 py-2 font-bold items-center gap-2 flex flex-row', isActive ? active.a : inactive.a)} href={path}>
        {icon}
        {label}
      </Link>
    </li>
  );
};
