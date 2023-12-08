import React from 'react';
import Loader from '../atoms/Loader';

interface SpinProps {
  loading: boolean;
  text: string;
  children: React.ReactNode;
}

const Spinner = ({ loading, text, children }: SpinProps) => (
  <div className="relative">
    {loading ? (
      <div
        className="absolute z-[9999] top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center gap-1"
        style={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
      >
        <Loader />
        {text ? <p className="text-white text-center text-sm font-semibold">{text}</p> : null}
      </div>
    ) : null}
    {children}
  </div>
);

Spinner.defaultProps = {
  loading: true,
  text: '',
};

export default Spinner;
