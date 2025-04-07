import DataTable from '@/components/datatable/datatable.component';
import { useModal, useQueryParams } from '@/hooks';
import { paginateBill } from '@/services';
import { Bill } from '@/types/domain/bill';
import { BillServiceQuery, type Pagination } from '@/types/services';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import SummaryCardsSection from './blocks/summary-cards.block';
import { billColumns } from './dash.const';
import { ButtonComponent } from '@/components/button/button.component';
import { BillAddModal } from './blocks/bill.add.modal';
import { EnergyCharts } from './blocks/bill.graph';

export const DashboardPage: React.FC = () => {
  const queryParams = useQueryParams([
    'customer',
    'startDate',
    'endDate',
    'startEconomy',
    'endEconomy',
    'startEnergyConsumption',
    'endEnergyConsumption',
    'startEnergyCost',
    'endEnergyCost',
    'page'
  ]) as BillServiceQuery;

  const [paginatedBills, setPaginatedBills] = useState<Pagination<Bill> | null>(null);
  const { isOpen, close, open } = useModal(false);

  const fetchData = useCallback(async (query: BillServiceQuery) => {
    const [paginatedBillsData] = await Promise.all([paginateBill(query)]);

    setPaginatedBills(paginatedBillsData);
  }, []);

  useEffect(() => {
    fetchData(queryParams);
  }, [queryParams, fetchData]);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleChangePage = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', String(newPage));
    navigate({ search: newParams.toString() });
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full p-4">
      {/* <BillFileInput /> */}
      <SummaryCardsSection queryParams={queryParams} />
      <EnergyCharts queryParams={queryParams} />
      <ButtonComponent onClick={open}>Enviar novo arquivo</ButtonComponent>
      <BillAddModal isOpen={isOpen} onClose={close} />
      {paginatedBills?.data && <DataTable<Bill> columns={billColumns} handleChangePage={handleChangePage} {...(paginatedBills || {})} />}
    </div>
  );
};
