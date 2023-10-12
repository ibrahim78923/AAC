import React, { useState } from 'react';
import DealDrawer from '../DealDrawer';
import { ImportIcon } from '@/assets/icons';
import { Typography, Box, useTheme } from '@mui/material';
import ImportMapColumnsDeal from './ImportMapColumnsDeal';

const ImportDeal = () => {
  const [columnsSelect, setColumnsSelect] = useState(false);
  const theme = useTheme();

  const handleSubmit = () => {
    if (!columnsSelect) {
      setColumnsSelect(true);
    } else {
    }
  };

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
      <Typography
        sx={{ color: '#374151', margin: '20px 16px', marginBottom: '8px' }}
      >
        {columnsSelect
          ? 'Map Columns from your file to the right CRM fields. Your 5 unmapped columns won’t be imported'
          : 'Uploaded file must have these columns'}
      </Typography>
      <Typography
        variant="h6"
        sx={{
          background: '#374151',
          borderRadius: '30px',
          padding: '2px',
          width: '26%',
          textAlign: 'center',
          color: '#FFFFFF',
          margin: '10px 0px',
        }}
      >
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
        // <TanstackTable columns={ImportDealsColumns} data={ImportDealsData} />
        <ImportMapColumnsDeal />
      )}
    </DealDrawer>
  );
};

export default ImportDeal;
