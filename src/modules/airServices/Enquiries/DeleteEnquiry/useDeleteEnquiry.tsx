import { useDeleteEnquiriesMutation } from '@/services/airServices/enquiries';
import { errorSnackbar, successSnackbar } from '@/utils/api';

export default function useDeleteEnquiry({ isModalOpen, onClose }: any) {
  const [deleteEnquiriesTrigger, deleteEnquiriesStatus] =
    useDeleteEnquiriesMutation();

  const deleteEnquiry = async () => {
    const ids = isModalOpen?.data?.map((item: any) => item?._id)?.join(',');

    const deleteEnquiriesParameter = {
      queryParams: ids,
    };

    try {
      await deleteEnquiriesTrigger(deleteEnquiriesParameter)?.unwrap();
      successSnackbar('Enquiries deleted successfully!');
      onClose?.();
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
      onClose?.();
    }
  };

  return { deleteEnquiry, deleteEnquiriesStatus };
}
