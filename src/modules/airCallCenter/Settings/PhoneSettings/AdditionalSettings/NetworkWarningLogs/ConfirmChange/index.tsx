import { AlertModals } from '@/components/AlertModals';
import { ALERT_MODALS_TYPE } from '@/constants/strings';
import { useConfirmChange } from './useConfirmChange';
export const ConfirmChange = (props: any) => {
  const { openConfirmModal, closeConfirmChangeModal, confirmChange } =
    useConfirmChange(props);
  return (
    <>
      <AlertModals
        message={'Are you sure you want to disable it?'}
        type={ALERT_MODALS_TYPE?.INFO}
        open={openConfirmModal}
        loading={false}
        handleClose={closeConfirmChangeModal}
        handleSubmitBtn={confirmChange}
        submitBtnText={'Disable'}
      />
    </>
  );
};
