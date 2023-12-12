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
      <Box sx={styles?.callsGrid(theme)}>
        <Grid container spacing={1}>
          <Grid item md={4} xs={12}>
            <Typography
              variant="h4"
              sx={{ padding: { xs: '12px 0px 0px 12px', md: '12px' } }}
            >
              {' '}
              Calls
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            {!isNullOrEmpty(TasksTableData) && (
              <Box sx={styles?.callsSpacingBetween}>
                <CallsActionDropdown setOpenDrawer={setOpenDrawer} />
                <Button
                  variant="contained"
                  sx={{ minWidth: '0px', gap: 1 }}
                  onClick={() => setOpenDrawer('Add')}
                  className="small"
                >
                  <PlusIcon /> Add Call
                </Button>
              </Box>
            )}
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
                  <PlusIcon /> Add Call
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
      </Box>

      <CallsEditorDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </Box>
  );
};

export default Calls;
