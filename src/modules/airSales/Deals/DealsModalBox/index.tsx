import React from 'react';

import { AlertModals } from '@/components/AlertModals';

import useDealsModalBox from './useDealsModalBox';

const DealsModalBox = () => {
  const { handleOpen, setHandleOpen } = useDealsModalBox();

  return (
    <>
      <AlertModals
        message=""
        type="delete"
        open={!handleOpen}
        handleClose={() => {
          setHandleOpen(false);
        }}
        handleSubmit={() => {
          setHandleOpen(true);
        }}
      />
    </>
  );
};

export default DealsModalBox;
