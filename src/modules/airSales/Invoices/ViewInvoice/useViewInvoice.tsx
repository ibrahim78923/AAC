import { useGetInvoiceByIdQuery } from '@/services/airSales/invoices';

const useViewInvoice = (invoiceId: any) => {
  const { data } = useGetInvoiceByIdQuery({ invoiceId });

  return {
    data,
  };
};

export default useViewInvoice;
