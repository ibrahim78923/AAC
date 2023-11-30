import { Header } from './Header';
import { useSingleInventoryDetail } from './useSingleInventoryDetail';
import { enqueueSnackbar } from 'notistack';
import { AlertModals } from '@/components/AlertModals';
import { SingleInventoryDetailsTabs } from './SingleInventoryDetailTabs';

export const SingleInventoryDetail = () => {
  const {
    singleInventoryDetailActionDropdown,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  }: any = useSingleInventoryDetail();
  return (
    <>
      <Header dropdownOptions={singleInventoryDetailActionDropdown} />
      <br />
      <SingleInventoryDetailsTabs />
      {isDeleteModalOpen && (
        <AlertModals
          type="delete"
          open={isDeleteModalOpen}
          handleClose={() => setIsDeleteModalOpen(false)}
          handleSubmit={() => {
            setIsDeleteModalOpen(false);
            enqueueSnackbar('Contract deleted Successfully', {
              variant: 'success',
            });
          }}
          message="Are you sure  want to delete this Contract ?"
        />
      )}
    </>
  );
};
