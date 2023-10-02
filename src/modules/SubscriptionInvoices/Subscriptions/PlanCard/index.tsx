import React, { FC, useEffect } from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { PlanCardProps } from './interface';
import {
  planCard,
  planStatus,
  planActiveChip,
  planIcon,
  planTitle,
  planPlan,
  planStrip,
  planPrice,
  planBillOn,
  planActions,
  planType,
  buttonOutlineGrey,
} from './styles';

const PlanCard: FC<PlanCardProps> = ({
  status,
  icon,
  title,
  planDuration,
  planUsers,
  planData,
  price,
  billOn,
  type,
  handleBillingDetail,
}) => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const router = useRouter();

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {}, []);

  /* RENDER COMPONENT
  -------------------------------------------------------------------------------------*/
  return (
    <Box sx={planCard}>
      <Box sx={planStatus}>
        {status === 'active' && <Box sx={planActiveChip}>Active</Box>}
      </Box>

      <Box sx={planIcon}>{icon}</Box>

      <Typography variant={`h5`} sx={planTitle}>
        {title}
      </Typography>

      <Box sx={planPlan}>
        <Box component={'span'} sx={{ color: '#9CA3AF' }}>
          {planDuration}{' '}
        </Box>
        ({planUsers} users / {planData})
      </Box>

      <Box sx={planStrip}>
        <Box sx={planPrice}>£{price}</Box>
        <Typography variant="body2" sx={planBillOn}>
          {status === 'active' ? `To be billed on ${billOn}` : '-'}
        </Typography>
      </Box>

      <Box sx={planType}>{type}</Box>

      <Stack spacing={'12px'} useFlexGap direction={'row'} sx={planActions}>
        <Button variant="contained" onClick={handleBillingDetail}>
          Billing Details
        </Button>
        <Button
          variant="outlined"
          sx={buttonOutlineGrey}
          onClick={() => router.push('/subscription-invoices/manage-plan')}
        >
          Manage Plan
        </Button>
      </Stack>
    </Box>
  );
};

export default PlanCard;
