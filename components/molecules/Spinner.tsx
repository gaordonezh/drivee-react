import React from 'react';
import Loader from '../atoms/Loader';
import { combineClassnames } from '@/utils/functions';

interface SpinProps {
  loading: boolean;
  text: string;
  children: React.ReactNode;
  className?: string;
}

const Spinner = ({ loading, text, children, className }: SpinProps) => (
  <div className="relative">
    {loading ? (
      <div
        className={combineClassnames('absolute z-[9999] top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center gap-1', className)}
        style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}
      >
        <Loader />
        {text ? <p className="text-slate-900 text-center text-sm font-semibold">{text}</p> : null}
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
