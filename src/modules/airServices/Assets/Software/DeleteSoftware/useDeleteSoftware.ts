import { AIR_SERVICES } from '@/constants/routes';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import { useDeleteSoftwareMutation } from '@/services/airServices/assets/software';
import { useRouter } from 'next/router';

export const useDeleteSoftware = (props: {
  deleteModalOpen: boolean;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setDeleteModalOpen } = props;
  const router = useRouter();
  const { softwareId } = router?.query;
  const [deleteSoftwareTrigger, deleteSoftwareStatus] =
    useDeleteSoftwareMutation();

  const deleteSoftware = async () => {
    try {
      await deleteSoftwareTrigger(softwareId)?.unwrap();
      successSnackbar('Software deleted successfully');
      setDeleteModalOpen(false);
      router?.push(AIR_SERVICES?.ASSETS_SOFTWARE);
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
    }
  };
  return {
    deleteSoftwareStatus,
    deleteSoftware,
  };
};
