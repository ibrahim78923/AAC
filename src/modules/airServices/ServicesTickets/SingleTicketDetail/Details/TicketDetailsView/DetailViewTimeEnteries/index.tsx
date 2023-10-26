import { Grid, Typography, Box } from '@mui/material';

import { useState } from 'react';
import DetailTimePicker from '../../../SingleTicketDetailsComponents/Header/TimePicker';
import { Button, ButtonGroup } from '@mui/material';
import { CirclePlusIcon, ViewDetailVuesaxIcon } from '@/assets/icons';
import { DetailTicketsDrawer } from './DetailTicketsDrawer';
import { headerStyle } from '../../../SingleTicketDetailsComponents/Header/Header.styles';
import { detailViewTimeEnteriesStyle } from './DetailViewTimeEnteries.styles';
export default function DetialViewTimeEnterires() {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  return (
    <>
      <Grid
        container
        spacing={0}
        sx={detailViewTimeEnteriesStyle?.timeEnterMainGride}
      >
        <Grid
          item
          md={6}
          xs={12}
          sx={detailViewTimeEnteriesStyle?.timeEnterInnerGrid}
        >
          <Typography variant="h5" component="span">
            Time Entries
          </Typography>
        </Grid>
        <Grid
          item
          md={3}
          xs={11}
          sx={detailViewTimeEnteriesStyle?.timeEnterInnerGrid}
        >
          <Box sx={headerStyle?.iconBoxStyling}>
            <ViewDetailVuesaxIcon />
          </Box>
          <Box sx={headerStyle?.iconBoxTimerStyling}>
            <DetailTimePicker />
          </Box>
          <Box sx={detailViewTimeEnteriesStyle?.buttonStyleOFTimeEntries}>
            <ButtonGroup variant="contained" color="primary">
              <Button
                onClick={() => setIsDrawerOpen(true)}
                startIcon={<CirclePlusIcon />}
                sx={detailViewTimeEnteriesStyle?.buttonHeigh}
              >
                Time button
              </Button>
            </ButtonGroup>
            <DetailTicketsDrawer
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        sx={detailViewTimeEnteriesStyle?.timeEnterSecGride}
      >
        <Grid
          xs={12}
          md={2.5}
          item
          sx={detailViewTimeEnteriesStyle?.timeEnterInnerSecGrid}
        >
          <Box sx={detailViewTimeEnteriesStyle?.timeEnterInnerBox}>
            <Typography variant="body1"> Total Time track</Typography>
            <Typography variant="body1" component="span" sx={{ ml: '1rem' }}>
              03h:01m
            </Typography>
          </Box>
          <Box sx={detailViewTimeEnteriesStyle?.timeEnterInnerSecBox}>
            <Typography variant="body1"> Start Time</Typography>
            <Typography variant="body1" component="span" sx={{ ml: '1rem' }}>
              07:00AM
            </Typography>
          </Box>
          <Box sx={detailViewTimeEnteriesStyle?.timeEnterInnerSecBox}>
            <Typography variant="body1"> End Time </Typography>
            <Typography variant="body1" component="span" sx={{ ml: '1rem' }}>
              00:00AM
            </Typography>
          </Box>
        </Grid>
        <Grid
          xs={12}
          md={2.5}
          item
          sx={detailViewTimeEnteriesStyle?.timeEnterInnerThirdGrid}
        >
          <Box sx={detailViewTimeEnteriesStyle?.timeEnterInnerThirdBox}>
            <Typography variant="subtitle1">Wednesday,22 September</Typography>
            <Typography
              variant="body1"
              sx={detailViewTimeEnteriesStyle?.timeEnterInnerTypogrph}
            >
              00:00 - 00:00
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={0}
        sx={detailViewTimeEnteriesStyle?.timeEnterInnerLastGrid}
      >
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
