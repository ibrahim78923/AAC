import CreateInvoice from './CreateInvoice';
import InvoicvesListView from './ListView';
import UseInvoices from './UseInvoices';

const SalesInvoices = () => {
  const { isListView, setIsListView } = UseInvoices();

  return isListView ? (
    <CreateInvoice />
  ) : (
    <InvoicvesListView setIsListView={setIsListView} />
  );
};

export default SalesInvoices;
