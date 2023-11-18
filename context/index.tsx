import LayoutEnum from '@/enums/layout.enum';
import { useRouter } from 'next/router';
import { createContext, ReactNode, useContext, useMemo } from 'react';

interface ContextProps {
  layoutKey: LayoutEnum;
}

interface AppProviderProps {
  children: ReactNode;
}

const AppContext = createContext({} as ContextProps);

export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }: AppProviderProps) => {
  const { asPath } = useRouter();

  const values: ContextProps = useMemo(
    () => ({
      layoutKey: ([LayoutEnum.AUTH, LayoutEnum.DASHBOARD].includes(asPath.split('/')[1] as LayoutEnum)
        ? asPath.split('/')[1]
        : LayoutEnum.PUBLIC) as LayoutEnum,
    }),
    [asPath]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;
