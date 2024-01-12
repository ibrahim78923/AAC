import { useGetInvoiceIdQuery } from '@/services/airSales/invoices';

const useProductTable = () => {
  const { data } = useGetInvoiceIdQuery({ id: '655fda852a3c7ed4c1387da4' });
  return { cardData: data?.data?.products };
};

export default useProductTable;
