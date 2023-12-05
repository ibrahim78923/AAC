import React from 'react';
import { useRouter } from 'next/router';
import { Box, Typography, TableContainer } from '@mui/material';
import { ArrowBackIcon } from '@/assets/icons';
import { styles } from './CreateBroadcast.style';
import { AIR_MARKETER } from '@/routesConstants/paths';

const CreateBroadcast = () => {
  const router = useRouter();

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: '27px' }}>
        <Box
          onClick={() => router.push(`${AIR_MARKETER?.WHATSAPP_MERKETING}`)}
          sx={{ cursor: 'pointer', lineHeight: '1', mr: '12px' }}
        >
          <ArrowBackIcon />
        </Box>
        <Typography variant="h3">Create Broadcast</Typography>
      </Box>

      <TableContainer sx={styles?.tableContainer}></TableContainer>
    </>
  );
};

export default CreateBroadcast;
