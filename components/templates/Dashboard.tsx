import React from 'react';
import Container from '../molecules/Container';
import Card from '../atoms/Card';
import { MdFactCheck } from 'react-icons/md';
import { FaListAlt, FaCar, FaThList, FaHome } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { combineClassnames } from '@/utils/functions';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import HeaderPublic from '../organisms/HeaderPublic';
import { useAppContext } from '@/context';
import { UserRolesEnum } from '@/store/user/user.enum';
import { IoDocumentsSharp } from 'react-icons/io5';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  const { pathname } = useRouter();
  const { width } = useWindowDimensions();
  const { user } = useAppContext();
  const isSmall = width < 1024;

  return (
    <>
      <HeaderPublic />
      <div className="h-[85px] lg:h-[260px] bg-dashboard-hero bg-no-repeat bg-center bg-cover" />
      <Container className="p-3 lg:p-10">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-10">
          <div className="w-full lg:w-[300px]">
            <Card className="h-full">
              <ul className="flex flex-row lg:flex-col gap-2 lg:w-full justify-center">
                <Item label={isSmall ? '' : 'Inicio'} path="/dashboard" current={pathname} icon={<FaHome className="w-[20px] h-[20px]" />} />
                {user?.roles.includes(UserRolesEnum.USER) && (
                  <Item
                    label={isSmall ? '' : 'Mis Rentas'}
                    path="/dashboard/orders"
                    current={pathname}
                    icon={<FaThList className="w-[20px] h-[20px]" />}
                  />
                )}
                {user?.roles.includes(UserRolesEnum.OWNER) && (
                  <Item
                    label={isSmall ? '' : 'Mis Alquileres'}
                    path="/dashboard/rentals"
                    current={pathname}
                    icon={<FaListAlt className="w-[20px] h-[20px]" />}
                  />
                )}
                {user?.roles.includes(UserRolesEnum.OWNER) && (
                  <Item
                    label={isSmall ? '' : 'Automóviles'}
                    path="/dashboard/cars"
                    current={pathname}
                    icon={<FaCar className="w-[20px] h-[20px]" />}
                  />
                )}
                <Item
                  label={isSmall ? '' : 'Mis documentos'}
                  path="/dashboard/documents"
                  current={pathname}
                  icon={<IoDocumentsSharp className="w-[20px] h-[20px]" />}
                />
                {user?.roles.includes(UserRolesEnum.ADMIN) && (
                  <Item
                    label={isSmall ? '' : 'Revisión'}
                    path="/dashboard/review"
                    current={pathname}
                    icon={<MdFactCheck className="w-[20px] h-[20px]" />}
                  />
                )}
              </ul>
            </Card>
          </div>
          <div style={{ width: isSmall ? '100%' : 'calc((100%) - 300px)' }}>
            <div className={combineClassnames(isSmall ? 'dashboard-dynamic-container-mobile' : 'dashboard-dynamic-container-desktop')}>
              {children}
            </div>
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
      <Link
        className={combineClassnames('p-2 sm:px-5 sm:py-2 font-bold items-center gap-2 flex flex-row', isActive ? active.a : inactive.a)}
        href={path}
      >
        <div className="w-[20px] h-[20px]">{icon}</div>
        {label}
      </Link>
    </li>
  );
};
