import React from 'react';

import { Box, Button, Grid, Typography } from '@mui/material';

import Image from 'next/image';

import TanstackTable from '@/components/Tabel/TanstackTable';
import MeetingsDropDown from './MeetingsDropDown';
import MeetingsEditorDrawer from './MeetingsEditorDrawer';

import useMeetings from './useMeetings';

import { isNullOrEmpty } from '@/utils';

import { TasksTableData } from '@/mock/modules/Deals';
import { callsDetails, callsStatusColor, columns } from './Meetings.data';

import { EmailMeetingImage } from '@/assets/images';
import { MircosoftTeamsIcon, PlusSharedIcon, ZoomIcon } from '@/assets/icons';

import { styles } from './Meetings.style';

const Calls = () => {
  const { openDrawer, setOpenDrawer, theme } = useMeetings();

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
        padding: '15px 15px 25px 15px',
        borderRadius: '10px',
      }}
    >
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
      <Grid container>
        <Grid item xs={12}>
          <Box sx={styles.callsSpacingBetween}>
            <Typography variant="h4"> Meetings</Typography>
            {!isNullOrEmpty(TasksTableData) && (
              <Box sx={{ gap: 1, display: 'flex' }}>
                <MeetingsDropDown setOpenDrawer={setOpenDrawer} />
                <Button
                  variant="contained"
                  sx={{ minWidth: '0px', height: '35px', gap: 0.5 }}
                  onClick={() => setOpenDrawer('Add')}
                >
                  <PlusSharedIcon /> Create Meeting
                </Button>
              </Box>
            )}
          </Box>
        </Grid>
        {!isNullOrEmpty(TasksTableData) && (
          <Grid item xs={12}>
            <Box
              sx={{
                height: '24vh',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 1.5,
              }}
            >
              <Image src={EmailMeetingImage} alt="EmailMeetingImage" />
              <Typography
                variant="body2"
                sx={{ color: theme.palette.grey[900] }}
              >
                Schedule virtual and in-person meetings right from the CRM.
              </Typography>
              <Button variant="contained" sx={{ gap: 0.5 }} className="small">
                <PlusSharedIcon />
                <Typography variant="body2">Create Meetings</Typography>
              </Button>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.slateBlue.main }}
              >
                Bring Your emails into the CRM
              </Typography>
              <Box
                sx={{
                  gap: 1,
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Button
                  variant="outlined"
                  sx={{ color: 'grey', gap: 0.5 }}
                  className="small"
                >
                  <ZoomIcon /> <Typography variant="body2">Zoom</Typography>
                </Button>

                <Button
                  variant="outlined"
                  sx={{ color: 'grey', gap: 0.5 }}
                  className="small"
                >
                  <MircosoftTeamsIcon />
                  <Typography variant="body2">Microsoft Teams</Typography>
                </Button>
              </Box>
            </Box>
          </Grid>
        )}
        {isNullOrEmpty(TasksTableData) && (
          <Grid item xs={12} sx={{ height: '24vh', overflow: 'auto' }}>
            <TanstackTable columns={columns} data={TasksTableData} />
          </Grid>
        )}
      </Grid>

      <MeetingsEditorDrawer
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
      />
    </Box>
  );
};

export default Calls;
