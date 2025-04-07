import { LayoutProvider } from './layout/layout.provider';
import ToastProvider from './toast/toast.provider';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutProvider>
      <ToastProvider>{children}</ToastProvider>
    </LayoutProvider>
  );
};
