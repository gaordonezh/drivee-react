import React, { LegacyRef, forwardRef, useState } from 'react';
import Input, { InputProps } from '../atoms/Input';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { combineClassnames } from '@/utils/functions';

const InputPassword = forwardRef((props: InputProps, ref: LegacyRef<HTMLInputElement>) => {
  const [show, setShow] = useState(false);
  const Icon = show ? IoMdEyeOff : IoMdEye;
  return (
    <Input
      type={show ? 'text' : 'password'}
      iconRight={
        <Icon
          size={23}
          className={combineClassnames('bg-white cursor-pointer hover:scale-105', props.error ? 'text-red-500' : 'text-gray-700')}
          onClick={() => setShow(!show)}
        />
      }
      {...props}
      ref={ref as any}
    />
  );
});

InputPassword.displayName = 'InputPassword';

export default InputPassword;
