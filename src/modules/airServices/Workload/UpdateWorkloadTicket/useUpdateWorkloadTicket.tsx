import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { usePutAirServicesWorkloadTicketsMutation } from '@/services/airServices/workload';
import { errorSnackbar, successSnackbar } from '@/utils/api';
import {
  getWorkloadTicketDefaultValues,
  getWorkloadTicketValidationSchema,
} from './UpdateWorkloadTicket.data';
import { isoDateString } from '@/utils/dateTime';

export const useUpdateWorkloadTicket = ({ onClose, dataGet }: any) => {
  const [patchTicketTrigger, patchTicketStatus] =
    usePutAirServicesWorkloadTicketsMutation();

  const methods: any = useForm({
    resolver: yupResolver(getWorkloadTicketValidationSchema),
    defaultValues: getWorkloadTicketDefaultValues?.(dataGet?.extendedProps),
  });

  const { handleSubmit, reset, getValues } = methods;

  const onSubmit = async (data: any) => {
    const { plannedEffort } = getValues();
    if (plannedEffort?.trim() !== '' && !/^\d+h\d+m$/?.test(plannedEffort)) {
      errorSnackbar(
        'Invalid format for Planned Effort. Please use format like 1h10m',
      );
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

  return {
    handleSubmit,
    onSubmit,
    methods,
    patchTicketStatus,
  };
};
