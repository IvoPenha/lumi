import React from 'react';
import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import { Icons } from '../icons/icons.component';
import { EIcons } from '../icons/icons.enum';

interface SummaryCardProps {
  title: string;
  value?: string | number;
  unit?: string;
  variation?: number;
  icon?: React.ReactNode;
  backgroundColor?: string;
  textColor?: string;
  loading?: boolean;
  mr?: number;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  unit,
  variation,
  icon,
  backgroundColor = '#FFFFFF',
  textColor = '#1A1A1A',
  loading = false,
  mr = 0
}) => {
  const isPositiveVariation = variation !== undefined && variation >= 0;

  return (
    <Card
      elevation={2}
      sx={{
        backgroundColor,
        borderRadius: 3,
        mr,
        boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        p: 2.5,
        '@media (max-width: 768px)': {
          mb: 2
        }
      }}
    >
      <CardContent sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              backgroundColor: '#F5F5F5',
              borderRadius: '50%',
              padding: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40
            }}
          >
            {icon}
          </Box>
          <Typography variant="body2" color="text.secondary">
            {loading ? <Skeleton width={80} /> : title}
          </Typography>
        </Box>

        <Typography variant="h4" component="div" color={textColor} sx={{ fontWeight: 'bold', fontSize: '1.75rem', lineHeight: 1.2 }}>
          {loading ? (
            <Skeleton width="60%" />
          ) : (
            <>
              {value?.toLocaleString?.()}
              {unit && (
                <Typography component="span" sx={{ fontSize: '0.875rem', ml: 0.5 }}>
                  {unit}
                </Typography>
              )}
            </>
          )}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
          {variation !== undefined && (
            <>
              <Icons
                icon={isPositiveVariation ? EIcons.TRENDING_UP : EIcons.TRENDING_DOWN}
                color={isPositiveVariation ? 'success.main' : 'error.main'}
              />
              <Typography variant="body2" sx={{ color: isPositiveVariation ? 'success.main' : 'error.main', ml: 0.5 }}>
                {loading ? (
                  <Skeleton width={100} />
                ) : (
                  <>
                    {isPositiveVariation ? '+' : ''}
                    {variation}% em relação ao mês anterior
                  </>
                )}
              </Typography>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
