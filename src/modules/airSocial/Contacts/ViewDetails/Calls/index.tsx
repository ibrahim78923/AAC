import { Box, Button, Grid, Typography } from '@mui/material';

import TanstackTable from '@/components/Table/TanstackTable';

import { callsDetails, callsStatusColor, columns } from './Calls.data';

import CallsActionDropdown from './CallsActionDropDown';

import useCalls from './useCalls';

import { PlusSharedIcon, ViewCallIcon } from '@/assets/icons';

import { styles } from './Calls.style';

import { isNullOrEmpty } from '@/utils';
import AddCall from './AddCalls';

const Calls = () => {
  const {
    dataGetCalls,
    loadingGetCalls,
    setPageLimit,
    setPage,
    handlePageChange,
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    isActionsDisabled,
    setRowId,
    // rowId,

    openDrawerAddCall,
    methodsAddCall,
    handleOpenDrawerAddCall,
    handleCloseDrawerAddCall,
    handleAddCallSubmit,
    theme,
  } = useCalls();

  const callsTableColumns = columns(
    selectedRow,
    setSelectedRow,
    setIsActionsDisabled,
    setRowId,
  );

  return (
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
      <Grid container sx={styles?.callsGrid}>
        <Grid item xs={12}>
          <Box sx={styles?.callsSpacingBetween}>
            <Typography variant="h4"> Calls</Typography>
            {!isNullOrEmpty(dataGetCalls?.data?.contactcalls) && (
              <Box
                sx={{
                  gap: 1,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                }}
              >
                <CallsActionDropdown isActionsDisabled={isActionsDisabled} />
                <Button
                  variant="contained"
                  sx={{ minWidth: '0px', height: '35px', gap: 0.5 }}
                  onClick={handleOpenDrawerAddCall}
                >
                  <PlusSharedIcon /> Add Calls
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
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
              >
                <PlusSharedIcon /> Add Calls
              </Button>
            </Box>
          </Grid>
        )}
        {!isNullOrEmpty(dataGetCalls?.data?.contactcalls) && (
          <Grid item xs={12} sx={{ height: '24vh', overflow: 'auto' }}>
            <TanstackTable
              columns={callsTableColumns}
              data={dataGetCalls?.data?.contactcalls}
              isLoading={loadingGetCalls}
              isPagination={true}
              count={dataGetCalls?.data?.meta?.pages}
              totalRecords={dataGetCalls?.data?.meta?.total}
              onPageChange={handlePageChange}
              setPage={setPage}
              setPageLimit={setPageLimit}
            />
          </Grid>
        )}
      </Grid>

      <AddCall
        openDrawer={openDrawerAddCall}
        onClose={handleCloseDrawerAddCall}
        methods={methodsAddCall}
        onSubmit={handleAddCallSubmit}
      />
    </Box>
  );
};

export default Calls;
