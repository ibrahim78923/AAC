import { yupResolver } from '@hookform/resolvers/yup';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import {
  createTicketDataArrayFunction,
  createTicketDefaultValues,
  createTicketValidationSchema,
} from './CreateRelatedTickets.data';
import {
  useAddChildTicketsMutation,
  useGetDepartmentListQuery,
  useGetRequesterQuery,
  // useGetServiceCategoriesQuery,
} from '@/services/airServices/tickets/single-ticket-details/related-tickets';
import { NOTISTACK_VARIANTS, ROLES } from '@/constants/strings';
import { useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

export const useCreateRelatedTickets = (setIsDrawerOpen: any, data?: any) => {
  const id = useSearchParams()?.get('ticketId');
  const methods = useForm({
    resolver: yupResolver(createTicketValidationSchema),
    defaultValues: createTicketDefaultValues,
  });

  const [addChildTickets] = useAddChildTicketsMutation();

  const { data: requesterData } = useGetRequesterQuery({
    role: ROLES?.ORG_REQUESTER,
  });
  const { data: agentData } = useGetRequesterQuery({ role: ROLES?.ORG_AGENT });
  // const { data: serviceCategoriesData } = useGetServiceCategoriesQuery({});
  const { data: departmentData } = useGetDepartmentListQuery({});

  const requesterList =
    requesterData?.data?.users?.map((requester: any) => ({
      label: `${requester?.firstName} ${requester?.lastName}`,
      value: requester?._id,
    })) ?? [];

  const agentList =
    agentData?.data?.users?.map((agent: any) => ({
      label: `${agent?.firstName} ${agent?.lastName}`,
      value: agent?._id,
    })) ?? [];

  // const serviceCategoriesList =
  //     serviceCategoriesData?.data?.map((category: any) => ({
  //         label: category?.itemName,
  //         value: category?._id,
  //     })) ?? [];

  const departmentList =
    departmentData?.data?.departments?.map((department: any) => ({
      label: department?.name,
      value: department?._id,
    })) ?? [];

  const createTicketDataArray = createTicketDataArrayFunction(
    requesterList,
    agentList,
    // serviceCategoriesList,
    departmentList,
  );

  const submit = async (values: any) => {
    const formData = new FormData();
    if (data) {
      enqueueSnackbar(`Something went wrong!`, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    } else {
      const payload = {
        requester: values?.requester?.value,
        agent: values?.agent?.value,
        moduleType: 'TICKETS',
        ticketType: 'INC',
        status: values?.status,
        subject: values?.subject,
        pirority: values?.priority,
        impact: values?.impact,
        category: values?.category,
        // category: values?.category?.value,
        fileUrl: values?.attachFile,
        description: values?.description,
        department: values?.department?.value,
        source: values?.source,
        plannedEndDate: dayjs(values?.plannedEndDate)?.format(DATE_FORMAT?.API),
        plannedEffort: values?.plannedEffort,
        // associateAssets: [values?.associateAssets] ?? [],
      };
      Object?.entries(payload)?.map(
        ([key, value]: any) => formData?.append(key, value),
      );
    }

    try {
      await addChildTickets({ id, body: formData })?.unwrap();
      enqueueSnackbar(`child ticket successfully`, {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      methods?.reset?.();
      setIsDrawerOpen(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  return {
    methods,
    submit,
    createTicketDataArray,
  };
};
