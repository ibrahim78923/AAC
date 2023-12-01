import CommonDrawer from '@/components/CommonDrawer';
import { AddResponseDrawerPropsI } from './AddResponseDrawer.interface';
import { AddResponseForm } from './AddResponseForm';
import { useAddResponseDrawer } from './useAddResponseDrawer';

export const AddResponseDrawer = ({
  open,
  setDrawerOpen,
}: AddResponseDrawerPropsI) => {
  const { methodsAddResponseForm, submitAddResponse } = useAddResponseDrawer();
  return (
    <div>
      <CommonDrawer
        isDrawerOpen={open}
        onClose={() => setDrawerOpen(false)}
        title="Add Response"
        submitHandler={() => {
          methodsAddResponseForm?.handleSubmit(submitAddResponse)();
        }}
        isOk={true}
        footer={true}
        okText="Save"
      >
        <AddResponseForm
          submitAddResponse={submitAddResponse}
          methods={methodsAddResponseForm}
          handleSubmit={methodsAddResponseForm?.handleSubmit}
        />
      </CommonDrawer>
    </div>
  );
};
