import React from 'react';
import { useRouter } from 'next/router';
import { Box, Grid, Theme, Typography, useTheme } from '@mui/material';
import TanstackTable from '@/components/Table/TanstackTable';
import { columns } from './PlanList.data';
import { SUPER_ADMIN_PLAN_MANAGEMENT } from '@/routesConstants/paths';
import { PlanListDataI } from '@/modules/superAdmin/Dashboard/Dashboard-interface';

const PlanList = (data: PlanListDataI) => {
  const theme = useTheme<Theme>();
  const router = useRouter();

  return (
    <Box
      sx={{
        border: `1px solid ${theme?.palette?.grey[700]}`,
        borderRadius: '8px',
        padding: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: `${theme?.palette?.custom?.dark_blue}`,
            fontWeight: 600,
          }}
        >
          Plan list
        </Typography>
        <Typography
          onClick={() => {
            router?.push(SUPER_ADMIN_PLAN_MANAGEMENT?.PLAN_MANAGEMENT_GRID);
          }}
          variant="body2"
          sx={{
            color: `${theme?.palette?.primary?.main}`,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          View All
        </Typography>
      </Box>
      <Grid sx={{ paddingTop: '1rem' }}>
        <TanstackTable columns={columns} data={data?.data?.plansList} />
      </Grid>
    </Box>
  );
};

export default PlanList;
