import CommonDrawer from '@/components/CommonDrawer';

import { columnsData } from './ContactsCustomize.data';

import ColumnsWrapper from './ColumnsWrapper';

import { v4 as uuidv4 } from 'uuid';

const CreatedCustomize = ({ open, onClose }: any) => {
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
      {columnsData?.map((column) => (
        <ColumnsWrapper
          key={uuidv4()}
          title={column?.title}
          checkboxProps={{
            onChange: () => {},
          }}
        />
      ))}
    </CommonDrawer>
  );
};

export default CreatedCustomize;
