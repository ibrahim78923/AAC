import CommonDrawer from '@/components/CommonDrawer';
import DrawerForm from './DrawerForm';
import { useContractsForm } from './useContractsForm';

const ContractsDrawerForm = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;
  const { methodsDrawerFormForm } = useContractsForm();

  return (
    <>
      <CommonDrawer
        footer={false}
        isDrawerOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Filters"
        okText="Send"
        isOk={false}
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
