import { useForm } from 'react-hook-form';
import {
  incidentFormDefaultValues,
  incidentFormValidationSchema,
} from './NewIncident.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { usePostNewIncidentMutation } from '@/services/airServices/assets/inventory/single-inventory-details/associations/new-incident';

export const useNewIncident = ({ onClose }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(incidentFormValidationSchema),
    incidentFormDefaultValues,
  });

  const { handleSubmit } = methods;
  const [newIncidentData] = usePostNewIncidentMutation();

  const onSubmit = async (newIncident: any) => {
    const {
      requester,
      subject,
      description,
      category,
      status,
      priority,
      department,
      source,
      impact,
      agent,
      plannedStartDate,
      plannedStartTime,
      plannedEndDate,
      plannedEndTime,
      plannedEffort,
      associateAssets,
    } = newIncident;
    const modifiedFormData = {
      status,
      details: {
        ...(department && { department }),
        ...(source && { source }),
        ...(requester && { requester }),
        ...(impact && { impact }),
        ...(agent && { agent }),
        ...(plannedStartDate && { plannedStartDate }),
        ...(plannedStartTime && { plannedStartTime }),
        ...(plannedEndDate && { plannedEndDate }),
        ...(plannedEndTime && { plannedEndTime }),
        ...(plannedEffort && { plannedEffort }),
        ...(associateAssets && { associateAssets }),
        ...(description && { description }),
        ...(category && { category }),
      },
      subject,
      pirority: priority,
      internalType: 'INTERNAL',
      type: 'INTERNAL',
      isChildTicket: false,
    };

    const postInventoryParameter = {
      body: modifiedFormData,
    };
    try {
      const response = await newIncidentData(postInventoryParameter)?.unwrap();
      enqueueSnackbar(response?.message ?? 'Ticket Added Successfully', {
        variant: 'success',
      });
      onClose(false);
    } catch (error) {
      enqueueSnackbar('There is something wrong', {
        variant: 'error',
      });
    }
  };
  return { handleSubmit, onSubmit, methods };
};
