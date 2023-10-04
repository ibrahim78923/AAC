import { useState } from 'react';
import { DownIcon, PlusSharedIcon } from '@/assets/icons';
import { Box, Button, Grid, Typography, useMediaQuery } from '@mui/material';
import { AddMeetingsDrawer } from './AddMeetingsDrawer';
import { meetingsTableColumns } from './MeetingsTable/MeetingsTable.utils';
import { MeetingsTable } from './MeetingsTable';
import { NoMeetings } from './NoMeetings';
import { widgetsData } from './Meetings.data';
import { uuid } from 'uuidv4';
import { meetingsStyles } from './Meetings.styles';

export const Meetings = () => {
  const [meetingsData, setMeetingsData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const matches = useMediaQuery('(max-width:600px)');
  return (
    <>
      <div className="meeting">
        <AddMeetingsDrawer open={drawerOpen} setDrawerOpen={setDrawerOpen} />
        <Grid container sx={meetingsStyles.headingContainer}>
          <Grid item sm={6} xs={12}>
            <Typography variant="h5" fontWeight={500} color="#374151">
              Meetings
            </Typography>
          </Grid>
          <Grid item sx={meetingsStyles.buttonsBox} sm={6} xs={12}>
            <Button
              endIcon={<DownIcon />}
              disableElevation
              disabled={!!!meetingsData.length}
              variant="contained"
              fullWidth={matches}
              sx={meetingsStyles.actionButton}
            >
              Actions
            </Button>
            <Button
              sx={meetingsStyles.addMeetingButton}
              fullWidth={matches}
              startIcon={<PlusSharedIcon />}
              disableElevation
              onClick={() => setDrawerOpen(true)}
              variant="contained"
            >
              Add Meeting
            </Button>
          </Grid>
        </Grid>
        <Grid mb="20px" container spacing={3}>
          {widgetsData.map((item) => (
            <Grid item key={uuid()} sm={4} xs={12}>
              <Box sx={meetingsStyles.widgetsBox}>
                <Box sx={meetingsStyles.coloredWidgetsDiv(item.color)}></Box>
                <Box sx={meetingsStyles.widgetsInnerBox}>
                  <Typography variant="body2" color="#6B7280">
                    {item.name}
                  </Typography>
                  <Typography variant="h5" fontWeight={700} color="#111827">
                    {item.count}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
        {!!meetingsTableColumns.length ? (
          <MeetingsTable
            meetingsData={meetingsData}
            setMeetingsData={setMeetingsData}
          />
        ) : (
          <NoMeetings setDrawerOpen={setDrawerOpen} />
        )}
      </div>
    </>
  );
};
export default Meetings;
