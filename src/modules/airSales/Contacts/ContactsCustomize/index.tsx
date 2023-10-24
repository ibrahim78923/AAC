import React from 'react';

import CommonDrawer from '@/components/CommonDrawer';

import { columnsData } from './ContactsCustomize.data';

import { v4 as uuidv4 } from 'uuid';
import ColumnsWrapper from './ColumnsWrapper';

const ContactsCustomize = ({ open, onClose }: any) => {
  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      footer
      isOk
      submitHandler={onClose}
      okText="Save"
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

export default ContactsCustomize;
