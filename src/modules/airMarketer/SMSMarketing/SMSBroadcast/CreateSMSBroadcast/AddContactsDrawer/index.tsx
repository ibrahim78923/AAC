import CommonDrawer from '@/components/CommonDrawer';
import { Typography } from '@mui/material';

const AddContactsDrawer = (props: any) => {
  const { isOpenDrawer, onClose } = props;
  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={onClose}
      title="Add Contacts"
      okText="Add"
      isOk={true}
      // submitHandler={handleSubmit(onSubmit)}
      footer
    >
      <Typography>add recipients data here</Typography>
    </CommonDrawer>
  );
};

export default AddContactsDrawer;
