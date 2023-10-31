import CreateInvoice from './CreateInvoice';
import ListView from './ListView';
import useInvoices from './useInvoices';

const Invoices = () => {
  const { isListView, setIsListView } = useInvoices();

  return isListView ? (
    <CreateInvoice />
  ) : (
    <ListView setIsListView={setIsListView} />
  );
};

export default Invoices;
