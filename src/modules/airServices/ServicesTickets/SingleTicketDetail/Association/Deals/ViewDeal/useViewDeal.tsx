import { useGetAirServicesDealByIdQuery } from '@/services/airServices/tickets/single-ticket-details/association';
import { useTheme } from '@mui/material';
import { CardData } from './ViewDeal.data';

export default function useViewDeal({ modalId, setModalId }: any) {
  const theme: any = useTheme();

  const onClose = () => {
    setModalId({
      view: false,
      delete: false,
      id: '',
    });
  };

  const getDealByIdParameter = {
    queryParams: {
      id: modalId?.id,
    },
  };

  const { data, isLoading, isFetching, isError } =
    useGetAirServicesDealByIdQuery(getDealByIdParameter, {
      refetchOnMountOrArgChange: true,
    });

  const dealData = data?.data;
  const dealContacts = data?.data?.contacts;
  const dealCompanies = data?.data?.companies;
  const dealTickets = data?.data?.tickets;
  const dealProducts = data?.data?.products;
  const dealQuotes = data?.data?.quotes;
  const dealAttachments = data?.data?.attachments;

  const cardData = CardData(dealData);

  return {
    theme,
    onClose,
    dealData,
    isLoading,
    isFetching,
    isError,
    cardData,
    dealContacts,
    dealCompanies,
    dealTickets,
    dealProducts,
    dealQuotes,
    dealAttachments,
  };
}
