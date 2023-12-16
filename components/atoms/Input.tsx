import React, { useId, InputHTMLAttributes } from 'react';
import { combineClassnames } from '@/utils/functions';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  sizes: keyof typeof sizeClasses;
}

const sizeClasses = {
  medium: 'p-2',
  small: 'p-1',
};

const Input = ({ label, className, sizes, ...rest }: InputProps) => {
  const id = useId();

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={id} className="font-semibold">
          {`${label} ${rest.required ? '*' : ''}`}
        </label>
      ) : null}
      <input
        id={id}
        className={combineClassnames('border-2 border-gray-200 rounded-md shadow-sm w-full outline-none', sizeClasses[sizes], className)}
        {...rest}
      />
    </div>
  );
};

Input.defaultProps = {
  sizes: 'medium',
};

export default Input;
