import React, { ReactNode, useMemo, useState } from 'react';

import QueryString from 'query-string';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const [tab, setTab] = useState<string>(() => {
    const { tag } = QueryString.parse(location.search);
    return tag as string;
  });

  const value = useMemo(() => {
    return { tab, setTab };
  }, [tab]);

  return <TabContext.Provider value={value} {...props} />;
};

export { TabProvider, useTab };
