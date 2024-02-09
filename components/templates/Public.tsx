import React from 'react';
import Header from '../organisms/Header';
import FooterPublic from '../organisms/FooterPublic';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
  return (
    <>
      <Header />

      <div>{children}</div>

      <FooterPublic />
    </>
  );
};

export default PublicLayout;
