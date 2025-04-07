import { api } from '@/core';
import { BillDashboardSummarizedData, type BillGraph } from '@/types/domain/bill';
import { BillServiceQuery, ResultApi } from '@/types/services';

export const getBillDashboard = async (params: BillServiceQuery): Promise<ResultApi<BillDashboardSummarizedData>> => {
  const response = await api.get<ResultApi<BillDashboardSummarizedData>>('/bill/dashboard', {
    params
  });

  return response?.data;
};

export const getBillGraph = async (params: BillServiceQuery): Promise<ResultApi<BillGraph[]>> => {
  const response = await api.get<ResultApi<BillGraph[]>>('/bill/graph', {
    params
  });

  return response?.data;
};
