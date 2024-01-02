import { combineClassnames } from '@/utils/functions';
import React from 'react';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  variant: keyof typeof variantClasses;
}

const variantClasses = {
  info: 'text-blue-600 bg-blue-100',
  error: 'text-red-600 bg-red-100',
  success: 'text-green-600 bg-green-100',
  warning: 'text-yellow-600 bg-yellow-100',
  initial: 'text-gray-600 bg-gray-100',
};

const Alert = ({ title, description, variant, className, ...rest }: AlertProps) => {
  const classes = combineClassnames(variantClasses[variant], 'p-4 text-sm rounded-lg', className);

  return (
    <div className={classes} role="alert" {...rest}>
      {title && <p className="font-semibold">{title}</p>} {description}
    </div>
  );
};

Alert.defaultProps = {
  variant: 'success',
};

export default Alert;
