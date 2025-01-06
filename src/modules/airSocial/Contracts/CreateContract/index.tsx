import React from 'react';
import PlainHeader from '@/components/PlainHeader';
import HeaderCreateContract from './components/HeaderCreateContract';
import { Box, Button, Grid } from '@mui/material';
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
    contractData,
    activeView,
    handlePreviewToggle,
    handleAddParty,
    handleDeleteParty,
    handleAddSigneeCard,
    handleDeleteSigneeCard,

    openModalManageSignature,
    handleOpenModalManageSignature,
    handleCloseModalManageSignature,
    handleChangeSignatureMethod,

    methods,
    handleSubmit,
    onSubmit,

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
  } = useCreateContract();

  return (
    <>
      <PlainHeader>
        <HeaderCreateContract
          onClickSave={() => alert('Save')}
          onClickSign={handleOpenModalConfirmationSignDoc}
        />
      </PlainHeader>

      <Box sx={styles?.container}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
                        {contractData?.parties?.map((party, index) => (
                          <Grid
                            item
                            xs={12}
                            md={4}
                            key={party?._id}
                            sx={styles?.partyCardgridItem}
                          >
                            <PartyCard
                              onDelete={() =>
                                index !== 0 && handleDeleteParty(party?._id)
                              }
                            />
                          </Grid>
                        ))}

                        <Grid item xs={12} md={4}>
                          <AddCard
                            title={'Add Party'}
                            onClick={handleAddParty}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* Signatures */}
                    <Grid item xs={12}>
                      <Box sx={styles?.headingBar}>
                        <Box sx={styles?.headingBarTitle}>Signatures</Box>
                      </Box>
                      <Grid container spacing={'30px'}>
                        {contractData?.signees?.map(
                          (signee: any, index: any) => (
                            <Grid
                              item
                              xs={12}
                              md={4}
                              key={signee?._id}
                              sx={styles?.partyCardgridItem}
                            >
                              <SigneeCard
                                signeeId={signee?._id}
                                onDelete={() =>
                                  index !== 0 &&
                                  handleDeleteSigneeCard(signee?._id)
                                }
                              />
                            </Grid>
                          ),
                        )}

                        <Grid item xs={12} md={4}>
                          <AddCard
                            title={'Add Signee'}
                            onClick={handleAddSigneeCard}
                          />
                        </Grid>
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <DefaultAttachment />
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
                        signees={contractData?.signees}
                        onClickChange={handleOpenModalManageSignature}
                        setSelectedSigneeId={setSelectedSigneeId}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type={'submit'}
                        variant={'contained'}
                        className={'small'}
                        fullWidth
                        onClick={handleOpenModalConfirmationSignDoc}
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
              <CreateContractSidebar />
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
          selectedSigneeId
            ? contractData.signees.find(
                (signee) => signee._id === selectedSigneeId,
              )?.signatureType || ''
            : ''
        }
        handleChange={handleChangeSignatureMethod}
        selectedSigneeId={selectedSigneeId}
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
