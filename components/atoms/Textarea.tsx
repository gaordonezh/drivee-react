import { combineClassnames } from '@/utils/functions';
import React, { InputHTMLAttributes, useId } from 'react';

type TextareaProps = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

const Textarea = ({ label, className, ...rest }: TextareaProps) => {
  const id = useId();

  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={id} className="font-semibold">
          {`${label} ${rest.required ? '*' : ''}`}
        </label>
      ) : null}
      <textarea id={id} className={combineClassnames('border-2 border-gray-200 rounded-md shadow-sm w-full p-2 outline-none', className)} {...rest} />
    </div>
  );
};

export default Textarea;
