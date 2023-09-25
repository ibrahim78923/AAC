import React, { FC, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
interface PlanCardProps {
  status?: string;
  icon: React.ReactNode;
  title: string;
  planDuration?: string;
  planUsers?: string;
  planData?: string;
  price: string;
  billOn: string;
  type?: string;
  navigateToBillingDetail?: any;
  navigateToManagePlan?: any;
}

const PlanCard: FC<PlanCardProps> = ({
  icon,
  title,
  planDuration,
  planUsers,
  planData,
  price,
  billOn,
  type,
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
    <Box
      sx={{
        border: `1px solid #E5E7EB`,
        borderRadius: `20px 4px 20px 4px`,
      }}
    >
      <Box
        sx={{
          display: `flex`,
          justifyContent: `flex-end`,
          padding: `20px 20px 9px 20px`,
        }}
      >
        <Box
          sx={{
            fontSize: `14px`,
            lineHeight: `1.42857`,
            color: `#47B263`,
            backgroundColor: `#E4FFEB`,
            padding: `4px 12px`,
            borderRadius: `16px`,
          }}
        >
          Active
        </Box>
      </Box>
      <Box
        sx={{
          borderRadius: `50%`,
          height: `51px`,
          width: `51px`,
          backgroundColor: `#EBFAF8`,
          margin: `0 auto`,
          display: `flex`,
          alignItems: `center`,
          justifyContent: `center`,
        }}
      >
        {icon}
      </Box>
      <Typography
        variant={`h5`}
        sx={{ textAlign: 'center', fontWeight: '600' }}
      >
        {title}
      </Typography>
      <Box>
        <Box component={'span'} sx={{ color: '#9CA3AF' }}>
          {planDuration}
        </Box>
        ({planUsers}/{planData})
      </Box>
      <Box
        sx={{
          backgroundColor: `#EBFAF8`,
          p: `9px`,
          textAlign: `center`,
        }}
      >
        <Typography variant={`h2`}>£{price}</Typography>
        <Typography variant="body2" sx={{ color: `#6B7280` }}>
          {billOn}
        </Typography>
      </Box>
      <Typography variant="h6">{type}</Typography>
      <div className="plan-card-actions">
        <Button variant="contained">Billing Details</Button>
        <Button>Manage Plan</Button>
      </div>
    </Box>
  );
};

export default PlanCard;
