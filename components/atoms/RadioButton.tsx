import { combineClassnames } from '@/utils/functions';
import React from 'react';

interface RadioButtonProps {
  options: Array<{ label: string; value: string }>;
  value: string;
  onChange: (value: string) => void;
}

const RadioButton = ({ options, value, onChange }: RadioButtonProps) => (
  <ul className="grid w-full gap-2 md:grid-cols-2">
    {options.map((item) => (
      <li key={item.value}>
        <input type="radio" name={item.value} value={item.value} className="hidden peer" />
        <label
          htmlFor={item.value}
          onClick={() => onChange(item.value)}
          className={combineClassnames(
            'inline-flex w-full px-5 py-3 rounded-md cursor-pointer border-2 text-black',
            item.value === value ? 'bg-gray-200 font-semibold border-black' : 'bg-white border-gray-200'
          )}
        >
          {item.label}
        </label>
      </li>
    ))}
  </ul>
);

export default RadioButton;
