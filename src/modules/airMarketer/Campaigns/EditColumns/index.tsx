import CommonDrawer from '@/components/CommonDrawer';
import Search from '@/components/Search';

import ColumnsWrapper from './ColumnsWrapper';
import { columnsData } from './EditColumns.data';

import { v4 as uuidv4 } from 'uuid';

const EditColumns = ({ open, onClose }: any) => {
  return (
    <CommonDrawer
      isDrawerOpen={open}
      onClose={onClose}
      footer
      isOk
      submitHandler={onClose}
      okText="Apply"
      title="Edit Columns"
    >
      <Search label="Search Here" size="small" fullWidth />
      {columnsData?.map((column) => (
        <ColumnsWrapper key={uuidv4()} title={column?.title} />
      ))}
    </CommonDrawer>
  );
};

export default EditColumns;
