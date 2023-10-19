import React from 'react';

import CommonDrawer from '@/components/CommonDrawer';

import useDealDrawer from './useDealDrawer';

const DealDrawer = ({ children, drawerProps, defaultOpen }: any) => {
  const { open, handleTogle } = useDealDrawer({ defaultOpen });

  return (
    <>
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
