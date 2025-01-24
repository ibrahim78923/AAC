import { FormProvider } from '@/components/ReactHookForm';
import { rejectedModalField } from './RejectedModal.data';
import { useRejectedModal } from './useRejectedModal';
import { IAgentsProps } from '../../Agents.interface';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { FormGrid } from '@/components/Grids/FormGrid';

const RejectedModal = (props: IAgentsProps) => {
  const { openRejectedModal } = props;
  const {
    handleCloseModal,
    onSubmit,
    methods,
    patchRejectRequestStatus,
    handleSubmit,
  } = useRejectedModal(props);

  return (
    <>
      <CustomCommonDialog
        isPortalOpen={openRejectedModal}
        closePortal={handleCloseModal}
        dialogTitle="Rejected"
        submitButtonText="Submit"
        showSubmitLoader={patchRejectRequestStatus?.isLoading}
        disabledCancelButton={patchRejectRequestStatus?.isLoading}
        handleSubmitButton={handleSubmit?.(onSubmit)}
      >
        <FormProvider methods={methods}>
          <FormGrid formFieldsList={rejectedModalField} />
        </FormProvider>
      </CustomCommonDialog>
    </>
  );
};

export default RejectedModal;
