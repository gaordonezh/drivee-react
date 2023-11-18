import React from 'react';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  return (
    <div>
      <h1>DASHBOARD - PRIVATE</h1>
      {children}
    </div>
  );
};

export default PrivateLayout;
