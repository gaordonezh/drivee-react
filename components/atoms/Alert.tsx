import { combineClassnames } from '@/utils/functions';
import Link from 'next/link';
import React from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  variant: keyof typeof variantClasses;
  link?: { text: string; path: string; target?: string };
}

const variantClasses = {
  info: 'text-blue-600 bg-blue-100',
  error: 'text-red-600 bg-red-100',
  success: 'text-green-600 bg-green-100',
  warning: 'text-yellow-600 bg-yellow-100',
  initial: 'text-gray-600 bg-gray-100',
};

const Alert = ({ title, description, variant, className, link, ...rest }: AlertProps) => {
  const classes = combineClassnames(variantClasses[variant], 'p-4 text-sm rounded-lg', className);

  return (
    <div className={classes} role="alert" {...rest}>
      {title && <p className="font-semibold">{title}</p>} {description}
      {link && (
        <Link className="underline" href={link.path} target={link.target}>
          {link.text}
        </Link>
      )}
    </div>
  );
};

Alert.defaultProps = {
  variant: 'success',
};

export default Alert;
