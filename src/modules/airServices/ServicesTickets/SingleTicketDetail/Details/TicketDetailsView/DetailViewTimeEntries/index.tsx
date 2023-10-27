import { Grid, Typography, Box } from '@mui/material';

import { useState } from 'react';
import DetailTimePicker from '../../../SingleTicketDetailsComponents/Header/TimePicker';
import { Button, ButtonGroup } from '@mui/material';
import { CirclePlusIcon, ViewDetailVuesaxIcon } from '@/assets/icons';
import { styles } from './DetailViewTimeEntries.style';
import { DetailTicketDrawer } from './DetailTicketDrawer';

export default function DetailViewTimeEntries() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  return (
    <>
      <Grid container spacing={0} sx={styles?.timeEnterMainGride}>
        <Grid item md={6} xs={12} sx={styles?.timeEnterInnerGrid}>
          <Typography variant="h5" component="span">
            Time Entries
          </Typography>
        </Grid>
        <Grid item md={3} xs={11} sx={styles?.timeEnterInnerGrid}>
          <Box sx={styles?.iconBoxStyling}>
            <ViewDetailVuesaxIcon />
          </Box>
          <Box sx={styles?.iconBoxTimerStyling}>
            <DetailTimePicker />
          </Box>
          <Box sx={styles?.buttonStyleOFTimeEntries}>
            <ButtonGroup variant="contained" color="primary">
              <Button
                onClick={() => setIsDrawerOpen(true)}
                startIcon={<CirclePlusIcon />}
                sx={styles?.buttonHeigh}
              >
                Time button
              </Button>
            </ButtonGroup>
            <DetailTicketDrawer
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={0} sx={styles?.timeEnterSecGride}>
        <Grid xs={12} md={2.5} item sx={styles?.timeEnterInnerSecGrid}>
          <Box sx={styles?.timeEnterInnerBox}>
            <Typography variant="body1"> Total Time track</Typography>
            <Typography variant="body1" component="span" sx={{ ml: '1rem' }}>
              03h:01m
            </Typography>
          </Box>
          <Box sx={styles?.timeEnterInnerSecBox}>
            <Typography variant="body1"> Start Time</Typography>
            <Typography variant="body1" component="span" sx={{ ml: '1rem' }}>
              07:00AM
            </Typography>
          </Box>
          <Box sx={styles?.timeEnterInnerSecBox}>
            <Typography variant="body1"> End Time </Typography>
            <Typography variant="body1" component="span" sx={{ ml: '1rem' }}>
              00:00AM
            </Typography>
          </Box>
        </Grid>
        <Grid xs={12} md={2.5} item sx={styles?.timeEnterInnerThirdGrid}>
          <Box sx={styles?.timeEnterInnerThirdBox}>
            <Typography variant="subtitle1">Wednesday,22 September</Typography>
            <Typography variant="body1" sx={styles?.timeEnterInnerTypogrph}>
              00:00 - 00:00
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={0} sx={styles?.timeEnterInnerLastGrid}>
        <Box sx={{ mr: '0.5rem' }}>
          <ButtonGroup>
            <Button>Cancel</Button>
          </ButtonGroup>
        </Box>
        <Box sx={{ ml: '0.5rem' }}>
          <ButtonGroup variant="contained" color="primary">
            <Button>Submit</Button>
          </ButtonGroup>
        </Box>
      </Grid>
    </>
  );
}
