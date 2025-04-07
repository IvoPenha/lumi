import type { Installation } from './installation';

export type Bill = {
  id: number;
  customerId: number;
  referenceMonth: string; 
  energyConsumptionKWh: number;
  energyCost: number;
  sceeeEnergyCost: number;
  compensatedEnergyKWh: number;
  compensatedEnergyCost: number;
  publicLightingContribution: number;
  totalWithoutCompensation: number;
  economyWithCompensation: number;
  createdAt: Date;
  deletedAt: Date | null;
  installationId: number;
  installation: Installation;
};

export type BillDashboardSummarizedData = {
  generation: {
    value: number;
    unit: string;
    variation: number;
  };
  compensation: {
    value: number;
    unit: string;
    variation: number;
  };
  balance: {
    value: number;
    unit: string;
    variation: number;
  };
  assignedQuotas: number;
  quotasAssigned: {
    value: number;
    unit: string;
    variation: number;
  };
};

export type BillGraph = {
  month: string;
  totalGeneratedKwh: string;
  totalConsumedKwh: string;
  compensationPercentage: string;
  totalEconomy: string;
  totalCost: string;
};
