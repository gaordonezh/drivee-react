import { combineClassnames } from '@/utils/functions';
import React from 'react';

interface DividerProps {
  className?: string;
}

const Divider = ({ className }: DividerProps) => <div className={combineClassnames('bg-slate-200 h-[1px]', className)} />;

export default Divider;
