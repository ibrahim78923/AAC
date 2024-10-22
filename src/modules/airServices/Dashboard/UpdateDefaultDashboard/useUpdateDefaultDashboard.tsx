import { errorSnackbar } from '@/lib/snackbar';
import { useChangeServicesDashboardSingleDashboardDefaultStatusMutation } from '@/services/airServices/dashboard';

export const useUpdateDefaultDashboard = (props: any) => {
  const { currentId } = props;

  const [
    changeServicesDashboardSingleDashboardDefaultStatusTrigger,
    changeServicesDashboardSingleDashboardDefaultStatusStatus,
  ] = useChangeServicesDashboardSingleDashboardDefaultStatusMutation?.();

  const changeDefaultDashboard = async (e: any) => {
    const apiDataParameter = {
      body: {
        id: currentId,
        isDefault: e?.target?.checked,
      },
    };

    try {
      await changeServicesDashboardSingleDashboardDefaultStatusTrigger(
        apiDataParameter,
      )?.unwrap();
    } catch (error: any) {
      errorSnackbar?.(error?.data?.message);
    }
  };

  return {
    changeDefaultDashboard,
    changeServicesDashboardSingleDashboardDefaultStatusStatus,
  };
};
