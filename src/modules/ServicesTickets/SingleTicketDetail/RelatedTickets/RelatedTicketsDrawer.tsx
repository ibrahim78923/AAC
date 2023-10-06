import CommonDrawer from '@/components/CommonDrawer';

export const RelatedTicketsDrawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
}: any) => {
  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => {
        setIsDrawerOpen(false);
      }}
      title="Add Child Ticket"
      submitHandler={() => {}}
      footer={true}
      isOk={true}
      okText="Add Task"
    >
      <div></div>
    </CommonDrawer>
  );
};
