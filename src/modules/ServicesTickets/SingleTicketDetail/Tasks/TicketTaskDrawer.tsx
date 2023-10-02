import CommonDrawer from '@/components/CommonDrawer';

export const TicketTaskDrawer = ({ isDrawerOpen, setIsDrawerOpen }: any) => {
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      setIsDrawerOpen={setIsDrawerOpen}
      title="Add New Task"
      submitHandler={() => {}}
      isOk
      okText="Add Task"
    >
      <div></div>
    </CommonDrawer>
  );
};
