import React from 'react';
import Search from '@/components/Search';
import { EditColumnIcon } from '@/assets/icons/';
import { uuid } from 'uuidv4';
import DrawerComp from '../Drawer';
import { drawerTasksData } from '../Task.data';
import { ColumnsWrapper } from './ColumnWrapper';

const EditColumn = () => {
  return (
    <DrawerComp
      btnTitle="Edit Columns"
      btnIcon={<EditColumnIcon />}
      title="Edit Columns"
      key={'editColumns'}
    >
      <Search size={'medium'} fullWidth label={'Search'} />
      {drawerTasksData.map((column) => (
        <ColumnsWrapper key={uuid()} title={column?.title} />
      ))}
    </DrawerComp>
  );
};

export default EditColumn;
