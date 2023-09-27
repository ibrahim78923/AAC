import React, { useState } from 'react';
import InvoicvesListView from './ListView/ListView';
import CreateInvoice from './CreateInvoice/CreateInvoice';

const SalesInvoices = () => {
  const [isListViewPage, setIsListViewPgae] = useState(false);
  return (
    <>
      {!isListViewPage ? (
        <InvoicvesListView setIsListViewPgae={setIsListViewPgae} />
      ) : (
        <CreateInvoice setIsListViewPgae={setIsListViewPgae} />
      )}
    </>
  );
};

export default SalesInvoices;
