import React from 'react';

import { Box, Typography } from '@mui/material';

import AppHorizontalStepper from '../../../../components/Stepper';

import { UseAddPlan } from './useAppPlan';

import { ArrowLeft } from '@/assets/icons';

const AddPlan = () => {
  const {
    addPlanFormValues,
    setAddPlanFormValues,
    AddPlanStepperData,
    hanldeGoBack,
  } = UseAddPlan();
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
      <AppHorizontalStepper
        stepsArray={AddPlanStepperData}
        addPlanFormValues={addPlanFormValues}
        setAddPlanFormValues={setAddPlanFormValues}
      />
    </div>
  );
};

export default AddPlan;
