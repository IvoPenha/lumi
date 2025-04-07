type DashRawData = {
  totalGeneratedKwh: string;
  totalConsumedKwh: string;
  compensationPercentage: string;
  totalEconomy: string;
  totalCost: string;
};

export function billDashMapperDto(dashData: DashRawData[]) {
  const [current] = dashData;

  const generation = Number(current?.totalGeneratedKwh || 0);
  const compensation = Number(current?.totalEconomy || 0);
  const balance = Number(current?.totalGeneratedKwh || 0);
  const totalCost = Number(current?.totalCost || 0);

  return {
    generation: {
      value: generation,
      unit: 'kWh',
    },
    compensation: {
      value: compensation,
      unit: 'kWh',
    },
    balance: {
      value: balance,
      unit: 'R$',
    },
    totalCost: {
      value: totalCost,
      unit: 'R$',
    },
  };
}
