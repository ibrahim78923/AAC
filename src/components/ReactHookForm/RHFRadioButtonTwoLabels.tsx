import { useFormContext, Controller } from 'react-hook-form';
import {
  Box,
  Radio,
  RadioGroup,
  FormHelperText,
  FormControlLabel,
  Grid,
  Typography,
} from '@mui/material';
import CustomLabel from '../CustomLabel';

export default function RHFRadioButtonTwoLabel({
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
          {other?.label && (
            <CustomLabel label={other?.label} required={other?.required} />
          )}
          <RadioGroup {...field} row {...other}>
            <Grid container spacing={2}>
              {options?.map((option: any) => (
                <Grid item xs={6} key={option?.value}>
                  <Box
                    border="0.06rem solid"
                    borderColor="grey.700"
                    p="0.7rem 1rem"
                    pr={0}
                    borderRadius={2}
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                  >
                    <FormControlLabel
                      value={option?.value}
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography
                            variant="body4"
                            component="p"
                            color="grey.600"
                          >
                            {option?.labelOne}
                          </Typography>
                          <Typography
                            variant="body3"
                            component="p"
                            color="grey.900"
                          >
                            {option?.labelTwo}
                          </Typography>
                        </Box>
                      }
                    />
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
