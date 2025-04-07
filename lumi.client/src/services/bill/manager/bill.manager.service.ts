import { api } from '@/core';
import { Bill } from '@/types/domain/bill';
import { BillServiceQuery, Pagination, ResultApi } from '@/types/services';

export const paginateBill = async (params: BillServiceQuery): Promise<Pagination<Bill>> => {
  const response = await api.get<Pagination<Bill>>('/bill', {
    params
  });

  return response?.data;
};

export const getBill = async (id: number): Promise<Bill> => {
  const response = await api.get<Bill>(`/bill/${id}`);

  return response?.data;
};

export const createBill = async (file: File | File[]): Promise<ResultApi<unknown>> => {
  const files = Array.isArray(file) ? file : [file];
  const formData = new FormData();
  files.forEach(f => formData.append('document', f));

  const response = await api.post<ResultApi<unknown>>('/bill', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response?.data;
};

export const deactivateBill = async (id: number): Promise<ResultApi<void>> => {
  const response = await api.delete<ResultApi<void>>(`/bill/${id}`);

  return response?.data;
};
