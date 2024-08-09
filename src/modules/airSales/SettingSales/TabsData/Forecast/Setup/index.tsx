import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Theme,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import CustomizeModal from '../CustomizeModal';
import EditForecast from '../EditForecast';

const Setup = () => {
  const theme = useTheme<Theme>();
  const [isShowEditForecast, setIsShowEditForecast] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (event: any) => {
    setDropdownValue(event.target.value as string);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Typography variant="body1" color={theme?.palette?.grey[800]}>
        General setup for the forecast tool. These settings apply to all
        pipelines.
      </Typography>
      <Typography variant="h4" color={theme?.palette?.slateBlue?.main} my={2.5}>
        Setup.
      </Typography>
      <Typography variant="h6" color={theme?.palette?.grey[800]}>
        Forecast Deal Amount
      </Typography>
      <Typography variant="body1" color={theme?.palette?.grey[800]}>
        Choose how deal amounts are displayed on the forecast view and related
        reports.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} my={1}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dropdownValue}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Total Amount</MenuItem>
              <MenuItem value={20}>Weighted Amount</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Typography variant="h6" color={theme?.palette?.grey[800]} mt={1}>
        Forecast period
      </Typography>
      <Typography variant="body1" color={theme?.palette?.grey[800]}>
        Choose the time period you'll use for revenue goals and forecast
        submissions.
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} mt={1}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={dropdownValue}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={10}>Monthly</MenuItem>
              <MenuItem value={20}>Quartly</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Typography
        variant="h4"
        color={theme?.palette?.slateBlue?.main}
        mt={2.5}
        mb={1}
      >
        Forecast categories.
      </Typography>

      <Box display={'flex'} flexWrap={'wrap'} alignItems={'center'}>
        <Box
          sx={{
            height: '70px',
            width: '70px',
            background: theme?.palette?.custom?.light_gray_color,
          }}
        ></Box>
        <Box ml={1}>
          <Typography
            variant="body1"
            color={theme?.palette?.primary?.main}
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            onClick={() => setIsShowEditForecast(true)}
          >
            Edit Forecast Categories
          </Typography>
          <Typography variant="body1" color={theme?.palette?.grey[800]}>
            Edit the forecast category property to add, remove, or rename the
            forecast categories used for your account.
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="body1"
        color={theme?.palette?.primary?.main}
        mt={2}
        fontWeight={'500'}
        sx={{ textDecoration: 'underline', cursor: 'pointer' }}
        onClick={handleClickOpen}
      >
        Customize the forecast Category Table
      </Typography>

      <Typography variant="body1" color={theme?.palette?.grey[600]}>
        Choose the forecast categories and columns that will be displayed in the
        forecast tool. Customize the deal stage table for each pipeline on the
        pipeline tab.
      </Typography>
      <Typography variant="body1" color={theme?.palette?.grey[600]} my={1}>
        Map forecast categories to the deal stages for each pipeline on the tab.
      </Typography>

      <Typography
        variant="h4"
        color={theme?.palette?.grey[800]}
        mt={2.5}
        mb={1}
      >
        Forecast Submission
      </Typography>
      <Box display={'flex'}>
        <Checkbox />
        <Box>
          <Typography variant="body1" color={theme?.palette?.slateBlue?.main}>
            Forecast submission status indicator
          </Typography>

          <Typography variant="body3" color={theme?.palette?.custom?.main}>
            Indicate which forecast submissions have not been updated after a
            set amount of time.
          </Typography>
        </Box>
      </Box>

      {open && <CustomizeModal open={open} handleClose={handleClose} />}

      {isShowEditForecast && (
        <EditForecast
          isOpenDrawer={isShowEditForecast}
          onClose={setIsShowEditForecast}
        />
      )}
    </>
  );
};

export default Setup;
