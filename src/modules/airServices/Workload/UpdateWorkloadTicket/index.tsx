import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpdateWorkloadTicket } from './useUpdateWorkloadTicket';
import { FormGrid } from '@/components/Grids/FormGrid';

export const UpdateWorkloadTicket = ({ openDrawer, onClose, data }: any) => {
  const {
    handleSubmit,
    onSubmit,
    methods,
    patchTicketStatus,
    workloadTicketDataArray,
  } = useUpdateWorkloadTicket({
    onClose,
    dataGet: data,
  });

  return (
    <CommonDrawer
      isDrawerOpen={openDrawer}
      onClose={() => onClose(false)}
      title={data?.extendedProps?.ticketIdNumber}
      okText={'Update'}
      isOk
      cancelText={'Cancel'}
      footer
      submitHandler={handleSubmit(onSubmit)}
      disabledCancelBtn={patchTicketStatus?.isLoading}
      isDisabled={patchTicketStatus?.isLoading}
      isLoading={patchTicketStatus?.isLoading}
    >
      <FormProvider methods={methods}>
        <FormGrid formFieldsList={workloadTicketDataArray} />
      </FormProvider>
    </CommonDrawer>
  );
};
