import { useLayoutContext } from '@/providers/layout/layout.provider';

export const useLayout = () => {
  const context = useLayoutContext();

  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }

  return context;
};
