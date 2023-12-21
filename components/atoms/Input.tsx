import React, { useId, InputHTMLAttributes, forwardRef, LegacyRef, ReactNode } from 'react';
import { combineClassnames } from '@/utils/functions';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  sizes?: keyof typeof sizeClasses;
  error?: boolean;
  errorMessage?: string;
  iconRight?: ReactNode;
}

const sizeClasses = {
  medium: 'p-2',
  small: 'p-1',
};

const Input = forwardRef(
  ({ label, className, sizes = 'medium', error, errorMessage, iconRight, ...rest }: InputProps, ref: LegacyRef<HTMLInputElement>) => {
    const id = useId();

    return (
      <div className="w-full relative">
        {label ? (
          <label htmlFor={id} className="font-semibold">
            {`${label} ${rest.required ? '*' : ''}`}
          </label>
        ) : null}
        <input
          ref={ref}
          id={id}
          className={combineClassnames(
            'border-2 rounded-md shadow-sm w-full outline-none',
            sizeClasses[sizes],
            error ? 'border-red-500 placeholder:text-red-400' : 'border-gray-200',
            className
          )}
          {...rest}
        />

        {iconRight ? (
          <span className={combineClassnames('w-[25px] h-[25px] absolute right-2 bg-white', error ? 'bottom-6' : 'bottom-2')}>{iconRight}</span>
        ) : null}

        {errorMessage && <p className="text-sm text-red-500 leading-3 mt-1">{errorMessage}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
