import React from 'react';

import { Box, Button, Typography } from '@mui/material';

import AppHorizontalStepper from '@/components/Stepper';
import { FormProvider } from '@/components/ReactHookForm';

import { useAddPlan } from './useAddPlan';

import { ArrowLeft } from '@/assets/icons';

const AddPlan = () => {
  const {
    methods,
    activeStep,
    hanldeGoBack,
    handleFormSubmit,
    addPlanFormValues,
    AddPlanStepperData,
    setAddPlanFormValues,
    hanldeGoPreviousBack,
  } = useAddPlan();

  return (
    <div>
      <Box
        display={'flex'}
        alignItems={'center'}
        gap={1}
        onClick={hanldeGoBack}
        sx={{ cursor: 'pointer', width: 'max-content' }}
      >
        <ArrowLeft />
        <Typography variant="h4">Add Plan</Typography>
      </Box>
      <FormProvider methods={methods}>
        <AppHorizontalStepper
          activeStep={activeStep}
          stepsArray={AddPlanStepperData}
          stepperButtons={
            <>
              <div
                style={{
                  border: '1px solid rgba(229, 231, 235, 1)',
                  marginTop: '6.25rem',
                  marginBottom: '1.5rem',
                }}
              ></div>

              <Box
                display={'flex'}
                width={200}
                gap={'0.8rem'}
                marginLeft={'auto'}
              >
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={hanldeGoPreviousBack}
                >
                  Back
                </Button>
                <Button
                  // type="submit"
                  variant="contained"
                  fullWidth
                  onClick={handleFormSubmit}
                  disabled={activeStep === AddPlanStepperData?.length}
                >
                  {activeStep === AddPlanStepperData?.length - 1
                    ? 'Finish'
                    : 'Next'}
                </Button>
              </Box>
            </>
          }
          addPlanFormValues={addPlanFormValues}
          setAddPlanFormValues={setAddPlanFormValues}
        />
      </FormProvider>
    </div>
  );
};

export default AddPlan;
