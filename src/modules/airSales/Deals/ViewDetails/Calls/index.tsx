import { Box, Button, Grid, Typography } from '@mui/material';

import CallsEditorDrawer from './CallsEditorDrawer';
import CallsActionDropdown from './CallsActionDropDown';
import TanstackTable from '@/components/Table/TanstackTable';
import { isNullOrEmpty } from '@/utils';

import useCalls from './useCalls';

import { TasksTableData } from '@/mock/modules/airSales/Deals/ViewDetails';
import { callsDetails, callsStatusColor, columns } from './Calls.data';

import { PlusIcon, ViewCallIcon } from '@/assets/icons';

import { styles } from './Calls.style';

const Calls = () => {
  const { openDrawer, setOpenDrawer, theme } = useCalls();

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
            {!isNullOrEmpty(TasksTableData) && (
              <Box
                sx={{
                  gap: 1,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                }}
              >
                <CallsActionDropdown setOpenDrawer={setOpenDrawer} />
                <Button
                  variant="contained"
                  sx={{ minWidth: '0px', height: '35px', gap: 0.5 }}
                  onClick={() => setOpenDrawer('Add')}
                >
                  <PlusIcon /> Add Call
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
        {isNullOrEmpty(TasksTableData) && (
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
                onClick={() => setOpenDrawer('Add')}
              >
                <PlusIcon /> Add Calls
              </Button>
            </Box>
          </Grid>
        )}
        {!isNullOrEmpty(TasksTableData) && (
          <Grid item xs={12} sx={{ height: '24vh', overflow: 'auto' }}>
            <TanstackTable columns={columns} data={TasksTableData} />
          </Grid>
        )}
      </Grid>

      <CallsEditorDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </Box>
  );
};

export default Calls;
