import React from 'react';

import { Box, Checkbox, useTheme } from '@mui/material';

import { columnsData } from '../../../../mock/modules/airSales/Deals/DealCustomize';
import DealDrawer from '../DealDrawer';

import { CutomizeIcon, DragIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import { styles } from './DealCustomize.style';

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
  const theme = useTheme();
  return (
    <Box my={'16px'} sx={styles.BoxStyle(theme)}>
      <Box sx={styles.ChildBoxStyle}>
        <DragIcon />
        {title}
      </Box>
      <Checkbox {...checkboxProps} />
    </Box>
  );
};
