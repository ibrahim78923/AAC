import { useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { ticketsFilterFormFieldsDataFunction } from './TicketsFilter.data';

export const useTicketFilter = () => {
  const router = useRouter();
  const theme: any = useTheme();
  const ticketsFilterFormFieldsData = ticketsFilterFormFieldsDataFunction(
    router?.query?.action === 'view',
  );

  // const methods: any = useForm({
  //   resolver: yupResolver(ticketsFilterFormSchema),
  //   defaultValues: ticketsFilterDefaultFormValuesFunction(),
  // });
  // const { handleSubmit, reset } = methods;

  //   useEffect(() => {
  //     reset(() => ticketsFilterDefaultFormValuesFunction(data?.data));
  //   }, [data, reset]);

  // const submitTicketFilterForm = async () => {};

  return {
    ticketsFilterFormFieldsData,
    router,
    theme,
  };
};
