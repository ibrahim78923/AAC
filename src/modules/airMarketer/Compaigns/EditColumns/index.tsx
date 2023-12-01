// import { Box, Button, Typography, useTheme } from '@mui/material';
// import AddCircleIcon from '@mui/icons-material/AddCircle';

import CommonDrawer from '@/components/CommonDrawer';

import ColumnsWrapper from './ColumnsWrapper';

import { v4 as uuidv4 } from 'uuid';
import { columnsData } from './EditColumns.data';
import Search from '@/components/Search';

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

export default EditColumns;
