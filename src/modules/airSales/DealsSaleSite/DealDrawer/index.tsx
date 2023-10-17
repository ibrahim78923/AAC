import React from 'react';

import { Button } from '@mui/material';

import CommonDrawer from '@/components/CommonDrawer';
import UseDealDrawer from './useDealDrawer';

const DealDrawer = ({
  btnProps,
  children,
  drawerProps,
  defaultOpen,
  hideBtn,
}: any) => {
  const { open, handleTogle } = UseDealDrawer({ defaultOpen });

  return (
    <>
      {!hideBtn && (
        <Button
          onClick={handleTogle}
          variant={btnProps?.variant ?? 'outlined'}
          {...btnProps}
        >
          {btnProps.title}
        </Button>
      )}

      <CommonDrawer
        isDrawerOpen={open}
        onClose={handleTogle}
        isOk={drawerProps?.isOk ?? true}
        cancelText={drawerProps?.cancelText ?? 'Cancel'}
        footer={drawerProps?.footer ?? true}
        {...drawerProps}
      >
        {children}
      </CommonDrawer>
    </>
  );
};

export default DealDrawer;
