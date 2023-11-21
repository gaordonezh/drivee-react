import { combineClassnames } from '@/utils/functions';
import React from 'react';

type FabProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactNode;
  size: keyof typeof sizeClass;
};

const sizeClass = {
  small: 'h-5 w-5',
  medium: 'h-8 w-8',
  large: 'h-11 w-11',
};

const Fab = ({ icon, size, className, ...rest }: FabProps) => {
  const active = 'hover:shadow-gray-600 active:shadow-gray-500 transition-all shadow-lg shadow-gray-400';
  const disabled = 'shadow-lg shadow-gray-200';

  return (
    <button
      className={combineClassnames('rounded-full flex items-center justify-center', sizeClass[size], rest.disabled ? disabled : active, className)}
      {...rest}
    >
      {icon}
    </button>
  );
};

export default Fab;
