import type { ColumnConfig } from '@/types/components';
import type { Bill } from '@/types/domain/bill'; 

export const billColumns: ColumnConfig<Bill>[] = [
  {
    key: 'id',
    label: 'Número da UC',  
    align: 'left',
    customRender: row => row?.installation?.installationNumber  
  },
  {
    key: 'referenceMonth',
    label: 'Mês',
    align: 'left',
    customRender: row => {
      if (!row?.referenceMonth) return null;
    
      const [year, month] = row.referenceMonth.split('-'); 
      return `${month}/${year.slice(2)}`; 
    }
  },
  {
    key: 'customerId',
    label: 'Nome da UC',
    align: 'left',
    customRender: row => (
      <div>
        {row?.installation?.client?.name || row?.installation?.client?.name
          ? row?.installation?.client?.name
          : row.installation?.client?.clientNumber
            ? 'Cliente Nº ' + row?.installation?.client?.clientNumber
            : 'N/A'}
      </div>
    )
  },
  {
    key: 'energyConsumptionKWh',
    label: 'Consumo (kWh)',
    align: 'right',
    customRender: row => Number(row.energyConsumptionKWh).toFixed(3)
  },
  {
    key: 'compensatedEnergyKWh',
    label: 'Compensado (kWh)',
    align: 'right',
    customRender: row => Number(row.compensatedEnergyKWh).toFixed(3)
  },
  {
    key: 'economyWithCompensation',
    label: 'economia com compensação (kWh)',
    align: 'center',
    customRender: row => <div className="text-center">{Number(row.economyWithCompensation).toFixed(3)}</div>
  }
];
