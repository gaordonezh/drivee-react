import React from 'react';
import Container from '../molecules/Container';
import Card from '../atoms/Card';
import { IMAGE_LIST } from '@/utils/constants';
import { MdHome, MdLogout } from 'react-icons/md';
import { FaUserAlt, FaListAlt, FaCar } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { combineClassnames } from '@/utils/functions';
import useWindowDimensions from '@/hooks/useWindowDimensions';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  const { pathname } = useRouter();
  const { width } = useWindowDimensions();
  const isSmall = width < 1024;

  return (
    <>
      <div className="h-[85px] lg:h-[260px] bg-dashboard-hero bg-no-repeat bg-center bg-cover" />
      <Container className="p-3 lg:p-10">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-10">
          <div className="w-full lg:w-[300px]">
            <Card className="h-full flex-1 flex flex-row lg:flex-col justify-center items-center gap-5">
              <div
                className="hidden sm:block h-[50px] w-[50px] lg:h-[150px] lg:w-[150px] rounded-full shadow-md border-4 border-gray-300 shadow-gray-500 bg-no-repeat bg-cover bg-center"
                style={{ backgroundImage: `url(${IMAGE_LIST[0]})` }}
              />
              <div className="text-left lg:text-center hidden md:block lg:w-full flex-auto lg:flex-1">
                <h1 className="font-bold text-base lg:text-xl">Aldo Ordoñez</h1>
                <p className="font-semibold text-sm text-gray-500">gaordonezh@gmail.com</p>
              </div>
              <ul className="flex flex-row lg:flex-col gap-2 lg:w-full">
                <Item label={isSmall ? '' : 'Principal'} path="/dashboard" current={pathname} icon={<MdHome size={20} />} />
                <Item label={isSmall ? '' : 'Rentas'} path="/dashboard/orders" current={pathname} icon={<FaListAlt size={18} />} />
                <Item label={isSmall ? '' : 'Automóviles'} path="/dashboard/cars" current={pathname} icon={<FaCar size={20} />} />
                <Item label={isSmall ? '' : 'Perfil'} path="/dashboard/profile" current={pathname} icon={<FaUserAlt size={18} />} />
                <Item label={isSmall ? '' : 'Salir'} path="/auth/logout" current={pathname} icon={<MdLogout size={20} />} />
              </ul>
            </Card>
          </div>
          <div className="flex-1">
            <Card className={combineClassnames(isSmall ? 'dashboard-dynamic-container-mobile' : 'dashboard-dynamic-container-desktop')}>
              {children}
            </Card>
          </div>
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
