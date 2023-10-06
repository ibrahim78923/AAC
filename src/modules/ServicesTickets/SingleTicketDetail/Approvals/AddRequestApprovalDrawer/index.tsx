import CommonDrawer from '@/components/CommonDrawer';
import { useAddRequestApprovalDrawer } from './useAddRequestApproval';
import DrawerForm from './DrawerForm';

const AddRequestApprovalDrawer = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const { methodsDrawerFormForm } = useAddRequestApprovalDrawer();

  const submitDrawerForm = async () => {};
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
