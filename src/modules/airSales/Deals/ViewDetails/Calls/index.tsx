import React from 'react';

import { Box, Button, Grid, Typography } from '@mui/material';

import CallsEditorDrawer from './CallsEditorDrawer';
import CallsActionDropdown from './CallsActionDropDown';
import TanstackTable from '@/components/Tabel/TanstackTable';

import useCalls from './useCalls';

import { isNullOrEmpty } from '@/utils';

import { TasksTableData } from '@/mock/modules/Deals';
import { callsDetails, callsStatusColor, columns } from './Calls.data';

import { CallIcon, PlusSharedIcon } from '@/assets/icons';

import { styles } from './Calls.style';

const Calls = () => {
  const { openDrawer, setOpenDrawer, theme } = useCalls();

  return (
    <div>
      <Grid container spacing={3} sx={{ marginBottom: '25px' }}>
        {Object.entries(callsDetails).map(([key, value]) => (
          <Grid item md={4} xs={12} key={key}>
            <Box sx={styles.callStatusBox(callsStatusColor, key)}>
              <Typography variant="body2">{key}</Typography>
              <Typography variant="subtitle2">{value}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Grid container sx={styles.callsGrid}>
        <Grid item xs={12}>
          <Box sx={styles.callsSpacingBetween}>
            <Typography variant="h4"> Calls</Typography>
            {!isNullOrEmpty(TasksTableData) && (
              <Box sx={{ gap: 1, display: 'flex' }}>
                <CallsActionDropdown setOpenDrawer={setOpenDrawer} />
                <Button
                  variant="contained"
                  sx={{ minWidth: '0px', height: '35px', gap: 0.5 }}
                  onClick={() => setOpenDrawer('Add')}
                >
                  <PlusSharedIcon /> Add Calls
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12}>
          {isNullOrEmpty(TasksTableData) && (
            <Box sx={styles.noCallsBox}>
              <CallIcon />
              <Typography
                variant="body3"
                sx={{ color: theme.palette.grey[900] }}
              >
                Schedule a call right now from the CRM
              </Typography>
              <Button
                variant="contained"
                sx={{ height: '35px' }}
                onClick={() => setOpenDrawer('Add')}
              >
                <PlusSharedIcon /> Add Calls
              </Button>
            </Box>
          )}
        </Grid>
        <Grid item xs={12}>
          {!isNullOrEmpty(TasksTableData) && (
            <TanstackTable columns={columns} data={TasksTableData} />
          )}
        </Grid>
      </Grid>

      <CallsEditorDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </div>
  );
};

export default Calls;
