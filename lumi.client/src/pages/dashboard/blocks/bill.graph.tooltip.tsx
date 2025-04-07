import { tryNumber } from '@/utils/number';

const labelMap: Record<string, string> = {
  totalGeneratedKwh: 'Energia Gerada (kWh)',
  totalConsumedKwh: 'Energia Consumida (kWh)',
  compensationPercentage: 'Compensação (%)',
  totalEconomy: 'Economia (R$)',
  totalCost: 'Custo Total (R$)'
};

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-white p-2 rounded shadow text-sm">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((item: any) => (
        <p key={item.dataKey} style={{ color: item.stroke }}>
          {labelMap[item.dataKey] || item.dataKey}: <strong>{tryNumber(item.value) ? `${tryNumber(item.value)?.toFixed(2)}` : item.value}</strong>
        </p>
      ))}
    </div>
  );
};
