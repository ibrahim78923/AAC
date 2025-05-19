import React, { useEffect } from 'react';
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
import ModalPhoneNumber from './components/ModalPhoneNumber';
import CreateContractSidebar from './CreateContractSidebar';
import Preview from './Preview';
import PDFCreateContract from './PDFCreateContract';
import ModalSignAndSend from './components/ModalSignAndSend';
import ModalTemplateCategories from './components/ModalTemplateCategories';
import { ENUM_CONTRACT_STATUS, ENUM_CONTRACT_TYPE } from '@/utils/contracts';
import { AIR_SOCIAL_CONTRACTS } from '@/constants/routes';
import { isNullOrEmpty } from '@/utils';
// import ModalAddSignee from './components/ModalAddSignee';

export default function CreateContract() {
  const {
    router,
    contractId,
    templateId,
    contractType,
    activeView,
    handlePreviewToggle,

    handleAddPartyCard,
    handleDeletePartyCard,

    handleAddSigneeCard,
    handleDeleteSigneeCard,

    openModalManageSignature,
    handleOpenModalManageSignature,
    handleCloseModalManageSignature,

    methods,
    handleSubmitCreateTemplate,
    partyFields,
    partyValues,
    signeeFields,
    signeeValues,
    loadingCreateTemplate,
    loadingCreateDraft,
    dynamicFields,

    // openModalAddSignee,
    // handleOpenModalAddSignee,
    // handleCloseModalAddSignee,

    openModalSignAndSend,
    handleCloseModalSignAndSend,

    openModalPhoneNumber,
    handleOpenModalPhoneNumber,
    handleCloseModalPhoneNumber,

    isIndividualSignature,
    handleChangeIndividualSignature,
    selectedSigneeIndex,
    setSelectedSigneeIndex,

    // dataTemplateById,
    loadingGetContractById,
    loadingGetTemplateById,
    loadingUpdateTemplate,
    loadingUpdateContract,
    handleSubmitUpdateContract,
    handleAddDynamicField,
    handleUpdateDynamicField,
    isConfirmSigning,
    handleChangeConfirmSigning,
    appendSignee,
    removeSignee,

    openModalTemplateCategories,
    setOpenModalTemplateCategories,
    templateCatgValue,
    setTemplateCatgValue,
    handleRemoveDynamicField,
    dataContractById,
    contractDetailsData,
    latestAttachment,
    contractTitle,
    associationMode,
  } = useCreateContract();

  useEffect(() => {
    if (!contractDetailsData) return;
    const redirectCheck =
      contractDetailsData.status === ENUM_CONTRACT_STATUS?.SIGNED ||
      contractDetailsData.status === ENUM_CONTRACT_STATUS?.REJECTED ||
      contractDetailsData.status === ENUM_CONTRACT_STATUS?.CHANGE_REQUEST ||
      contractDetailsData.status === ENUM_CONTRACT_STATUS?.PENDING;

    if (redirectCheck) {
      router?.push({
        pathname: AIR_SOCIAL_CONTRACTS?.CONTRACT_VIEW,
        query: { contractId: contractId },
      });
    }
  }, [contractDetailsData, router, contractId]);

  const disabledSaveChanges = () => {
    if (templateId) {
      return !methods?.formState?.isDirty;
    }
    if (contractId) {
      return !methods?.formState?.isDirty;
    }
    return true;
  };

  const disabledSignAndSend = () => {
    if (contractType) {
      return (
        signeeValues?.length === 0 ||
        !latestAttachment ||
        isNullOrEmpty(contractTitle)
      );
    } else {
      return partyValues?.length === 0 || signeeValues?.length === 0;
    }
  };

  return (
    <>
      <Backdrop
        open={
          loadingCreateTemplate ||
          loadingCreateDraft ||
          loadingGetTemplateById ||
          loadingGetContractById ||
          loadingUpdateTemplate ||
          loadingUpdateContract
        }
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
        <HeaderCreateContract
          documentTitle={contractDetailsData?.name || 'Untitled Draft'}
          documentStatus={
            contractDetailsData?.status || ENUM_CONTRACT_STATUS?.DRAFT
          }
          sharedWithUsers={contractDetailsData?.sharedWithUsers}
          onClickSave={handleSubmitUpdateContract(false)}
          // onClickSign={handleOpenModalSignAndSend}
          onClickSign={
            contractId
              ? handleSubmitUpdateContract(true)
              : handleSubmitCreateTemplate('sign')
          }
          onClickSaveAsTemplate={() => setOpenModalTemplateCategories(true)}
          onClickSaveAsDraft={handleSubmitCreateTemplate('draft')}
          disabledSaveAsDraft={!!contractId}
          disabledSaveAsTemplate={!!templateId || !!contractId}
          disabledSaveChanges={disabledSaveChanges()}
          disabledSignAndSend={disabledSignAndSend()}
          associationMode={associationMode}
        />
      </PlainHeader>

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
                (router?.query?.contractType === ENUM_CONTRACT_TYPE?.PDF ? (
                  <PDFCreateContract contractData={contractDetailsData} />
                ) : (
                  <Grid container spacing={{ xs: '20px', lg: '30px' }}>
                    <Grid item xs={12} md={6} lg={8}>
                      <ContractTitle />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
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
                            key={party?._id || `party-${index}`}
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

                    {/* Signees */}
                    <Grid item xs={12}>
                      <Box sx={styles?.headingBar}>
                        <Box sx={styles?.headingBarTitle}>Signatures</Box>
                      </Box>
                      <Grid container spacing={'30px'}>
                        {signeeFields?.map((signee: any, index: number) => {
                          return (
                            <Grid
                              item
                              xs={12}
                              md={4}
                              key={signee?._id || signee?.id}
                              sx={styles?.partyCardgridItem}
                            >
                              <SigneeCard
                                numberOfSignees={signeeFields.length}
                                index={index}
                                onDelete={() => handleDeleteSigneeCard(index)}
                                partyValues={partyValues}
                              />
                            </Grid>
                          );
                        })}

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

                    {signeeValues?.length > 0 && (
                      <Grid item xs={12}>
                        <DefaultSignatures
                          isIndividualSignature={isIndividualSignature}
                          onChangeIndividualSignature={
                            handleChangeIndividualSignature
                          }
                          signees={signeeValues}
                          onClickChange={handleOpenModalManageSignature}
                          setSelectedSigneeIndex={setSelectedSigneeIndex}
                        />
                      </Grid>
                    )}
                    {!associationMode && (
                      <Grid item xs={12}>
                        <Button
                          variant={'contained'}
                          className={'small'}
                          fullWidth
                          onClick={
                            contractId
                              ? handleSubmitUpdateContract(true)
                              : handleSubmitCreateTemplate('sign')
                          }
                          disabled={
                            !(
                              partyFields?.length !== 0 &&
                              signeeFields?.length !== 0
                            )
                          }
                        >
                          Sign & Send
                        </Button>
                      </Grid>
                    )}
                    {contractDetailsData &&
                      contractDetailsData?.activityHistory && (
                        <Grid item xs={12}>
                          <DocumentHistory
                            data={contractDetailsData?.activityHistory || []}
                          />
                        </Grid>
                      )}
                  </Grid>
                ))}
              {activeView === 'preview' &&
                (router?.query?.signPDF ? (
                  <Box sx={styles?.headingBar}>
                    <Box sx={styles?.headingBarTitle}>Sign PDF</Box>
                  </Box>
                ) : (
                  <Preview
                    documentHistoryData={contractDetailsData?.activityHistory}
                  />
                ))}
            </Box>

            <Box sx={styles?.sidebar}>
              <CreateContractSidebar
                allDataFields={dynamicFields}
                handleAddDynamicField={handleAddDynamicField}
                handleRemoveDynamicField={handleRemoveDynamicField}
                handleUpdateDynamicField={handleUpdateDynamicField}
                signeeFields={signeeValues}
                handleAddSigneeCard={handleAddSigneeCard}
                partyFields={partyFields}
                handleDeleteSigneeCard={handleDeleteSigneeCard}
                appendSignee={appendSignee}
                removeSignee={removeSignee}
                dataContractById={dataContractById}
              />
            </Box>
          </Box>
        </FormProvider>
      </Box>

      <ModalManageSignatures
        open={openModalManageSignature}
        onClose={() => {
          setSelectedSigneeIndex(null);
          handleCloseModalManageSignature();
        }}
        value={
          isIndividualSignature
            ? selectedSigneeIndex !== null
              ? (signeeValues[selectedSigneeIndex] as any)?.signatureType || ''
              : ''
            : (signeeValues[0] as any)?.signatureType || ''
        }
        handleChange={(newValue) => {
          if (isIndividualSignature && selectedSigneeIndex !== null) {
            // Update the specific signee's signature type
            const updatedSignees = signeeValues.map(
              (signee: any, index: number) =>
                index === selectedSigneeIndex
                  ? { ...signee, signatureType: newValue }
                  : signee,
            );
            methods.setValue('signees', updatedSignees, { shouldDirty: true });
          } else {
            // Update all signees' signature types
            const updatedSignees = signeeValues.map((signee: any) => ({
              ...signee,
              signatureType: newValue,
            }));
            methods.setValue('signees', updatedSignees, { shouldDirty: true });
          }
        }}
      />

      <ModalSignAndSend
        open={openModalSignAndSend}
        onClose={handleCloseModalSignAndSend}
        onSubmit={() => {
          handleCloseModalSignAndSend();
          handleOpenModalPhoneNumber();
        }}
        signatureType={'DRAW'}
        isConfirmSigning={isConfirmSigning}
        handleChangeConfirmSigning={handleChangeConfirmSigning}
      />

      <ModalPhoneNumber
        open={openModalPhoneNumber}
        onClose={handleCloseModalPhoneNumber}
      />

      <ModalTemplateCategories
        open={openModalTemplateCategories}
        onClose={() => {
          setOpenModalTemplateCategories(false);
          setTemplateCatgValue('');
        }}
        setValue={setTemplateCatgValue}
        value={templateCatgValue}
        onSubmit={handleSubmitCreateTemplate('template')}
        okDisabled={!templateCatgValue}
        isLoading={loadingCreateTemplate}
      />
    </>
  );
}
