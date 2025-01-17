import React from 'react';
import PlainHeader from '@/components/PlainHeader';
import HeaderCreateContract from './components/HeaderCreateContract';
import { Backdrop, Box, Button, CircularProgress, Grid } from '@mui/material';
import { styles } from './CreateContract.style';
import PreviewToggle from './components/PreviewToggle';
import useCreateContract from './useCreateContract';
import { FormProvider } from '@/components/ReactHookForm';
import ContractTitle from './form-fields/ContractTitle';
import ContractLogo from './form-fields/ContractLogo';
import PartyCard from './components/PartyCard';
import AddCard from './components/AddCard';
import SigneeCard from './components/SigneeCard';
import DefaultAttachment from './form-fields/DefaultAttachment';
import MessageToRecipient from './form-fields/MessageToRecipient';
import DefaultSignatures from './form-fields/DefaultSignatures';
import ModalManageSignatures from './components/ModalManageSignatures';
import DocumentHistory from './components/DocumentHistory';
import ModalConfirmationSignDoc from './components/ModalConfirmationSignDoc';
import ModalPhoneNumber from './components/ModalPhoneNumber';
import CreateContractSidebar from './CreateContractSidebar';
import Preview from './Preview';
import PDFCreateContract from './PDFCreateContract';

export default function CreateContract() {
  const {
    router,
    activeView,
    handlePreviewToggle,

    handleAddPartyCard,
    handleDeletePartyCard,

    handleAddSigneeCard,
    handleDeleteSigneeCard,

    openModalManageSignature,
    handleOpenModalManageSignature,
    handleCloseModalManageSignature,
    handleChangeSignatureMethod,

    methods,
    handleSubmitCreateTemplate,
    partyFields,
    signeeFields,
    loadingCreateTemplate,
    dynamicFields,
    openModalConfirmationSignDoc,
    handleOpenModalConfirmationSignDoc,
    handleCloseModalConfirmationSignDoc,

    openModalPhoneNumber,
    handleOpenModalPhoneNumber,
    handleCloseModalPhoneNumber,

    isIndividualSignature,
    handleChangeIndividualSignature,
    selectedSigneeId,
    setSelectedSigneeId,
    handleAddDynamicField,
    // dataTemplateById,
    handleSubmitUpdateTemplate,
  } = useCreateContract();

  return (
    <>
      <PlainHeader>
        <HeaderCreateContract
          onClickSave={handleSubmitUpdateTemplate}
          onClickSign={handleOpenModalConfirmationSignDoc}
          onClickSaveAsTemplate={handleSubmitCreateTemplate}
          methods={methods}
        />
      </PlainHeader>

      <Backdrop
        open={loadingCreateTemplate}
        sx={{
          background: 'rgba(255, 255, 255, 0.75)',
          color: (theme) => theme?.palette?.primary?.main,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Box sx={styles?.container}>
        <FormProvider methods={methods}>
          <Box sx={styles?.contentRow}>
            <Box sx={styles?.content}>
              <Box sx={styles.contentTopbar}>
                <PreviewToggle
                  active={activeView}
                  handleToggle={handlePreviewToggle}
                />
              </Box>
              {activeView === 'create' &&
                (router?.query?.signPDF ? (
                  <PDFCreateContract />
                ) : (
                  <Grid container spacing={'30px'}>
                    <Grid item xs={12} md={8}>
                      <ContractTitle />
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <ContractLogo />
                    </Grid>
                    {/* Parties Card */}
                    <Grid item xs={12}>
                      <Box sx={styles?.headingBar}>
                        <Box sx={styles?.headingBarTitle}>Parties</Box>
                      </Box>
                      <Grid container spacing={'30px'}>
                        {partyFields?.map((party: any, index) => (
                          <Grid
                            item
                            xs={12}
                            md={4}
                            key={party?._id}
                            sx={styles?.partyCardgridItem}
                          >
                            <PartyCard
                              index={index}
                              onDelete={() => handleDeletePartyCard(index)}
                            />
                          </Grid>
                        ))}

                        <Grid item xs={12} md={4}>
                          <AddCard
                            title={'Add Party'}
                            onClick={handleAddPartyCard}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <DefaultAttachment />
                    </Grid>

                    {/* Signatures */}
                    <Grid item xs={12}>
                      <Box sx={styles?.headingBar}>
                        <Box sx={styles?.headingBarTitle}>Signatures</Box>
                      </Box>
                      <Grid container spacing={'30px'}>
                        {signeeFields?.map((signee: any, index: number) => (
                          <Grid
                            item
                            xs={12}
                            md={4}
                            key={signee?._id}
                            sx={styles?.partyCardgridItem}
                          >
                            <SigneeCard
                              index={index}
                              onDelete={() => handleDeleteSigneeCard(index)}
                            />
                          </Grid>
                        ))}

                        <Grid item xs={12} md={4}>
                          <AddCard
                            title={'Add Signee'}
                            onClick={handleAddSigneeCard}
                            disabled={partyFields?.length === 0}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <MessageToRecipient />
                    </Grid>

                    <Grid item xs={12}>
                      <DefaultSignatures
                        isIndividualSignature={isIndividualSignature}
                        onChangeIndividualSignature={
                          handleChangeIndividualSignature
                        }
                        signees={signeeFields}
                        onClickChange={handleOpenModalManageSignature}
                        setSelectedSigneeId={setSelectedSigneeId}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        variant={'contained'}
                        className={'small'}
                        fullWidth
                        onClick={handleOpenModalConfirmationSignDoc}
                        disabled={true}
                      >
                        Sign & Send
                      </Button>
                    </Grid>

                    <Grid item xs={12}>
                      <DocumentHistory />
                    </Grid>
                  </Grid>
                ))}
              {activeView === 'preview' &&
                (router?.query?.signPDF ? (
                  <Box sx={styles?.headingBar}>
                    <Box sx={styles?.headingBarTitle}>Sign PDF</Box>
                  </Box>
                ) : (
                  <Preview />
                ))}
            </Box>

            <Box sx={styles?.sidebar}>
              <CreateContractSidebar
                allDataFields={dynamicFields}
                handleAddDynamicField={handleAddDynamicField}
              />
            </Box>
          </Box>
        </FormProvider>
      </Box>

      <ModalManageSignatures
        open={openModalManageSignature}
        onClose={() => {
          setSelectedSigneeId(null);
          handleCloseModalManageSignature();
        }}
        value={
          isIndividualSignature
            ? selectedSigneeId
              ? signeeFields.find(
                  (signee: any) => signee._id === selectedSigneeId,
                )?.signatureType || ''
              : ''
            : signeeFields[0]?.signatureType || ''
        }
        handleChange={(event) => {
          handleChangeSignatureMethod(
            event,
            isIndividualSignature ? selectedSigneeId : null,
          );
        }}
      />

      <ModalConfirmationSignDoc
        open={openModalConfirmationSignDoc}
        onClose={handleCloseModalConfirmationSignDoc}
        onSubmit={() => {
          handleCloseModalConfirmationSignDoc();
          handleOpenModalPhoneNumber();
        }}
      />

      <ModalPhoneNumber
        open={openModalPhoneNumber}
        onClose={handleCloseModalPhoneNumber}
      />
    </>
  );
}
