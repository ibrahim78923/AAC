import TanstackTable from '@/components/Table/TanstackTable';
import React from 'react';
import { columns, data } from './ContractItemTable.data';

export const ContractItemTable = () => {
  // const submitHandler = () => {};

  return (
    <>
      <TanstackTable data={data} columns={columns()} />
    </>
  );
};
