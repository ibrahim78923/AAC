import React from 'react';

import Link from 'next/link';

import { Box, Typography } from '@mui/material';

import AppHorizontalStepper from '../../../../components/Stepper/Index';

import { UseAddPlan } from './useAppPlan';

import { ArrowLeft } from '@/assets/icons';

const AddPlan = () => {
  const { addPlanFormValues, setAddPlanFormValues, AddPlanStepperData } =
    UseAddPlan();
  return (
    <div>
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <Link href={'/super-admin/plan-management'}>
          <ArrowLeft />
        </Link>
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
