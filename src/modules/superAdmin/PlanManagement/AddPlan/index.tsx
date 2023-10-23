import React from 'react';

import { Box, Button, Typography } from '@mui/material';

import AppHorizontalStepper from '@/components/Stepper';
import { FormProvider } from '@/components/ReactHookForm';

import { UseAddPlan } from './useAddPlan';
import { useAddPlanForm } from './Forms/PlanForm/useAddPlanForm';

import { ArrowLeft } from '@/assets/icons';

const AddPlan = () => {
  const {
    addPlanFormValues,
    setAddPlanFormValues,
    AddPlanStepperData,
    hanldeGoBack,
    activeStep,
    hanldeGoPreviousBack,
    handleCompleteStep,
  } = UseAddPlan();

  const { methods, handleSubmit, onSubmit } = useAddPlanForm();
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
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
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
                  variant="contained"
                  type="submit"
                  fullWidth
                  onClick={handleCompleteStep}
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
