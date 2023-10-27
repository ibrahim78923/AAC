import CommonDrawer from '@/components/CommonDrawer';
import DrawerForm from './DrawerForm';
import { useContractsDrawerForm } from './useContractsDrawerForm';

const ContractsDrawerForm = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const { methodsDrawerFormForm } = useContractsDrawerForm();

  return (
    <>
      <CommonDrawer
        // footer={false}
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Filters"
        okText="Send"
        isOk
        // isOk={true}
      >
        <DrawerForm
          methods={methodsDrawerFormForm}
          handleSubmit={methodsDrawerFormForm.handleSubmit}
        />
      </CommonDrawer>
    </>
  );
};

export default ContractsDrawerForm;
