import { CheckboxCheckedIcon, CheckboxIcon } from '@/assets/icons';
import { RHFAutocomplete } from '@/components/ReactHookForm';
import { Box, Checkbox, Grid, Typography } from '@mui/material';
import { bufferTime } from '../DateOverrides/DateOverrides.data';
import { useBufferTime } from './useBufferTime';

const BufferTime = (props: any) => {
  const { disabled, theme } = props;
  const { beforeChecked, setBeforeChecked, afterChecked, setAfterChecked } =
    useBufferTime(props);
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
              checked={beforeChecked}
              onChange={(e) => setBeforeChecked(e?.target?.checked)}
            />
            <Typography
              color={disabled === true ? theme?.palette?.grey?.[900] : ''}
            >
              Before event
            </Typography>
          </Box>
          <Box ml={1}>
            <RHFAutocomplete
              name="bufferTime.bufferBefore"
              placeholder="Select"
              options={bufferTime}
              size="small"
              disabled={disabled || !beforeChecked}
              getOptionLabel={(option: any) => option?.label}
            />
          </Box>
        </Grid>
        <Grid item md={4} xs={12}>
          <Box display={'flex'} alignItems={'center'} gap={0.5} py={1}>
            <Checkbox
              icon={<CheckboxIcon />}
              checkedIcon={<CheckboxCheckedIcon />}
              disabled={disabled}
              checked={afterChecked}
              onChange={(e) => setAfterChecked(e?.target?.checked)}
            />
            <Typography
              color={disabled === true ? theme?.palette?.grey?.[900] : ''}
            >
              After event
            </Typography>
          </Box>
          <Box ml={1}>
            <RHFAutocomplete
              name="bufferTime.bufferAfter"
              placeholder="Select"
              options={bufferTime}
              size="small"
              disabled={disabled || !afterChecked}
              getOptionLabel={(option: any) => option?.label}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default BufferTime;
