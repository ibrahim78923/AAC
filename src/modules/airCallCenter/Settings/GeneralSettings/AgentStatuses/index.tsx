import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import useAgentStatuses from './useAgentStatuses';
import { styles } from './AgentStatuses.styles';
import TanstackTable from '@/components/Table/TanstackTable';
import { agentStatusTableColumns, mockData } from './AgentStatuses.data';
import NewAgentStatus from './NewAgentStatus';
import EditAgentStatus from './EditAgentStatus';

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
  } = useAgentStatuses();

  const columns = agentStatusTableColumns(handleOpenEditAgentStatus);
  return (
    <>
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
            data={mockData}
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
        // isLoading={loadingAddFaq}
      />

      <EditAgentStatus
        isDrawerOpen={openEditAgentStatus}
        onClose={handleCloseEditAgentStatus}
        formMethods={methodsEditAgentStatus}
        handleSubmit={handleEditAgentStatusSubmit}
        // isLoading={loadingAddFaq}
      />
    </>
  );
};

export default AgentStatuses;
