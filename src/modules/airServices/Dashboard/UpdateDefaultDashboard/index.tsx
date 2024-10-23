import { AntSwitch } from '@/components/AntSwitch';
import { useUpdateDefaultDashboard } from './useUpdateDefaultDashboard';

export const UpdateDefaultDashboard = (props: any) => {
  const { currentStatus, hasPermission } = props;

  const {
    changeDefaultDashboard,
    changeServicesDashboardSingleDashboardDefaultStatusStatus,
  } = useUpdateDefaultDashboard(props);

  return (
    <AntSwitch
      checked={currentStatus}
      onChange={changeDefaultDashboard}
      isLoading={
        changeServicesDashboardSingleDashboardDefaultStatusStatus?.isLoading
      }
      disabled={
        !hasPermission ||
        changeServicesDashboardSingleDashboardDefaultStatusStatus?.isLoading
      }
    />
  );
};
