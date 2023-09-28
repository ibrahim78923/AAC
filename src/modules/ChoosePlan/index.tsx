import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { IconArrowBack } from '@/assets/icons';

const ChoosePlan = () => {
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
    <Box>
      <Box onClick={() => router.push('/subscription-invoices/manage-plan')}>
        <IconArrowBack />
      </Box>
      <Typography variant="h4">Choose a plan</Typography>
    </Box>
  );
};

export default ChoosePlan;
