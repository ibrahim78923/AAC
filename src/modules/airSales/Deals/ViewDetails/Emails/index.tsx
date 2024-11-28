import { Box } from '@mui/material';
import React from 'react';
import EmailComp from './EmailComp';
import { useSearchParams } from 'next/navigation';

const Emails = () => {
  const dealId = useSearchParams()?.get('id');
  return (
    <Box>
      <EmailComp moduleType="DEAL" moduleId={dealId} />
    </Box>
  );
};

export default Emails;
