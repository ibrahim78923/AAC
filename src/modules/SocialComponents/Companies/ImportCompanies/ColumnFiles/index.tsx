import React from 'react';

import { Box, Theme, Typography, useTheme } from '@mui/material';

import TanstackTable from '@/components/Table/TanstackTable';

import { columns } from './ColumnsFiles.data';

import { importColumnsData } from '@/mock/modules/SocialComponents/Companies';

const ColumnFiles = () => {
  const theme = useTheme<Theme>();
  return (
    <>
      <Box
        sx={{
          backgroundColor: `${theme?.palette?.slateBlue?.main}`,
          width: '76px',
          padding: '7px',
          fontWeight: 400,
          fontSize: '12px',
          color: 'white',
          borderRadius: '16px',
        }}
      >
        Step 2 of 2
      </Box>
      <Typography
        variant="h6"
        sx={{ color: `${theme?.palette?.slateBlue?.main}`, marginY: '0.5rem' }}
      >
        Map Columns from your file to the right CRM fields. Your 5 unmapped
        columns won’t be imported
      </Typography>
      <TanstackTable columns={columns} data={importColumnsData} />
    </>
  );
};

export default ColumnFiles;
