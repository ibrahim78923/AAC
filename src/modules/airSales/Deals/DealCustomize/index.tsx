import React from 'react';

import { columnsData } from './DealCustomize.data';
import ColumnsWrapper from './CoumnsWrapper';
import DealDrawer from '../DealDrawer';

import { CutomizeIcon } from '@/assets/icons';

import { v4 as uuidv4 } from 'uuid';

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
