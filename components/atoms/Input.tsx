import React, { InputHTMLAttributes, useId } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

const Input = ({ label, ...rest }: InputProps) => {
  const id = useId();

  return (
    <div className='w-full'>
      {label ? (
        <label htmlFor={id} className="font-semibold">
          {`${label} ${rest.required ? '*' : ''}`}
        </label>
      ) : null}
      <input id={id} className="border-2 border-gray-200 rounded-md shadow-sm w-full p-2 outline-none" {...rest} />
    </div>
  );
};

export default Input;
