import CommonDrawer from '@/components/CommonDrawer';
import TextEditor from '@/components/TextEditor';

const AddRequestApproval: React.FC = () => {
  return (
    <>
      <CommonDrawer
        isDrawerOpen={true}
        setIsDrawerOpen={() => {}}
        title="Send for Approval"
        okText="Send"
        isOk={true}
        submitHandler={() => {}}
      >
        <br />
        <TextEditor value="" onChange={() => {}} />
      </CommonDrawer>
    </>
  );
};

export default AddRequestApproval;
