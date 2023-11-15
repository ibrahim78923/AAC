import { useForm } from 'react-hook-form';
import { defaultValues, validationSchema } from './NewIncident.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { usePostNewIncidentMutation } from '@/services/airServices/assets/inventory/single-inventory-details/associations/new-incident';

export const useNewIncident = ({ onClose }: any) => {
  const methods: any = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
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
      associateAssets, // attachFile,
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
    } catch (error) {
      enqueueSnackbar('There is something wrong', {
        variant: 'error',
      });
    }
    enqueueSnackbar('Incident Associated Successfully!', {
      variant: 'success',
    });
    onClose(false);
    // console.log(modifiedFormData);
  };
  return { handleSubmit, onSubmit, methods };
};
