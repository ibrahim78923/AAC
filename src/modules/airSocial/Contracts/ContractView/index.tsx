import React from 'react';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import PlainHeader from '@/components/PlainHeader';
import Topbar from './Topbar';
import { styles } from './ContractView.style';
import MainContent from './MainContent';
import useContractView from './useContractView';
import SidebarContent from './SidebarContent';

export default function ContractView() {
  const { dataContractById, loadingGetContractById, downloadRef } =
    useContractView();

  return (
    <>
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

      <PlainHeader>
        <Topbar
          title={dataContractById?.data?.name || 'Untitled Contract'}
          status={dataContractById?.data?.status || 'Pending'}
          downloadRef={downloadRef}
        />
      </PlainHeader>

      <Box sx={styles?.container}>
        <Box sx={styles?.contentRow}>
          <Box sx={styles?.content}>
            <MainContent
              contractData={dataContractById?.data}
              downloadRef={downloadRef}
            />
          </Box>

          <Box sx={styles?.sidebar}>
            <SidebarContent contractData={dataContractById?.data} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
