import { Avatar, Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import useSingleAllCallsDetails from './useSingleAllCallsDetails';
import Search from '@/components/Search';
import TanstackTable from '@/components/Table/TanstackTable';
import { singleAllCallsDetailsData } from './singleAllCallsDetails.data';
import SingleCallsNotesDrawer from './SinglecallNotesDrawer';
import { CallerAvatarImage } from '@/assets/images';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AIR_CALL_CENTER } from '@/constants';
import PermissionsGuard from '@/GuardsAndPermissions/PermissonsGuard';
import { AIR_CALL_CENTER_CALL_METRICS_PERMISSION } from '@/constants/permission-keys';

const SingleAllCallsDetails = () => {
  const {
    theme,

    setSearchTerm,
    getColumns,
    page,
    setPage,
    pageLimit,
    setPageLimit,
    isViewDrawerOpen,
    setIsViewDrawerOpen,
    router,
  } = useSingleAllCallsDetails();
  return (
    <PermissionsGuard
      permissions={[
        AIR_CALL_CENTER_CALL_METRICS_PERMISSION?.ALL_CALLS_CALL_DETAILS,
      ]}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} lg={2.5}>
          <Box
            sx={{
              border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
              borderRadius: '18px',
              minHeight: '720px',
              height: '720px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '40px 20px',
              }}
            >
              <Avatar alt="Remy Sharp" src={CallerAvatarImage?.src} />
              <Typography variant="h6">Olivia Rhye </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                alignItems: 'center',
                padding: '10px 20px',
              }}
            >
              <Typography variant="h6">Contact Details</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '10px',
                padding: '10px 20px',
              }}
            >
              <Typography variant="body2">Name</Typography>
              <Typography variant="body2">Sophia Baxter</Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: '10px',
                padding: '10px 20px',
              }}
            >
              <Typography variant="body2">Phone Number</Typography>
              <Typography variant="body2">+12314 1414 1312 4</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={9.5}>
          <Box
            sx={{
              border: `1px solid ${theme?.palette?.custom?.off_white_three}`,
              borderRadius: '18px',
            }}
          >
            <Box
              sx={{
                padding: '10px 20px',
                mb: '3rem',
                alignItems: 'center',
                display: 'flex',
                gap: '10px',
                cursor: 'pointer',
              }}
            >
              <ArrowBackIcon
                onClick={() => {
                  router.push(AIR_CALL_CENTER?.CALL_METRICS);
                }}
              />
              <Typography variant="h3">Conversations</Typography>
            </Box>
            <Box sx={{ padding: '10px 20px' }}>
              <Search label="Search Here" setSearchBy={setSearchTerm} />
            </Box>
            <TanstackTable
              columns={getColumns}
              data={singleAllCallsDetailsData}
              setPage={setPage}
              setPageLimit={setPageLimit}
              isPagination
              // isLoading={isLoading}
              currentPage={page}
              // count={Calls?.meta?.total}
              pageLimit={pageLimit}
              // totalRecords={Calls?.meta?.total}
              // isSuccess={true}
              // onPageChange={(page: any) => setPage(page)}
            />
            {isViewDrawerOpen && (
              <SingleCallsNotesDrawer
                isViewDrawerOpen={isViewDrawerOpen}
                setIsViewDrawerOpen={setIsViewDrawerOpen}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </PermissionsGuard>
  );
};

export default SingleAllCallsDetails;
