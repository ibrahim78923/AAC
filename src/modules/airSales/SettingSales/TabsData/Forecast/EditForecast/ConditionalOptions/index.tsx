import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';

const ConditionalOptions = () => {
  const theme: any = useTheme();

  return (
    <Box>
      <Typography variant="h6">Conditional Options</Typography>
      <FormLabel>
        <Typography variant="body2" fontWeight={'500'} mt={1}>
          Which property determines the values available for "Forecast
          category"?
        </Typography>
      </FormLabel>
      <FormControl fullWidth margin="normal">
        <Select defaultValue="">
          <MenuItem value="None">None</MenuItem>
          <MenuItem value="John Alex">John Alex</MenuItem>
        </Select>
      </FormControl>
      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', alignItems: 'stretch' }}
      >
        <Grid item xs={6}>
          <Typography
            variant="body2"
            fontWeight={'500'}
            color={theme?.palette?.BLUE?.dull_blue}
            mt={1}
          >
            when controlling property equals
          </Typography>
          <Box
            sx={{
              border: `1px solid ${theme?.palette?.grey[0]}`,
              borderRadius: '5px',
              height: '88%',
            }}
          >
            <TextField
              variant="outlined"
              placeholder="search"
              fullWidth
              sx={{ padding: '10px', '& input': { height: '12px' } }}
            />
            <hr />
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              p={0.5}
              m={1}
              sx={{ backgroundColor: theme?.palette?.primary?.light }}
            >
              <Typography>John Alex</Typography>
              <Typography>All</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="body2"
            fontWeight={'500'}
            color={theme?.palette?.BLUE?.dull_blue}
            mt={1}
          >
            Show these options for “Forecast Property”
          </Typography>

          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="AllOptions"
                control={<Radio />}
                label="All available options"
              />
              <FormControlLabel
                value="OnlyTheseOptions"
                control={<Radio />}
                label="Only these Options"
              />
            </RadioGroup>
          </FormControl>

          <Box
            sx={{
              border: `1px solid ${theme?.palette?.grey[0]}`,
              borderRadius: '5px',
            }}
          >
            <TextField
              variant="outlined"
              placeholder="search"
              fullWidth
              sx={{ padding: '10px', '& input': { height: '12px' } }}
            />
            <hr />
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'space-between'}
              p={0.5}
              m={1}
            >
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Not Forecasted"
                />
                <FormControlLabel control={<Checkbox />} label="Pipeline" />
                <FormControlLabel control={<Checkbox />} label="Best Case" />
                <FormControlLabel control={<Checkbox />} label="Commit" />
                <FormControlLabel control={<Checkbox />} label="Closed won" />
              </FormGroup>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default ConditionalOptions;
