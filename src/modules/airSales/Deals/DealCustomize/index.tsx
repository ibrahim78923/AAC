import React from 'react';

import { columnsData } from './DealCustomize.data';
import ColumnsWrapper from './CoumnsWrapper';

import { v4 as uuidv4 } from 'uuid';
import CommonDrawer from '@/components/CommonDrawer';

const DealCustomize = ({ open, onClose }: any) => {
  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      footer
      isOk
      okText="Submit"
      title="Customize"
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
    </CommonDrawer>
  );
};

export default DealCustomize;
