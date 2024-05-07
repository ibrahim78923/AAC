import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { RHFAutocomplete } from '@/components/ReactHookForm';
import { Box, Checkbox, Grid, Typography } from '@mui/material';
import { bufferTime } from '../DateOverrides/DateOverrides.data';

const BufferTime = (props: any) => {
  const { disabled, theme } = props;
  return (
    <>
      <Typography variant="h4">Set buffer time</Typography>
      <Typography variant="h6">
        Want to add time before or after your events?
      </Typography>
      <Grid container gap={2}>
        <Grid item md={4} xs={12}>
          <Box display={'flex'} alignItems={'center'} gap={0.5} py={1}>
            <Checkbox
              icon={<CheckboxIcon />}
              checkedIcon={<CheckboxCheckedIcon />}
              disabled={disabled}
            />
            <Typography
              color={disabled === true ? theme?.palette?.grey?.[900] : ''}
            >
              Before event
            </Typography>
          </Box>
          <Box ml={1}>
            <RHFAutocomplete
              name="beforeEvent"
              placeholder="Select"
              options={bufferTime}
              size="small"
              disabled={disabled}
            />
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box display={'flex'} alignItems={'center'} gap={0.5} py={1}>
            <Checkbox
              icon={<CheckboxIcon />}
              checkedIcon={<CheckboxCheckedIcon />}
              disabled={disabled}
            />
            <Typography
              color={disabled === true ? theme?.palette?.grey?.[900] : ''}
            >
              After event
            </Typography>
          </Box>
          <Box ml={1}>
            <RHFAutocomplete
              name="afterEvent"
              placeholder="Select"
              options={bufferTime}
              size="small"
              disabled={disabled}
              getOptionLabel={(option: any) => option?.toString()}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default BufferTime;
