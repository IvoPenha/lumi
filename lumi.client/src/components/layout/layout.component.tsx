import { useLayout } from '@/hooks/layout/layout.hook';
import { Icons } from '../icons/icons.component';
import { EIcons } from '../icons/icons.enum';

export const LayoutComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { locationData } = useLayout();
  return (
    <div className="flex h-screen bg-[#F7F8FA]">
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between bg-white h-20 px-10 shadow">
          <div>
            <div className="text-sm text-gray-400">
              {locationData?.page} &gt; {locationData?.subPage}
            </div>
            <h1 className="text-xl font-semibold text-gray-800">{locationData?.description}</h1>
          </div>
          <div className="flex items-center gap-4">
            {/* ícones de mensagens, notificações e usuário */}
            <button>📩</button>
            <button>🔔</button>
            <button className="w-10 h-10 bg-green-800 text-white rounded-full flex justify-center items-center">
              <Icons icon={EIcons.USER} />
            </button>
          </div>
        </header>

        {/* Conteúdo rolável */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};
