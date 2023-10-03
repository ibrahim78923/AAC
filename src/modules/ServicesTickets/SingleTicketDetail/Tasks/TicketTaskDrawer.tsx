import CommonDrawer from '@/components/CommonDrawer';

export const TicketTaskDrawer = ({ isDrawerOpen, setIsDrawerOpen }: any) => {
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => {
        setIsDrawerOpen(false);
      }}
      title="Add New Task"
      submitHandler={() => {}}
      footer={true}
      isOk={true}
      okText="Add Task"
    >
      <div></div>
    </CommonDrawer>
  );
};
