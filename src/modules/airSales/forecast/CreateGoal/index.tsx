import React from 'react';
import { Box, Button, Stack } from '@mui/material';
import { useCreateGoal } from './useCreateGoal';
import { ArrowLeft } from '@/assets/icons';
import AppHorizontalStepper from '@/components/Stepper';

const CreateGoal = () => {
  const {
    hanldeGoBack,
    createGoalsSteps,
    activeStep,
    handleNextStep,
    handleStepBack,
  } = useCreateGoal();

  return (
    <>
      <Box
        onClick={hanldeGoBack}
        sx={{ cursor: 'pointer', width: 'max-content' }}
      >
        <ArrowLeft />
      </Box>
      <AppHorizontalStepper
        activeStep={activeStep}
        stepperPadding="4rem 0 0"
        stepperMargin="2rem 0 0"
        stepsArray={createGoalsSteps}
        stepperButtons={
          activeStep > 0 && (
            <Stack
              direction={{ sm: 'row' }}
              justifyContent="space-between"
              gap={2}
              mt={2}
              sx={{
                display: { sm: 'flex' },
                position: { sm: 'relative', md: 'absolute' },
                bottom: '25px',
                width: { xs: '90%', sm: '90%', md: '96%' },

              }}
            >
              <Button
                onClick={handleStepBack}
                variant="outlined"
                color="inherit"
              >
                Back
              </Button>
              <Stack direction={{ sm: 'row' }}>

                <Button
                  onClick={hanldeGoBack}
                  variant="outlined"
                  color="inherit"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNextStep}
                  sx={{
                    marginLeft: { xs: '3px !important', sm: '12px !important' },
                    marginTop: { xs: '20px', sm: '0' },
                  }}
                >
                  {activeStep === 4 ? 'finsih' : 'Next'}

                </Button>
              </Stack>
            </Stack>
          )
        }
      />
    </>
  );
};

export default CreateGoal;
