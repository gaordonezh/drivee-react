import React from 'react';
import HeaderPublic from '../organisms/HeaderPublic';
import FooterPublic from '../organisms/FooterPublic';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <>
      <HeaderPublic />

      <div>{children}</div>

      <FooterPublic />
    </>
  );
};

export default PublicLayout;
