import { ColumnConfig } from '@/types/components';
import { Icons } from '../icons/icons.component';
import { EIcons } from '../icons/icons.enum';

export function MobileCardDataTable<T>({ tableData, columns }: { tableData: T[]; columns: ColumnConfig<T>[] }) {
  return (
    <div className="md:hidden space-y-4">
      {tableData.map((row, index) => (
        <div key={index} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="space-y-3">
            {columns.map(({ key, label, mobileGrid = 2, customRender }) => (
              <div key={String(key)} className={`grid grid-cols-${mobileGrid} gap-2`}>
                <span className="text-sm font-medium text-gray-700">{label}:</span>
                <span className="text-sm text-gray-900">{customRender ? customRender(row) : (row[key] as any)}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-end">
            <button className="flex items-center gap-1 text-primary hover:text-primary/80 transition">
              <Icons icon={EIcons.EDIT} />
              <span className="text-sm font-medium">Editar</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
