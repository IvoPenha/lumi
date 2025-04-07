import { CommonRangeType } from '../common/common.service.type';

export type BillServiceQuery = {
  customer?: string;
  page?: string;
  dateRange?: CommonRangeType<Date>;
  economyRange?: CommonRangeType<number>;
  energyConsumptionRange?: CommonRangeType<number>;
  energyCostRange?: CommonRangeType<number>;
};

export type BillServiceCreate = {
  document: File | File[];
};

export type BillServiceUpdate = {
  id: number;
  document: File;
};

export type BillServiceDelete = {
  id: number;
};
