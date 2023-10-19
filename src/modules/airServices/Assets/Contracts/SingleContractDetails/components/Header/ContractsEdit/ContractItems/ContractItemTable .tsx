import TanstackTable from '@/components/Tabel/TanstackTable';
import React from 'react';
import { columns, data } from './ContractItemTable.data';
import { Button } from '@mui/material';
import { GrayPlusIcon } from '@/assets/icons';

export const ContractItemTable = () => {
  // const submitHandler = () => {};

  return (
    <>
      <TanstackTable data={data} columns={columns()} />
      <Button
        color="secondary"
        // onClick={handleAddAdditionalItems}
        sx={{ px: 2 }}
        startIcon={<GrayPlusIcon />}
      >
        Add Additional items
      </Button>
    </>
  );
};
