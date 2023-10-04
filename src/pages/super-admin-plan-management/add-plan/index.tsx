import React from 'react';

import SuperAdminLayout from '@/layouts/SuperAdminLayout/SuperAdminLayout';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import StepperModule from '@/modules/PlanManagement/Stepper';

// ====================================================================================================

const AddPlanPage = () => {
  return (
    <div>
      <Box display={'flex'} alignItems={'center'} gap={1}>
        <Link href={'/super-admin-plan-management'}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 12H4M4 12L12 20M4 12L12 4"
              stroke="#667085"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <Typography variant="h4">Add Plan Form</Typography>
      </Box>

      <Typography variant="h6">Stepper</Typography>

      <StepperModule />

      <Typography variant="h6">Stepper 1 child form</Typography>
    </div>
  );
};

export default AddPlanPage;

AddPlanPage.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
