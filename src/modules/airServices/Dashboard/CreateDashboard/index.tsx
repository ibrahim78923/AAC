import { ExampleDashboardImage } from '@/assets/images';
import {
  FormProvider,
  RHFMultiCheckbox,
  RHFSwitch,
  RHFTextField,
} from '@/components/ReactHookForm';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { dashboardCheckboxData } from './CreateDashboard.data';

export const CreateDashboard = () => {
  const theme = useTheme();
  const methodsCreateDashboardFilterForm = useForm({
    defaultValues: {
      dashboardName: '',
      default: false,
      dashboardItems: [],
    },
  });
  // const submitCreateDashboardFilterForm = async () => {};
  // const resetCreateDashboardFilterForm = async () => {
  //   methodsCreateDashboardFilterForm?.reset();
  // };
  return (
    <>
      <FormProvider methods={methodsCreateDashboardFilterForm}>
        <Typography variant="h3" color="grey.800">
          Create dashboard
        </Typography>
        <Grid
          container
          spacing={3}
          sx={{
            borderBottom: '1px solid',
            borderColor: 'grey.700',
            mt: '16px',
            mb: '24px',
            pb: '24px',
          }}
        >
          <Grid item xs={6}>
            <div>
              <RHFTextField
                fullWidth={true}
                name="dashboardName"
                label="Dashboard Name"
                required={true}
              />
            </div>
            <Box display="flex" justifyContent="space-between">
              <div>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue=""
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={<Radio />}
                      label="Private to owner (me)"
                    />
                    <FormControlLabel
                      value="male"
                      control={<Radio />}
                      label="Everyone"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Only specific user and teams"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div>
                <RHFSwitch
                  fullWidth={true}
                  name="default"
                  label="Set as default"
                />
              </div>
            </Box>
            <Typography variant="h6" fontWeight={600} color="slateblue.main">
              Use the checkboxes to remove/add any report you want
            </Typography>
            <Box sx={{ overflowY: 'scroll', height: '384px', pl: '20px' }}>
              <RHFMultiCheckbox
                name="dashboardItems"
                options={dashboardCheckboxData}
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                borderRadius: '8px',
                border: '1px solid',
                borderColor: 'grey.700',
                p: '20px',
              }}
            >
              <Typography variant="subtitle1" color="slateBlue.main">
                Details view
              </Typography>
              <Box sx={{ pointerEvents: 'none', userSelect: 'none' }}>
                <Image
                  src={ExampleDashboardImage}
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                  alt={'ExampleDashboardImage'}
                />
              </Box>
              <div></div>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Button
            sx={{
              color: theme.palette?.grey[500],
              border: '1px solid',
              borderColor: 'grey.700',
              padding: '0px 22px',
              height: '44px',
              fontWeight: '500',
              '&:hover': { bgcolor: theme.palette.grey[400] },
            }}
            onClick={() => {}}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              padding: '0px 22px',
              height: '44px',
              fontWeight: '500',
            }}
            onClick={() => {}}
            type="submit"
          >
            Create
          </Button>
        </Box>
      </FormProvider>
    </>
  );
};
