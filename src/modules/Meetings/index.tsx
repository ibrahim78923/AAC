import { useState } from 'react';
import { DownIcon, PlusSharedIcon } from '@/assets/icons';
import { WIDGETSDATA } from '@/mock/modules/Meetings';
import { Box, Button, Grid, Typography } from '@mui/material';
import { NoMeetings } from './NoMeetings';
import { MeetingsTable } from './MeetingsTable';
import { MeetingsTableData } from './MeetingsTable/MeetingsTable.utils';

export const Meeting = () => {
  const [meetingsData, setMeetingsData] = useState([]);
  return (
    <>
      <div className="meeting">
        <Grid container sx={{ mb: '20px' }}>
          <Grid item xs={6}>
            <Typography variant="h5" fontWeight={500} color="#374151">
              Meetings
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              display: 'flex',
              justifyContent: 'end',
              alignItems: 'center',
              gap: '20px',
            }}
            xs={6}
          >
            <Button
              endIcon={<DownIcon />}
              disableElevation
              disabled={!!!meetingsData.length}
              variant="contained"
              sx={{
                bgcolor: '#fff !important',
                border: '1px solid #E5E7EB',
                borderRadius: '4px',
                color: '#6B7280',
                fontWeight: '500',
              }}
            >
              Actions
            </Button>
            <Button
              sx={{
                fontWeight: '500',
              }}
              startIcon={<PlusSharedIcon />}
              disableElevation
              variant="contained"
            >
              Add Meeting
            </Button>
          </Grid>
        </Grid>
        <Grid mb="20px" container spacing={3}>
          {WIDGETSDATA.map((item) => (
            <Grid item key={item.id} xs={4}>
              <Box
                sx={{
                  bgcolor: 'common.white',
                  borderRadius: '6px',
                  boxShadow: '0px 0px 4px 0px rgba(0, 0, 0, 0.10)',
                  display: 'flex',
                }}
              >
                <Box
                  sx={{
                    width: '6px',
                    height: '52px',
                    mr: '22px',
                    borderRadius: '6px 0px 0px 6px',
                    bgcolor: item.color,
                  }}
                ></Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: '11px 11px',
                    width: '100%',
                    pl: 0,
                  }}
                >
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
        {!!MeetingsTableData.length ? (
          <MeetingsTable
            meetingsData={meetingsData}
            setMeetingsData={setMeetingsData}
          />
        ) : (
          <NoMeetings />
        )}
      </div>
    </>
  );
};
export default Meeting;
