import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router';
import { getLayout } from './layout.helper';

const LayoutContext = createContext<LayoutContextType | null>(null);

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider');
  }
  return context;
};

type LayoutProviderProps = {
  children: ReactNode;
};

type LayoutContextType = {
  locationData: LocationData | null;
};

type LocationData = {
  description: string;
  page: string;
  subPage: string;
};

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);

  const currentPath = useLocation().pathname;

  const getLocationData = useCallback(() => {
    const layoutData = getLayout(currentPath);

    setLocationData(layoutData);

    return layoutData;
  }, [currentPath]);

  useEffect(() => {
    const layoutData = getLocationData();
    setLocationData(layoutData);
  }, [currentPath]);

  return <LayoutContext.Provider value={{ locationData }}>{children}</LayoutContext.Provider>;
};
