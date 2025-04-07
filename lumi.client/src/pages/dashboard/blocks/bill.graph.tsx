import { useApiRequest } from '@/hooks';
import { getBillGraph } from '@/services';
import type { BillGraph } from '@/types/domain/bill';
import type { BillServiceQuery } from '@/types/services';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CustomTooltip } from './bill.graph.tooltip';
import { Skeleton } from '@mui/material';

type Props = {
  queryParams: BillServiceQuery;
};

const chartConfig = [
  {
    key: 'totalGeneratedKwh',
    title: 'Energia Gerada (kWh)',
    color: '#34D399'
  },
  {
    key: 'totalConsumedKwh',
    title: 'Energia Consumida (kWh)',
    color: '#60A500'
  },
  {
    key: 'compensationPercentage',
    title: 'Compensação (%)',
    color: '#FBAF24'
  },
  {
    key: 'totalEconomy',
    title: 'Economia (R$)',
    color: '#F87171'
  }
];

export const EnergyCharts = ({ queryParams }: Props) => {
  const { data: apiData, loading } = useApiRequest<BillGraph[], BillServiceQuery>(getBillGraph, {
    params: queryParams,
    autoExecute: true,
    error: {
      message: 'Aconteceu um erro ao buscar os dados das faturas.'
    },
    success: {
      noFeedback: true
    }
  });

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Skeleton variant="rectangular" width="100%" height={250} className="rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Consumo e Geração no mesmo gráfico */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-semibold mb-2">Energia Consumida vs Gerada (kWh)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={apiData || []}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis domain={[0, (dataMax: number) => dataMax * 2.5]} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="totalGeneratedKwh" stroke="#34D399" strokeWidth={2} dot={{ r: 3 }} name="Energia Gerada (kWh)" />
            <Line type="monotone" dataKey="totalConsumedKwh" stroke="#60A5FA" strokeWidth={2} dot={{ r: 3 }} name="Energia Consumida (kWh)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Gráficos individuais restantes */}
      {['compensationPercentage', 'totalEconomy'].map(key => {
        const chart = chartConfig.find(c => c.key === key)!;
        return (
          <div key={chart.key} className="bg-white rounded-2xl shadow p-4">
            <h2 className="text-lg font-semibold mb-2">{chart.title}</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={apiData || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, (dataMax: number) => dataMax * 2]} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey={chart.key} stroke={chart.color} strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );
      })}
    </div>
  );
};
