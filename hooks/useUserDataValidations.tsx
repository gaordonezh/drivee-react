import { ValidateUserBodyProps } from '@/store/user/user';
import { useState } from 'react';
import { useAppDispatch } from './useStore';
import { validateUser } from '@/store/user/user.slice';

const useUserDataValidations = () => {
  const dispatch = useAppDispatch();
  const [writeTimeout, setWriteTimeout] = useState<NodeJS.Timeout>();

  const validateUserFields = async (fields: ValidateUserBodyProps): Promise<Record<'email' | 'phone' | 'n_doc', boolean>> => {
    return await new Promise((resolve) => {
      clearTimeout(writeTimeout);
      const timeoutAux = setTimeout(async () => {
        const res = await dispatch(validateUser(fields));
        resolve(res.payload);
      }, 700);
      setWriteTimeout(timeoutAux);
    });
  };

  return validateUserFields;
};

export default useUserDataValidations;
