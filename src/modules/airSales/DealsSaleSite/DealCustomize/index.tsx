import React from 'react';

import { columnsData } from '../../../../mock/modules/airSales/Deals/DealCustomize';
import DealDrawer from '../DealDrawer';

import { CutomizeIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';
import ColumnsWrapper from './CoumnsWrapper';

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
