import { Icons } from '@/components/icons/icons.component';
import { EIcons } from '@/components/icons/icons.enum';
import SummaryCard from '@/components/summary-cards/summary-cards.component';
import { useApiRequest } from '@/hooks/api-request';
import { getBillDashboard } from '@/services';
import { BillDashboardSummarizedData } from '@/types/domain/bill';
import { BillServiceQuery } from '@/types/services';
import Grid from '@mui/material/Grid';
import type React from 'react';

type SummaryCardsSectionProps = {
  queryParams: BillServiceQuery;
};

const SummaryCardsSection: React.FC<SummaryCardsSectionProps> = ({ queryParams }) => {
  const { data: apiData, loading } = useApiRequest<BillDashboardSummarizedData, BillServiceQuery>(getBillDashboard, {
    params: queryParams,
    autoExecute: true,
    error: {
      message: 'Aconteceu um erro ao buscar os dados das faturas.'
    },
    success: {
      noFeedback: true
    }
  });

  const cardsData = [
    {
      title: 'Geração',
      value: apiData?.generation?.value?.toLocaleString(),
      unit: apiData?.generation?.unit,
      variation: apiData?.generation?.variation,
      icon: <Icons icon={EIcons.BOLT} color="primary" />,
      loading
    },
    {
      title: 'Compensação',
      value: apiData?.compensation?.value?.toLocaleString(),
      unit: apiData?.compensation?.unit,
      variation: apiData?.compensation?.variation,
      icon: <Icons icon={EIcons.COMPARE} color="primary" />,
      loading
    },
    {
      title: 'Saldo de créditos',
      value: apiData?.balance?.value?.toLocaleString(),
      unit: apiData?.balance?.unit,
      variation: apiData?.balance?.variation,
      icon: <Icons icon={EIcons.WALLET} color="primary" />,
      loading
    }
  ];

  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="stretch">
      {cardsData.map((card, index) => (
        <Grid
          size={{
            xs: 12,
            md: 4,
            lg: 4,
            xl: 4
          }}
          key={index}
        >
          <SummaryCard {...card} mr={index < cardsData?.length - 1 ? 2 : 0} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCardsSection;
