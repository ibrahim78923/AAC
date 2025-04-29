import React from 'react';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import PlainHeader from '@/components/PlainHeader';
import Topbar from './Topbar';
import { styles } from './ContractView.style';
import MainContent from './MainContent';
import useContractView from './useContractView';
import ModalSignAndSend from './ModalSignAndSend';
import SidebarContent from './SidebarContent';
import ModalDismissAgreement from './ModalDismissAgreement';
import ModalRequestChanged from './ModalRequestChanged';

export default function ContractViewPublic() {
  const {
    signature,
    setSignature,
    dataContractById,
    loadingGetContractById,
    signeeId,

    currentSigneeSignatureType,
    currentSigneesignatureStatus,

    openModalSignAndSend,
    handleOpenModalSignAndSend,
    handleCloseModalSignAndSend,

    isConfirmSigning,
    handleChangeConfirmSigning,

    loadingPutContract,
    handleSubmitSignAndSend,

    signatureMessage,
    setSignatureMessage,
    openModalDismissAgreement,
    handleOpenModalDismissAgreement,
    handleCloseModalDismissAgreement,

    openModalRequestChanged,
    handleOpenModalRequestChanged,
    handleCloseModalRequestChanged,
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
          contractType={dataContractById?.data?.contractType}
          signatureStatus={currentSigneesignatureStatus}
        />
      </PlainHeader>

      <Box sx={styles?.container}>
        <Box sx={styles?.contentRow}>
          <Box sx={styles?.content}>
            <MainContent
              contractData={dataContractById?.data}
              signeeId={signeeId}
              handleOpenModalSignAndSend={handleOpenModalSignAndSend}
              handleOpenModalDismissAgreement={handleOpenModalDismissAgreement}
              handleOpenModalRequestChanged={handleOpenModalRequestChanged}
            />
          </Box>

          <Box sx={styles?.sidebar}>
            <SidebarContent contractData={dataContractById?.data} />
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
        isLoading={loadingPutContract}
        signature={signature}
        setSignature={setSignature}
      />

      <ModalDismissAgreement
        open={openModalDismissAgreement}
        onClose={handleCloseModalDismissAgreement}
        onSubmit={handleSubmitSignAndSend}
        isLoading={loadingPutContract}
        signatureMessage={signatureMessage}
        setSignatureMessage={setSignatureMessage}
      />

      <ModalRequestChanged
        open={openModalRequestChanged}
        onClose={handleCloseModalRequestChanged}
        onSubmit={handleSubmitSignAndSend}
        isLoading={loadingPutContract}
        signatureMessage={signatureMessage}
        setSignatureMessage={setSignatureMessage}
      />
    </>
  );
}
