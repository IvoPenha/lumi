import { LayoutComponent } from '@/components/layout/layout.component';
import { AppProviders } from '@/providers';
import { Outlet } from 'react-router';

export const AppLayout: React.FC = () => {
  return (
    <AppProviders>
      <LayoutComponent>
        <Outlet />
      </LayoutComponent>
    </AppProviders>
  );
};
