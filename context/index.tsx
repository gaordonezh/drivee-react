import { createContext, ReactNode, useContext, useMemo } from 'react';
import { useRouter } from 'next/router';

interface ContextProps {}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext({} as ContextProps);

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: AppProviderProps) => {
  const { asPath } = useRouter();

  const values: ContextProps = useMemo(() => ({}), [asPath]);

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;
