// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import {
  Box,
  Radio,
  RadioGroup,
  FormHelperText,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material';

// ----------------------------------------------------------------------

export default function RHFDesignedRadioButton({
  name,
  options,
  ...other
}: any) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box position="relative">
          <RadioGroup {...field} row {...other}>
            <Grid container spacing={2}>
              {options?.map((option: any) => (
                <Grid item xs={12} key={option?.value}>
                  <Box
                    bgcolor="primary.lighter"
                    p="1.3rem 1rem"
                    borderRadius={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <FormControlLabel
                      value={option?.value}
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography
                            variant="body1"
                            color="slateBlue.main"
                            component="p"
                          >
                            {option?.labelOne}
                          </Typography>
                          <Typography
                            variant="body1"
                            color="slateBlue.main"
                            component="p"
                          >
                            {option?.labelTwo}
                          </Typography>
                        </Box>
                      }
                    />
                    <Box>{option?.icon}</Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </RadioGroup>

          {!!error && (
            <FormHelperText error sx={{ display: 'block', mt: -0.5, ml: 0 }}>
              {error?.message}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
}
