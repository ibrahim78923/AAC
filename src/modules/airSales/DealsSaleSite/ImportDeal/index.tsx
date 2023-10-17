import React from 'react';

import { Typography, Box, useTheme } from '@mui/material';

import DealDrawer from '../DealDrawer';
import ImportMapColumnsDeal from './ImportColumns';
import UseImportDeal from './useImportDeal';

import { ImportIcon } from '@/assets/icons';

import { styles } from './importDeal.style';

const ImportDeal = () => {
  const theme: any = useTheme();
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
          '&:hover': {
            background: theme.palette.grey[0],
            borderColor: theme.palette.grey[0],
          },
          borderColor: theme.palette.grey[0],
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
        <Box sx={{ mt: '20px' }}>
          <ul
            style={{
              paddingLeft: '30px',
              color: theme?.palette?.grey[500],
            }}
          >
            <li>Name</li>
            <li>Deal Value</li>
          </ul>
          <Typography
            variant="h6"
            sx={{ color: theme.palette.grey[600], my: '10px' }}
          >
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
