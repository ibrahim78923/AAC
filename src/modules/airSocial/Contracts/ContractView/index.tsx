import React from 'react';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import PlainHeader from '@/components/PlainHeader';
import Topbar from './Topbar';
import { styles } from './ContractView.style';
import MainContent from './MainContent';
import useContractView from './useContractView';
import ModalSignAndSend from './ModalSignAndSend';
import SidebarContent from './SidebarContent';

export default function ContractView() {
  const {
    setSignature,
    dataContractById,
    loadingGetContractById,
    signeeId,

    currentSigneeSignatureType,

    openModalSignAndSend,
    handleOpenModalSignAndSend,
    handleCloseModalSignAndSend,

    isConfirmSigning,
    handleChangeConfirmSigning,

    loadingUpdateContract,
    handleSubmitSignAndSend,
  } = useContractView();

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
          handleOpenModalSignAndSend={handleOpenModalSignAndSend}
        />
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
              signeeId={signeeId}
            />
          </Box>

          <Box sx={styles?.sidebar}>
            <SidebarContent
              dataFieldsData={dataContractById?.data?.dynamicFields || []}
              ownerData={{
                ...(dataContractById?.data?.owner || {}),
                createdAt: dataContractById?.data?.createdAt,
                contractId: dataContractById?.data?._id,
              }}
              signeesData={dataContractById?.data?.signees || []}
            />
          </Box>
        </Box>
      </Box>

      <ModalSignAndSend
        open={openModalSignAndSend}
        onClose={handleCloseModalSignAndSend}
        onSubmit={handleSubmitSignAndSend}
        signatureType={currentSigneeSignatureType}
        handleChangeConfirmSigning={handleChangeConfirmSigning}
        isConfirmSigning={isConfirmSigning}
        isLoading={loadingUpdateContract}
        setSignature={setSignature}
      />
    </>
  );
}
