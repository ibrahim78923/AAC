import CommonDrawer from '@/components/CommonDrawer';
import { useAddRequestApprovalDrawer } from './useAddRequestApproval';
import CreateTicket from '../../Tasks/CreateTicket';

const AddRequestApprovalDrawer = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const { methodsCreateNewTicketForm } = useAddRequestApprovalDrawer();

  const submitCreateNewTicket = async () => {};
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
          methodsCreateNewTicketForm.handleSubmit(submitCreateNewTicket)();
        }}
      >
        <CreateTicket
          submitCreateNewTicket={submitCreateNewTicket}
          methods={methodsCreateNewTicketForm}
          handleSubmit={methodsCreateNewTicketForm.handleSubmit}
        />
      </CommonDrawer>
    </>
  );
};

export default AddRequestApprovalDrawer;
