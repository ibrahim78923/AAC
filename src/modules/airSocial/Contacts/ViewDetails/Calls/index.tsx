import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';

import TanstackTable from '@/components/Table/TanstackTable';

import { callsDetails, callsStatusColor, columns } from './Calls.data';

import CallsActionDropdown from './CallsActionDropDown';

import useCalls from './useCalls';

import { PlusIcon, ViewCallIcon } from '@/assets/icons';

import { styles } from './Calls.style';
import { v4 as uuidv4 } from 'uuid';
import { isNullOrEmpty } from '@/utils';
import AddCall from './AddCalls';
import CallsEditorDrawer from './CallsEditorDrawer';
import { AlertModals } from '@/components/AlertModals';
import Reschedule from './Reschedule';
import AddOutcome from './AddOutcome';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS } from '@/constants/permission-keys';

const Calls = ({ contactId }: any) => {
  const {
    theme,
    anchorEl,
    actionMenuOpen,
    handleActionsMenuClick,
    handleActionsMenuClose,
    dataGetCalls,
    loadingGetCalls,
    fetchingGetCalls,
    setPageLimit,
    setPage,
    selectedRow,
    setSelectedRow,

    openDrawerAddCall,
    methodsAddCall,
    handleOpenDrawerAddCall,
    handleCloseDrawerAddCall,
    handleAddCallSubmit,
    employeeList,
    contactsList,
    methodsEditCall,
    openDrawerEditCall,
    handleOpenDrawerEditCall,
    handleCloseDrawerEditCall,
    drawerTitle,
    isFieldDisabled,
    handleSubmitUpdateCall,
    loadingUpdateCall,

    isCallsDeleteModal,
    handleOpenModalDelete,
    handleCloseModalDelete,
    handleSubmitDeleteCalls,
    loadingDelete,
    methodsReschedule,
    loadingRescheduleCall,
    handleSubmitRescheduleCall,
    openRescheduleModal,
    handleOpenModalReschedule,
    handleCloseModalReschedule,

    methodsOutcome,
    handleSubmitOutcomeCall,
    openOutcomeModal,
    handleCloseModalOutcome,
    handleOpenModalOutcome,
    loadingOutcome,
  } = useCalls(contactId);

  const callsTableColumns = columns(selectedRow, setSelectedRow);

  return (
    <PermissionsGuard
      permissions={[SOCIAL_COMPONENTS_CONTACTS_PERMISSIONS?.VIEW_CALLS]}
    >
      <>
        <Box
          sx={{
            boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
            padding: '15px 15px 25px 15px',
            borderRadius: '10px',
          }}
        >
          <Grid container spacing={3} sx={{ marginBottom: '25px' }}>
            {Object?.entries(callsDetails)?.map(([key, value]) => (
              <Grid item md={4} xs={12} key={key}>
                <Box sx={styles?.callStatusBox(callsStatusColor, key)}>
                  <Typography variant="body2">{key}</Typography>
                  <Typography variant="subtitle2">{value}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {loadingGetCalls &&
            Array.from(new Array(3)).map(() => (
              <Skeleton
                sx={{ mb: '10px' }}
                key={uuidv4()}
                variant="rounded"
                animation="wave"
                width="100%"
                height={136}
              />
            ))}
          {!loadingGetCalls && (
            <Grid container sx={styles?.callsGrid}>
              {isNullOrEmpty(dataGetCalls?.data?.contactcalls) && (
                <Grid item xs={12}>
                  <Box sx={styles?.noCallsBox}>
                    <ViewCallIcon />
                    <Typography
                      variant="body3"
                      sx={{ color: theme?.palette?.grey[900] }}
                    >
                      Schedule a call right now from the CRM
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ height: '35px' }}
                      onClick={handleOpenDrawerAddCall}
                      startIcon={<PlusIcon />}
                    >
                      Add Calls
                    </Button>
                  </Box>
                </Grid>
              )}
              {!isNullOrEmpty(dataGetCalls?.data?.contactcalls) && (
                <>
                  <Grid item xs={12}>
                    <Box sx={styles?.callsSpacingBetween}>
                      <Typography variant="h4"> Calls</Typography>
                      <Box
                        sx={{
                          gap: 1,
                          display: 'flex',
                          flexDirection: { xs: 'column', sm: 'row' },
                          alignItems: 'center',
                        }}
                      >
                        <CallsActionDropdown
                          isActionsDisabled={selectedRow?.length === 0}
                          anchorEl={anchorEl}
                          actionMenuOpen={actionMenuOpen}
                          handleActionsMenuClick={handleActionsMenuClick}
                          handleActionsMenuClose={handleActionsMenuClose}
                          handleOpenDrawerEditCall={handleOpenDrawerEditCall}
                          disabledMenuItem={selectedRow?.length > 1}
                          handleOpenModalDelete={handleOpenModalDelete}
                          handleOpenReschedule={handleOpenModalReschedule}
                          handleOpenOutcome={handleOpenModalOutcome}
                        />
                        <Button
                          variant="contained"
                          sx={{ minWidth: '0px', height: '35px', gap: 0.5 }}
                          onClick={handleOpenDrawerAddCall}
                          startIcon={<PlusIcon />}
                        >
                          Add Calls
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sx={{ height: '24vh', overflow: 'auto' }}>
                    <TanstackTable
                      columns={callsTableColumns}
                      data={dataGetCalls?.data?.contactcalls}
                      isLoading={fetchingGetCalls}
                      currentPage={dataGetCalls?.data?.meta?.page}
                      count={dataGetCalls?.data?.meta?.pages}
                      pageLimit={dataGetCalls?.data?.meta?.limit}
                      totalRecords={dataGetCalls?.data?.meta?.total}
                      setPage={setPage}
                      setPageLimit={setPageLimit}
                      onPageChange={(page: any) => setPage(page)}
                      isPagination={true}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          )}
        </Box>

        <AddCall
          openDrawer={openDrawerAddCall}
          onClose={handleCloseDrawerAddCall}
          methods={methodsAddCall}
          onSubmit={handleAddCallSubmit}
          employeeList={employeeList}
          contactsList={contactsList}
        />

        <CallsEditorDrawer
          title={drawerTitle}
          openDrawer={openDrawerEditCall}
          onClose={handleCloseDrawerEditCall}
          methods={methodsEditCall}
          onSubmit={handleSubmitUpdateCall}
          employeeList={employeeList}
          contactsList={contactsList}
          isFieldDisabled={isFieldDisabled}
          loading={loadingUpdateCall}
        />

        <AlertModals
          message={
            "You're about to delete a record. Deleted records can't be restored after 90 days."
          }
          type={'delete'}
          open={isCallsDeleteModal}
          handleClose={handleCloseModalDelete}
          handleSubmitBtn={handleSubmitDeleteCalls}
          loading={loadingDelete}
        />

        <Reschedule
          openModal={openRescheduleModal}
          handleClose={handleCloseModalReschedule}
          methods={methodsReschedule}
          handleSubmit={handleSubmitRescheduleCall}
          loading={loadingRescheduleCall}
        />

        <AddOutcome
          openModal={openOutcomeModal}
          handleClose={handleCloseModalOutcome}
          methods={methodsOutcome}
          handleSubmit={handleSubmitOutcomeCall}
          loading={loadingOutcome}
        />
      </>
    </PermissionsGuard>
  );
};

export default Calls;
