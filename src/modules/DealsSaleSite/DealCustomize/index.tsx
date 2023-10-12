import React from 'react';
import { Box, Checkbox } from '@mui/material';
import DealDrawer from '../DealDrawer';
import { CutomizeIcon, DragIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import { columnsData } from './DealCustomize.data';

const DealCustomize = () => {
  return (
    <DealDrawer
      btnProps={{
        title: 'Customize',
        startIcon: <CutomizeIcon />,
        sx: { height: '30px' },
      }}
      drawerProps={{
        title: 'Customize Columns',
        okText: 'Save',
        submitHandler: () => {},
      }}
    >
      {columnsData.map((column) => (
        <ColumnsWrapper
          key={uuidv4()}
          title={column.title}
          checkboxProps={{
            onChange: () => {},
          }}
        />
      ))}
    </DealDrawer>
  );
};

export default DealCustomize;

const ColumnsWrapper = ({ ...rest }) => {
  const { title, checkboxProps } = rest;
  return (
    <Box
      my={'16px'}
      sx={{
        padding: '0px 16px',
        borderRadius: '8px',
        border: '1.5px solid #E5E7EB',
        color: '#9CA3AF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: 400,
        }}
      >
        <DragIcon />
        {title}
      </Box>
      <Checkbox {...checkboxProps} />
    </Box>
  );
};
