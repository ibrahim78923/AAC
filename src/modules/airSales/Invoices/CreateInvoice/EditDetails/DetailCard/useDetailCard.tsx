import { useGetInvoiceQuery } from '@/services/airSales/invoices';

const useDetailCard = () => {
  const { data } = useGetInvoiceQuery({});
  return { cardData: data?.data };
};

export default useDetailCard;
