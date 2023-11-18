import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  upsertTicketDefaultValuesFunction,
  upsertTicketFormFieldsDynamic,
  upsertTicketValidationSchema,
} from './UpsertTicket.data';
import { enqueueSnackbar } from 'notistack';
import {
  useGetTicketsByIdQuery,
  usePostTicketsMutation,
  usePutTicketsMutation,
} from '@/services/airServices/tickets';
import { useEffect } from 'react';
import { useLazyGetOrganizationsQuery } from '@/services/dropdowns';
import usePath from '@/hooks/usePath';
import { NOTISTACK_VARIANTS } from '@/constants/strings';

export const useUpsertTicket = (props: any) => {
  const { setIsDrawerOpen, ticketId } = props;

  const router = useRouter();
  const theme: any = useTheme();
  const { makePath } = usePath();
  const [postTicketTrigger, postTicketStatus] = usePostTicketsMutation();
  const [putTicketTrigger, putTicketStatus] = usePutTicketsMutation();

  const getSingleTicketParameter = {
    pathParam: {
      ticketId,
    },
  };

  const { data, isLoading, isFetching, isError } = useGetTicketsByIdQuery(
    getSingleTicketParameter,
    {
      refetchOnMountOrArgChange: true,
      skip: !!!ticketId,
    },
  );

  const methods: any = useForm<any>({
    resolver: yupResolver(upsertTicketValidationSchema),
    defaultValues: upsertTicketDefaultValuesFunction(),
  });

  const { handleSubmit, reset } = methods;

  const submitUpsertTicket = async (data: any) => {
    const upsertTicketFormData = new FormData();
    Object?.entries?.(data || {})?.forEach(
      ([key, value]: any) => upsertTicketFormData?.append(key, value),
    );
    if (!!ticketId) {
      submitUpdateTicket(upsertTicketFormData);
      return;
    }
    const postTicketParameter = {
      body: data,
    };

    try {
      const response = await postTicketTrigger(postTicketParameter)?.unwrap();
      enqueueSnackbar(response?.message ?? 'Ticket Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset();
      setIsDrawerOpen?.(false);
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };

  const submitUpdateTicket = async (data: any) => {
    const putTicketParameter = {
      body: data,
      pathParam: {
        id: ticketId,
      },
    };
    try {
      const response = await putTicketTrigger(putTicketParameter)?.unwrap();
      enqueueSnackbar(response?.message ?? 'Ticket Added Successfully', {
        variant: NOTISTACK_VARIANTS?.SUCCESS,
      });
      reset();
      setIsDrawerOpen?.(false);
    } catch (error) {
      enqueueSnackbar('Something went wrong', {
        variant: NOTISTACK_VARIANTS?.ERROR,
      });
    }
  };
  useEffect(() => {
    reset(() => upsertTicketDefaultValuesFunction(data?.data));
  }, [data, reset]);

  const onClose = () => {
    router?.push(
      makePath({
        path: router?.pathname,
        skipQueries: ['ticketAction'],
      }),
    );
    reset?.();
    setIsDrawerOpen?.(false);
  };
  const apiQueryOrganizations = useLazyGetOrganizationsQuery();

  const upsertTicketFormFields = upsertTicketFormFieldsDynamic(
    apiQueryOrganizations,
    apiQueryOrganizations,
    apiQueryOrganizations,
    apiQueryOrganizations,
  );
  return {
    router,
    theme,
    handleSubmit,
    submitUpsertTicket,
    methods,
    onClose,
    postTicketStatus,
    isLoading,
    isFetching,
    putTicketStatus,
    ticketId,
    upsertTicketFormFields,
    isError,
  };
};
