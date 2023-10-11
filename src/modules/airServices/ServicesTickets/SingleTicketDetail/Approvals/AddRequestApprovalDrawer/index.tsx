import CommonDrawer from '@/components/CommonDrawer';
import { useAddRequestApprovalDrawer } from './useAddRequestApproval';
import DrawerForm from './DrawerForm';
import { useSnackbar } from 'notistack';

const AddRequestApprovalDrawer = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const { methodsDrawerFormForm } = useAddRequestApprovalDrawer();
  const { enqueueSnackbar } = useSnackbar();

  const submitDrawerForm = async () => {
    enqueueSnackbar('Request for approval send successfully', {
      variant: 'success',
      autoHideDuration: 6000,
    });
    setIsDrawerOpen(false);
    methodsDrawerFormForm.reset();
  };
  return (
    <>
      <CommonDrawer
        footer={true}
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Send for Approval"
        okText="Send"
        isOk={true}
        submitHandler={() => {
          methodsDrawerFormForm.handleSubmit(submitDrawerForm)();
        }}
      >
        <DrawerForm
          submitDrawerForm={submitDrawerForm}
          methods={methodsDrawerFormForm}
          handleSubmit={methodsDrawerFormForm.handleSubmit}
        />
      </CommonDrawer>
    </>
  );
};

export default AddRequestApprovalDrawer;
