import React from 'react';
import Container from '../molecules/Container';
import Card from '../atoms/Card';
import { MdHome, MdLogout } from 'react-icons/md';
import { FaUserAlt, FaListAlt, FaCar } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { combineClassnames } from '@/utils/functions';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import Button from '../atoms/Button';
import { signOut } from 'next-auth/react';
import HeaderPublic from '../organisms/HeaderPublic';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  const { pathname } = useRouter();
  const { width } = useWindowDimensions();
  const isSmall = width < 1024;

  const handleClose = () => signOut({ callbackUrl: '/', redirect: true });

  return (
    <>
      <HeaderPublic />
      <div className="h-[85px] lg:h-[260px] bg-dashboard-hero bg-no-repeat bg-center bg-cover" />
      <Container className="p-3 lg:p-10">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-10">
          <div className="w-full lg:w-[300px]">
            <Card className="h-full">
              <ul className="flex flex-row lg:flex-col gap-2 lg:w-full justify-center">
                <Item
                  label={isSmall ? '' : 'Principal'}
                  path="/dashboard"
                  current={pathname}
                  icon={<MdHome size={20} className={combineClassnames(isSmall ? '' : 'w-[30px]')} />}
                />
                <Item
                  label={isSmall ? '' : 'Rentas'}
                  path="/dashboard/orders"
                  current={pathname}
                  icon={<FaListAlt size={18} className={combineClassnames(isSmall ? '' : 'w-[30px]')} />}
                />
                <Item
                  label={isSmall ? '' : 'Automóviles'}
                  path="/dashboard/cars"
                  current={pathname}
                  icon={<FaCar size={20} className={combineClassnames(isSmall ? '' : 'w-[30px]')} />}
                />
                <Item
                  label={isSmall ? '' : 'Perfil'}
                  path="/dashboard/profile"
                  current={pathname}
                  icon={<FaUserAlt size={18} className={combineClassnames(isSmall ? '' : 'w-[30px]')} />}
                />
                <Item
                  label={isSmall ? '' : 'Salir'}
                  current={pathname}
                  icon={<MdLogout size={20} className={combineClassnames(isSmall ? '' : 'w-[30px]')} />}
                  onClick={handleClose}
                />
              </ul>
            </Card>
          </div>
          <div className="flex-1">
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
const Item = ({
  path,
  label,
  current,
  icon,
  onClick,
}: {
  path?: string;
  label: string;
  current: string;
  icon: JSX.Element;
  onClick?: VoidFunction;
}) => {
  const isActive = path === current;

  return (
    <li className={combineClassnames('rounded overflow-hidden', isActive ? active.li : inactive.li)}>
      {path ? (
        <Link className={combineClassnames('px-5 py-2 font-bold items-center gap-2 flex flex-row', isActive ? active.a : inactive.a)} href={path}>
          {icon}
          {label}
        </Link>
      ) : (
        <Button fullWidth className="!justify-start !px-5 !py-2 !font-bold" variant="white" onClick={onClick}>
          {icon}
          {label}
        </Button>
      )}
    </li>
  );
};
