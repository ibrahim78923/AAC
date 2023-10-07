import CommonDrawer from '@/components/CommonDrawer';
import { useAddRequestApprovalDrawer } from './useAddRequestApproval';
import DrawerForm from './DrawerForm';
// import { toast } from 'react-toastify';

const AddRequestApprovalDrawer = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const { methodsDrawerFormForm } = useAddRequestApprovalDrawer();

  const submitDrawerForm = async () => {
    // toast.success('Data submitted successfully!', {
    //   position: 'top-right',
    //   autoClose: 3000,
    // });
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
