import React, { ReactNode, useMemo, useState } from 'react';

type PageContextType = {
  page: number;
  setPage: (value: number) => void;
};

const PageContext = React.createContext<PageContextType>(undefined);

const usePage = (): PageContextType => {
  const context = React.useContext(PageContext);
  if (!context) {
    throw new Error(`usePage must be used within a PageProvider`);
  }

  return context;
};

const PageProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [page, setPage] = useState<number>(0);

  const value = useMemo(() => {
    return { page, setPage };
  }, [page]);

  return <PageContext.Provider value={value} {...props} />;
};

export { PageProvider, usePage };
