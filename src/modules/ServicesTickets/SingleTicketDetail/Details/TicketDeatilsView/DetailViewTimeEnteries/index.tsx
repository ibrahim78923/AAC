import { Grid, Typography, Box } from '@mui/material';
import ViewDetailVuesaxIcon from '../../../../../../assets/icons/modules/view-detail-Icon/view-details-vuesax-icon';
import {
  iconBoxStyling,
  iconBoxTimerStyling,
} from '../../../components/TopOfPage/TopOfPage.style';
import DetailTimePicker from '../../../components/TopOfPage/TimePicker';
import { Button, ButtonGroup } from '@mui/material';
import { CirclePlusIcon } from '@/assets/icons';
import {
  buttonStyleOFTimeEntries,
  buttonHeigh,
  timeEnterInnerBox,
  timeEnterInnerGrid,
  timeEnterInnerLastGrid,
  timeEnterInnerSecBox,
  timeEnterInnerSecGrid,
  timeEnterInnerThirdBox,
  timeEnterInnerThirdGrid,
  timeEnterInnerTypogrph,
  timeEnterMainGride,
  timeEnterSecGride,
} from './DetailViewTimeEnteries.style';

export default function DetialViewTimeEnterires() {
  return (
    <>
      <Grid container spacing={0} sx={timeEnterMainGride}>
        <Grid item sx={timeEnterInnerGrid}>
          <Typography variant="h5" component="span">
            Time Entries
          </Typography>
        </Grid>
        <Grid item sx={timeEnterInnerGrid}>
          <Box sx={iconBoxStyling}>
            <ViewDetailVuesaxIcon />
          </Box>
          <Box sx={iconBoxTimerStyling}>
            <DetailTimePicker />
          </Box>
          <Box sx={buttonStyleOFTimeEntries}>
            <ButtonGroup variant="contained" color="primary">
              <Button startIcon={<CirclePlusIcon />} sx={buttonHeigh}>
                Time button
              </Button>
            </ButtonGroup>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={0} sx={timeEnterSecGride}>
        <Grid item sx={timeEnterInnerSecGrid}>
          <Box sx={timeEnterInnerBox}>
            <Typography variant="body1"> Total Time track</Typography>
            <Typography variant="body1" component="span" sx={{ ml: '4rem' }}>
              03h:01m
            </Typography>
          </Box>
          <Box sx={timeEnterInnerSecBox}>
            <Typography variant="body1"> Start Time</Typography>
            <Typography variant="body1" component="span" sx={{ ml: '6.5rem' }}>
              07:00AM
            </Typography>
          </Box>
          <Box sx={timeEnterInnerSecBox}>
            <Typography variant="body1"> End Time </Typography>
            <Typography variant="body1" component="span" sx={{ ml: '7rem' }}>
              00:00AM
            </Typography>
          </Box>
        </Grid>
        <Grid item sx={timeEnterInnerThirdGrid}>
          <Box sx={timeEnterInnerThirdBox}>
            <Typography variant="subtitle1">Wednesday,22 September</Typography>
            <Typography variant="body1" sx={timeEnterInnerTypogrph}>
              00:00 - 00:00
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={0} sx={timeEnterInnerLastGrid}>
        <Box sx={{ mr: '0.5rem' }}>
          <ButtonGroup>
            <Button>Cancel</Button>
          </ButtonGroup>
        </Box>
        <Box sx={{ ml: '0.5rem' }}>
          <ButtonGroup variant="contained" color="primary">
            <Button>Add Button</Button>
          </ButtonGroup>
        </Box>
      </Grid>
    </>
  );
}
