import { combineClassnames } from '@/utils/functions';
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card = ({ children, className, ...rest }: CardProps) => (
  <div className={combineClassnames('border border-gray-300 p-2 rounded-lg md:p-3 lg:p-4', className)} {...rest}>
    {children}
  </div>
);

export default Card;
