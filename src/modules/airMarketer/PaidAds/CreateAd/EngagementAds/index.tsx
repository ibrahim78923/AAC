import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import useCreateAd from '../useCreateAd';
import AppHorizontalStepper from '@/components/Stepper';
import useEngagementAd from './useEngagementAd';
import { styles } from './EngagementAd.style';

const EngagementAds = () => {
  const { theme } = useCreateAd();
  const {
    activeStep,
    engagamentAdStepperData,
    handleCompleteStep,
    hanldeGoPreviousBack,
  } = useEngagementAd();

  return (
    <Box sx={styles?.engagementStyle}>
      <Typography variant="h5" color={theme?.palette?.blue?.dull_blue}>
        Engagement Ad
      </Typography>
      <Box className="stepper">
        <AppHorizontalStepper
          activeStep={activeStep}
          stepsArray={engagamentAdStepperData}
          stepperButtons={
            <>
              <Divider
                sx={{ border: `1px solid ${theme?.palette?.grey[700]}`, my: 2 }}
              />
              <Stack direction="row" justifyContent="space-between">
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={hanldeGoPreviousBack}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleCompleteStep}
                >
                  Next
                </Button>
              </Stack>
            </>
          }
        />
      </Box>
    </Box>
  );
};

export default EngagementAds;
