import { combineClassnames } from '@/utils/functions';
import React, { InputHTMLAttributes, LegacyRef, forwardRef, useId } from 'react';

type TextareaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: boolean;
  errorMessage?: string;
};

const Textarea = forwardRef(({ label, className, error, errorMessage, ...rest }: TextareaProps, ref: LegacyRef<HTMLTextAreaElement>) => {
  const id = useId();

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={id} className="font-semibold">
          {`${label} ${rest.required ? '*' : ''}`}
        </label>
      ) : null}
      <textarea
        id={id}
        ref={ref}
        className={combineClassnames(
          'border-2 rounded-md shadow-sm w-full p-2 outline-none',
          error ? 'border-red-500 placeholder:text-red-400' : 'border-gray-200',
          className
        )}
        {...rest}
      />
      {errorMessage && <p className="text-sm text-red-500 leading-3">{errorMessage}</p>}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
