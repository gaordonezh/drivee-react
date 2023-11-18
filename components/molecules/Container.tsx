import { combineClassnames } from '@/utils/functions';
import React from 'react';

const Container = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={combineClassnames('max-w-screen-2xl mx-auto', className)}>{children}</div>
);
export default Container;
