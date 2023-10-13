import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Typography, Stack } from '@mui/material';
import { PlanCardI } from './PlanCard.interface';
import { styles } from './PlanCard.style';

const PlanCard: FC<PlanCardI> = ({
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
  const router = useRouter();

  return (
    <Box sx={styles.planCard}>
      <Box sx={styles.planStatus}>
        {status === 'active' && <Box sx={styles.planActiveChip}>Active</Box>}
      </Box>

      <Box sx={styles.planIcon}>{icon}</Box>

      <Typography variant={`h6`} sx={styles.planTitle}>
        {title}
      </Typography>

      <Box sx={styles.planPlan}>
        <Box component={'span'} sx={styles.planPlanLight}>
          {planDuration}{' '}
        </Box>
        ({planUsers} users / {planData})
      </Box>

      <Box sx={styles.planStrip}>
        <Box sx={styles.planPrice}>£{price}</Box>
        <Typography variant="body2" sx={styles.planBillOn}>
          {status === 'active' ? `To be billed on ${billOn}` : '-'}
        </Typography>
      </Box>

      <Box sx={styles.planType}>{type}</Box>

      <Stack
        spacing={'12px'}
        useFlexGap
        direction={'row'}
        sx={styles.planActions}
      >
        <Button variant="contained" onClick={handleBillingDetail}>
          Billing Details
        </Button>
        <Button
          variant="outlined"
          sx={styles.buttonOutlineGrey}
          onClick={() => router.push('/subscription-invoices/manage-plan')}
        >
          Manage Plan
        </Button>
      </Stack>
    </Box>
  );
};

export default PlanCard;
