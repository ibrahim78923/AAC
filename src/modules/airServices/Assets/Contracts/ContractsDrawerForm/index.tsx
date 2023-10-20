import CommonDrawer from '@/components/CommonDrawer';
import DrawerForm from './ContractDrawerForm';
import { useContractsDrawerForm } from './useContractsDrawerForm';
import { enqueueSnackbar } from 'notistack';

const ContractsDrawerForm = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const { methodsContractDrawerForm } = useContractsDrawerForm();

  const handleContractDrawerForm = async () => {
    enqueueSnackbar('Request for approval send successfully', {
      variant: 'success',
      autoHideDuration: 6000,
    });
    setIsDrawerOpen(false);
    methodsContractDrawerForm.reset();
  };

  return (
    <>
      <CommonDrawer
        footer={true}
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Filters"
        okText="Submit"
        isOk={true}
        submitHandler={() => {
          methodsContractDrawerForm.handleSubmit(handleContractDrawerForm)();
        }}
      >
        <DrawerForm
          methods={methodsContractDrawerForm}
          handleSubmit={methodsContractDrawerForm.handleSubmit}
        />
      </CommonDrawer>
    </>
  );
};

export default ContractsDrawerForm;
