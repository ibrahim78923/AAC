import CreateInvoice from './CreateInvoice';
import InvoicvesListView from './ListView';
import useInvoices from './useInvoices';

const Invoices = () => {
  const { isListView, setIsListView } = useInvoices();

  return isListView ? (
    <CreateInvoice />
  ) : (
    <InvoicvesListView setIsListView={setIsListView} />
  );
};

export default Invoices;
