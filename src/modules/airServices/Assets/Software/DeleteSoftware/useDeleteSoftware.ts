import { AIR_SERVICES } from '@/constants';
import { useDeleteSoftwareMutation } from '@/services/airServices/assets/software';
import { errorSnackbar, successSnackbar } from '@/utils/api';
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
