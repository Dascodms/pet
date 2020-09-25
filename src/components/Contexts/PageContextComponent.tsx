import React, { ReactNode, useMemo, useState } from 'react';

import QueryString from 'query-string';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const [page, setPage] = useState<number>(() => {
    const { page } = QueryString.parse(location.search);
    return +page - 1;
  });

  const value = useMemo(() => {
    return { page, setPage };
  }, [page]);

  return <PageContext.Provider value={value} {...props} />;
};

export { PageProvider, usePage };
