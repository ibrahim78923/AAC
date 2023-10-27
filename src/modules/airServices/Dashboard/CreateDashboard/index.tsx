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
  Grid,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { dashboardCheckboxData } from './CreateDashboard.data';
import GitHubLabel from './SearchableMultiSelect';

export const CreateDashboard = () => {
  const theme = useTheme();
  const methodsCreateDashboardFilterForm = useForm({
    defaultValues: {
      dashboardName: '',
      default: false,
      dashboardItems: [],
    },
  });
  const submitCreateDashboardFilterForm = async () => {};
  const resetCreateDashboardFilterForm = async () => {
    methodsCreateDashboardFilterForm?.reset();
  };
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
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    color="slateblue.main"
                  >
                    Who can access this dashboard?
                  </Typography>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="access"
                  >
                    <FormControlLabel
                      value="Private to owner (me)"
                      control={<Radio />}
                      label="Private to owner (me)"
                    />
                    <FormControlLabel
                      value="Everyone"
                      control={<Radio />}
                      label="Everyone"
                    />
                    <Box sx={{ ml: '15px' }}>
                      <Box>
                        <FormControlLabel
                          value="View and edit"
                          control={<Radio />}
                          label="View and edit"
                        />
                      </Box>
                      <Box>
                        <FormControlLabel
                          value="View only"
                          control={<Radio />}
                          label="View only"
                        />
                      </Box>
                    </Box>
                    <FormControlLabel
                      value="Only specific user and teams"
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
            <GitHubLabel />
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
            onClick={resetCreateDashboardFilterForm}
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
            onClick={submitCreateDashboardFilterForm}
            type="submit"
          >
            Create
          </Button>
        </Box>
      </FormProvider>
    </>
  );
};
