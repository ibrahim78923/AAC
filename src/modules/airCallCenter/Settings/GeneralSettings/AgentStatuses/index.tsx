import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import useAgentStatuses from './useAgentStatuses';
import { styles } from './AgentStatuses.styles';
import TanstackTable from '@/components/Table/TanstackTable';
import { agentStatusTableColumns, mockData } from './AgentStatuses.data';
import NewAgentStatus from './NewAgentStatus';
import EditAgentStatus from './EditAgentStatus';
import { AlertModals } from '@/components/AlertModals';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { Permissions } from '@/constants/permissions';

const AgentStatuses = () => {
  const {
    openNewAgentStatus,
    handleOpenNewAgentStatus,
    handleCloseNewAgentStatus,
    methodsNewAgentStatus,
    handleNewAgentStatusSubmit,

    openEditAgentStatus,
    methodsEditAgentStatus,
    handleOpenEditAgentStatus,
    handleCloseEditAgentStatus,
    handleEditAgentStatusSubmit,
    newAgentAdded,
    openAlertModal,
    handleCloseAlertModal,
    handleDeleteAgentStatus,
    setOpenAlertModal,
    handleOpenEditNewAgentStatus,
    newStatusAdded,
    text,
    setText,
  } = useAgentStatuses();

  const columns = agentStatusTableColumns(
    handleOpenEditAgentStatus,
    newAgentAdded,
    setOpenAlertModal,
    handleOpenEditNewAgentStatus,
  );
  return (
    <>
      <PermissionsGuard
        permissions={Permissions?.AIR_CALL_CENTER_SETTING_GENERAL_SETTING}
      >
        <Box
          sx={{
            borderRadius: '15px',
            border: '1px solid #EAECF0',
          }}
        >
          <Box sx={styles?.pageHeader}>
            <Box sx={styles?.heading}>
              <Typography variant="h3" sx={{ fontWeight: '600' }}>
                Agent statuses
              </Typography>
              <Button
                variant="contained"
                sx={{ height: '36px', fontWeight: '500' }}
                onClick={handleOpenNewAgentStatus}
              >
                New Agent Status
              </Button>
            </Box>
            <Box sx={styles?.headerText}>
              Agent Statuses determine if Intelli Assign should route
              conversations to an agent. You can also create custom statuses for
              when your agents are unavailable to give insights into how they
              spend their time offline.
            </Box>
          </Box>
          <Box sx={styles?.tableCont}>
            <TanstackTable
              columns={columns}
              data={mockData(newAgentAdded)}
              // isLoading={loagingGetFaqs}
              // isPagination
              // count={dataGetFaqs?.data?.meta?.pages}
              // totalRecords={dataGetFaqs?.data?.meta?.total}
              // onPageChange={handlePageChange}
              // setPage={setPage}
              // setPageLimit={setPageLimit}
            />
          </Box>
        </Box>

        <NewAgentStatus
          isDrawerOpen={openNewAgentStatus}
          onClose={handleCloseNewAgentStatus}
          formMethods={methodsNewAgentStatus}
          handleSubmit={handleNewAgentStatusSubmit}
          text={text}
          setText={setText}

          // isLoading={loadingAddFaq}
        />

        <EditAgentStatus
          isDrawerOpen={openEditAgentStatus}
          onClose={handleCloseEditAgentStatus}
          formMethods={methodsEditAgentStatus}
          handleSubmit={handleEditAgentStatusSubmit}
          newStatusAdded={newStatusAdded}
          text={text}
          setText={setText}
          // isLoading={loadingAddFaq}
        />

        <AlertModals
          type="delete"
          open={openAlertModal}
          handleClose={handleCloseAlertModal}
          handleSubmitBtn={handleDeleteAgentStatus}
          message="Are you sure you want to disable it?"
        />
      </PermissionsGuard>
    </>
  );
};

export default AgentStatuses;
