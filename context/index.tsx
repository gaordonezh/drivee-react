import { UserProps } from '@/store/user/user';
import { createContext, ReactNode, useContext, useMemo } from 'react';

interface ContextProps {
  user: null | UserProps;
}

export interface ExtraAppProps {
  user: null | UserProps;
}

interface AppProviderProps extends ExtraAppProps {
  children: ReactNode;
}

const AppContext = createContext({} as ContextProps);

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children, user }: AppProviderProps) => {
  const values: ContextProps = useMemo(() => ({ user }), [user]);

  console.log(values.user);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;
