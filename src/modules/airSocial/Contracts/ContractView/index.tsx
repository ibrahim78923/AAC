import React from 'react';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import PlainHeader from '@/components/PlainHeader';
import Topbar from './Topbar';
import { styles } from './ContractView.style';
import MainContent from './MainContent';
import useContractView from './useContractView';
export default function ContractView() {
  const { dataContractById, loadingGetContractById } = useContractView();

  return (
    <>
      <PlainHeader>
        <Topbar />
      </PlainHeader>

      <Box sx={styles?.container}>
        <Box sx={styles?.contentRow}>
          <Box sx={styles?.content}>
            <MainContent
              title={dataContractById?.data?.name || 'Untitled Contract'}
              logo={dataContractById?.data?.logo || null}
              parties={dataContractById?.data?.parties || []}
              signees={dataContractById?.data?.signees || []}
              attachment={dataContractById?.data?.attachment || null}
              activityHistory={dataContractById?.data?.activityHistory || []}
            />
          </Box>

          <Box sx={styles?.sidebar}></Box>
        </Box>
      </Box>

      <Backdrop
        open={loadingGetContractById}
        sx={{
          background: 'rgba(255, 255, 255, 0.75)',
          color: (theme) => theme?.palette?.primary?.main,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: 'blur(1px)',
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
