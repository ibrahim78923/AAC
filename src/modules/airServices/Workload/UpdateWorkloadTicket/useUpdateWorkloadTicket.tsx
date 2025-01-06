import { useEffect } from 'react';
import { usePutAirServicesWorkloadTicketsMutation } from '@/services/airServices/workload';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';
import {
  getWorkloadTicketDataArray,
  getWorkloadTicketDefaultValues,
  getWorkloadTicketValidationSchema,
} from './UpdateWorkloadTicket.data';
import { isoDateString } from '@/lib/date-time';
import { useFormLib } from '@/hooks/useFormLib';

export const useUpdateWorkloadTicket = ({ onClose, dataGet }: any) => {
  const [patchTicketTrigger, patchTicketStatus] =
    usePutAirServicesWorkloadTicketsMutation();

  const viewWorkloadMethodProps = {
    validationSchema: getWorkloadTicketValidationSchema,
    defaultValues: getWorkloadTicketDefaultValues?.(dataGet?.extendedProps),
  };

  const { handleSubmit, reset, getValues, setValue, setError, watch, methods } =
    useFormLib(viewWorkloadMethodProps);

  const onSubmit = async (data: any) => {
    const { plannedEffort } = getValues();
    if (plannedEffort?.trim() !== '' && !/^\d+h\d+m$/?.test(plannedEffort)) {
      setError('plannedEffort', {
        message:
          'Invalid format for Planned Effort. Please use format like 1h10m',
      });
      return;
    }

    try {
      const formData = new FormData();

      formData?.append('id', dataGet?.extendedProps?.ticketIdParent);
      !!data?.description && formData?.append('description', data?.description);
      !!data?.agent && formData?.append('agent', data?.agent?._id);
      !!data?.status && formData?.append('status', data?.status?._id);
      !!data?.plannedEndDate &&
        formData?.append('plannedEndDate', isoDateString(data?.plannedEndDate));
      !!data?.plannedStartDate &&
        formData?.append(
          'plannedStartDate',
          isoDateString(data?.plannedStartDate),
        );
      !!data?.plannedEffort &&
        formData?.append('plannedEffort', data?.plannedEffort);
      formData?.append('moduleType', dataGet?.extendedProps?.moduleType);
      formData?.append('ticketType', dataGet?.extendedProps?.ticketType);
      formData?.append('isChildTicket', dataGet?.extendedProps?.isChildTicket);

      const putTicketParameter = {
        body: formData,
      };

      await patchTicketTrigger(putTicketParameter)?.unwrap();
      successSnackbar('Ticket Updated Successfully!');
      onClose(false);
    } catch (e: any) {
      errorSnackbar(e?.data?.message);
    }
  };

  useEffect(() => {
    reset(getWorkloadTicketDefaultValues?.(dataGet?.extendedProps));
  }, [dataGet, reset]);

  const workloadTicketDataArray = getWorkloadTicketDataArray(
    getValues,
    setValue,
    watch,
  );

  return {
    handleSubmit,
    onSubmit,
    methods,
    patchTicketStatus,
    workloadTicketDataArray,
  };
};
