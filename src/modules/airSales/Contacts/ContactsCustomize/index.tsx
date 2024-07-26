import { Box, Button, Typography, useTheme } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import CommonDrawer from '@/components/CommonDrawer';

import ColumnsWrapper from './ColumnsWrapper';

import { columnsData } from './ContactsCustomize.data';

import { v4 as uuidv4 } from 'uuid';

const ContactsCustomize = ({ open, onClose }: any) => {
  const theme = useTheme();
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          sx={{
            color: theme?.palette?.slateBlue['main'],
            fontSize: '14px',
            fontWeight: 600,
          }}
        >
          Selected(20)
        </Typography>
        <Button
          sx={{ height: '30px' }}
          variant="outlined"
          startIcon={<AddCircleIcon />}
        >
          Add Columns
        </Button>
      </Box>
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

export default ContactsCustomize;
