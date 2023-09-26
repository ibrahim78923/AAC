import Search from '@/components/Search';
import { useState } from 'react';

function BillingAndInvoicesTable() {
  const [searchByClientName, setSearchByClientName] = useState('');

  return (
    <Search
      searchBy={searchByClientName}
      setSearchBy={setSearchByClientName}
      label="Search Here By Client Name"
      width="260px"
    />
  );
}

export default BillingAndInvoicesTable;
