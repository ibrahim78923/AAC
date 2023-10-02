import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import TicketTasks from '@/modules/ServiceTickets/Tasks';

export const TestComponentFahad = () => {
  return (
    <div>
      <TicketTasks />
    </div>
  );
};
TestComponentFahad.getLayout = function getLayout(page: any) {
  return <SuperAdminLayout>{page}</SuperAdminLayout>;
};
export default TestComponentFahad;
