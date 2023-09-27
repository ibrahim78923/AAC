import React, { FC, useEffect } from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
interface PlanCardProps {
  status?: string;
  icon: any;
  title: string;
  planDuration?: string;
  planUsers?: string;
  planData?: string;
  price: string;
  billOn: string;
  type?: string;
  handleBillingDetail?: any;
  handleManagePlan?: any;
}

const planCard = (theme: any) => ({
  border: `1px solid ${theme.palette.grey[700]}`,
  borderRadius: `20px 4px 20px 4px`,
});
const planStatus = {
  display: `flex`,
  justifyContent: `flex-end`,
  padding: `20px 20px 9px 20px`,
  minHeight: '57px',
};
const planActiveChip = {
  fontSize: `14px`,
  lineHeight: `1.42857`,
  color: `success.main`,
  backgroundColor: `success.lighter`,
  padding: `4px 12px`,
  borderRadius: `16px`,
};
const planIcon = {
  borderRadius: `50%`,
  height: `51px`,
  width: `51px`,
  backgroundColor: `primary.lighter`,
  margin: `0 auto`,
  display: `flex`,
  alignItems: `center`,
  justifyContent: `center`,
};
const planTitle = {
  textAlign: 'center',
  fontWeight: '600',
};
const planPlan = {
  fontSize: '12px',
  fontWeight: '500',
  color: '#374151',
  textAlign: 'center',
  mt: '4px',
  pb: '16px',
};
const planStrip = {
  backgroundColor: `primary.lighter`,
  p: `9px`,
  textAlign: `center`,
};
const planPrice = {
  fontSize: '32px',
  fontWeight: '700',
  lineHeight: '1.5',
};
const planBillOn = (theme: any) => ({
  color: theme.palette.custom[1],
  lineHeight: '1.42857',
});
const planType = (theme: any) => ({
  fontSize: '16px',
  lineHeight: '1.5',
  fontWeight: '500',
  color: theme.palette.grey[800],
  textAlign: 'center',
  mt: '10px',
});
const planActions = {
  p: '24px 20px',
  justifyContent: 'center',
};
const buttonOutlineGrey = (theme: any) => ({
  borderColor: theme.palette.custom[1],
  color: theme.palette.custom[1],
});

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
        <Button variant="outlined" sx={buttonOutlineGrey}>
          Manage Plan
        </Button>
      </Stack>
    </Box>
  );
};

export default PlanCard;
