import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';

import { AlertModals } from '@/components/AlertModals';

import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import DealEditorDrawer from './DealEditorDrawer';
import useDeal from './useDeal';
import { DEAL_TYPE, columns } from './Deal.data';
import { styles } from '../Associations.style';
import { PlusIcon } from '@/assets/icons';

const Deal = ({ contactId }: any) => {
  const {
    setSearchValue,
    loadingDeals,
    dataGetDeals,
    drawerTitle,
    openDrawer,
    handleOpenDrawer,
    handleCloseDrawer,
    methodsEditDeal,
    isDisabledFields,
    isOpenAlert,
    handleOpenAlert,
    handleCloseAlert,
    theme,
    dealOwnersData,
    dealPipelineData,
    dealStagesData,
    addLineItemsData,
    handleAddDealSubmit,
    isLoadingAddDeal,
    orgId,
    handleRemoveAssociation,
    dealType,
    handleChangeDealType,
    methodsExistingDeal,
    handleExsistingDealSubmit,
    loadingCreateAssociation,
  } = useDeal(contactId);

  const tableColumns = columns(handleOpenDrawer, handleOpenAlert);

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 0px 0px 0px',
        borderRadius: '10px',
      }}
    >
      <Grid container spacing={2}>
        {loadingDeals && (
          <Grid item xs={12} sx={styles?.countBox}>
            <Skeleton animation="wave" width="100%" height={60} />
          </Grid>
        )}
        {!loadingDeals && (
          <>
            <Grid item md={4} sx={styles?.countBox}>
              <Typography sx={styles?.associationCount(theme)} variant="body3">
                {dataGetDeals?.length < 10
                  ? `0${dataGetDeals?.length}`
                  : dataGetDeals?.length}
              </Typography>

              <Typography variant="subtitle2">Deals</Typography>
            </Grid>
            <Grid item md={8}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Search
                  setSearchBy={setSearchValue}
                  label="Search By Name"
                  size="small"
                />
                <Button
                  variant="contained"
                  className="small"
                  sx={{ minWidth: '0px', gap: 0.5 }}
                  onClick={() => handleOpenDrawer('Add', {})}
                >
                  <PlusIcon /> Add Deal
                </Button>
              </Box>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <TanstackTable
            columns={tableColumns}
            data={dataGetDeals}
            isLoading={loadingDeals}
          />
        </Grid>
      </Grid>

      <DealEditorDrawer
        title={drawerTitle}
        isOpen={openDrawer}
        onClose={handleCloseDrawer}
        methodsNewDeal={methodsEditDeal}
        methodsExistingDeal={methodsExistingDeal}
        isDisabledFields={isDisabledFields}
        isLoading={isLoadingAddDeal || loadingCreateAssociation}
        orgId={orgId}
        dealOwners={dealOwnersData}
        dealPipeline={dealPipelineData}
        dealStages={dealStagesData || []}
        addLineItems={addLineItemsData}
        dealType={dealType}
        handleChangeDealType={handleChangeDealType}
        handleOnSubmit={
          dealType === DEAL_TYPE?.NEW_DEAL
            ? handleAddDealSubmit
            : handleExsistingDealSubmit
        }
      />

      <AlertModals
        message={"You're about to remove a record. Are you Sure?"}
        type={'delete'}
        open={isOpenAlert}
        handleClose={handleCloseAlert}
        handleSubmitBtn={handleRemoveAssociation}
        loading={loadingCreateAssociation}
      />
    </Box>
  );
};

export default Deal;
