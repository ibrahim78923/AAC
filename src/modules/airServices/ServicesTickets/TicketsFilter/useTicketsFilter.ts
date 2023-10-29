import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import {
  ticketsFilterDefaultFormValuesFunction,
  ticketsFilterFormFieldsDataFunction,
  ticketsFilterFormSchema,
} from './TicketsFilter.data';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

export const useTicketFilter = (props: any) => {
  const { setIsDrawerOpen } = props;
  const router = useRouter();
  const theme: any = useTheme();
  const ticketsFilterFormFieldsData = ticketsFilterFormFieldsDataFunction(
    router?.query?.action === 'view',
  );

  const methods: any = useForm({
    resolver: yupResolver(ticketsFilterFormSchema),
    defaultValues: ticketsFilterDefaultFormValuesFunction(),
  });
  const { handleSubmit, reset } = methods;

  //   useEffect(() => {
  //     reset(() => ticketsFilterDefaultFormValuesFunction(data?.data));
  //   }, [data, reset]);

  const submitTicketFilterForm = async () => {};

  const resetTicketFilterForm = async () => {
    reset();
    setIsDrawerOpen(false);
  };
  return {
    ticketsFilterFormFieldsData,
    router,
    theme,
    methods,
    handleSubmit,
    submitTicketFilterForm,
    resetTicketFilterForm,
  };
};
