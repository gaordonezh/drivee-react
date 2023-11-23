import React from 'react';
import HeaderPublic from '../organisms/HeaderPublic';
import Container from '../molecules/Container';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  return (
    <div>
      <HeaderPublic />
      <div className="h-[260px] bg-dashboard-hero bg-no-repeat bg-center bg-cover"></div>
      <Container className="py-10">
        <div className="flex flex-row gap-10">
          <div className="border border-red-500 flex-1">CARD</div>
          <div className="flex-[3] flex flex-col gap-5">
            <div className="flex flex-row gap-10">
              <div className="border border-red-500 flex-1">CARD 1</div>
              <div className="border border-red-500 flex-1">CARD 2</div>
              <div className="border border-red-500 flex-1">CARD 3</div>
            </div>
            <div className="border border-red-500">CARD INFERIOR</div>
          </div>
        </div>
      </Container>

      <div className="bg-slate-200 p-20">{children}</div>
    </div>
  );
};

export default PrivateLayout;
