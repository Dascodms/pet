import React, { ReactNode, useMemo, useState } from 'react';

type TabContextType = {
  tab: string;
  setTab: (value: string) => void;
};

const TabContext = React.createContext<TabContextType>(undefined);

const useTab = (): TabContextType => {
  const context = React.useContext(TabContext);
  if (!context) {
    throw new Error(`useTab must be used within a TabProvider`);
  }
  return context;
};

const TabProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [tab, setTab] = useState<string>('');

  const value = useMemo(() => {
    return { tab, setTab };
  }, [tab]);

  return <TabContext.Provider value={value} {...props} />;
};

export { TabProvider, useTab };
