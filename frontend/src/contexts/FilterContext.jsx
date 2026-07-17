import { createContext, useContext, useMemo } from 'react';
import filter from 'leo-profanity';

const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const value = useMemo(() => {
    filter.clearList();
    filter.loadDictionary('en');
    filter.add(filter.getDictionary('ru'));

    return {
      clean: (text) => filter.clean(text),
    };
  }, []);

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error('useFilter must be used within FilterProvider');
  }

  return context;
};
