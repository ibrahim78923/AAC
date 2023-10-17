import React from 'react';

import { Typography, Box, useTheme } from '@mui/material';

import DealDrawer from '../DealDrawer';
import ImportMapColumnsDeal from './ImportMapColumns';
import UseImportDeal from './useImportDeal';

import { ImportIcon } from '@/assets/icons';
import { styles } from './importDeal.style';

const ImportDeal = () => {
  const theme = useTheme();
  const { handleSubmit, columnsSelect } = UseImportDeal();

  const okTitle = columnsSelect ? 'Import' : 'Next';
  return (
    <DealDrawer
      btnProps={{
        title: 'Import',
        startIcon: <ImportIcon />,
        sx: {
          width: '107px',
          height: '35px',
          '&:hover': { background: '#D1D5DB', borderColor: '#D1D5DB' },
          borderColor: '#D1D5DB',
        },
      }}
      drawerProps={{
        title: 'Import Deals',
        okText: okTitle,
        submitHandler: handleSubmit,
      }}
    >
      <Typography sx={styles.selectColTypography(theme)}>
        {columnsSelect
          ? 'Map Columns from your file to the right CRM fields. Your 5 unmapped columns won’t be imported'
          : 'Uploaded file must have these columns'}
      </Typography>
      <Typography variant="h6" sx={styles.Typograpghy(theme)}>
        Step {columnsSelect ? '2' : '1'} of 2
      </Typography>
      {!columnsSelect ? (
        <Box>
          <Typography
            sx={{ color: '#374151', marginTop: '16px', marginBottom: '8px' }}
          ></Typography>
          <ul
            style={{
              paddingLeft: '30px',
              color: theme?.palette?.grey[500],
            }}
          >
            <li>Name</li>
            <li>Deal Value</li>
          </ul>
          <Typography sx={{ color: '#4B5563', marginY: '8px' }}>
            Import Deals
          </Typography>
        </Box>
      ) : (
        <ImportMapColumnsDeal />
      )}
    </DealDrawer>
  );
};

export default ImportDeal;
