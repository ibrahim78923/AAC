import React, { useState } from 'react';
import { Button } from '@mui/material';
import { uuid } from 'uuidv4';
import CommonDrawer from '@/components/CommonDrawer';
import { TaskDrawerI } from './Drawer.interface';

const Drawer = ({
  title = 'title',
  btnTitle = '',
  btnIcon = '',
  btnVariant = 'outlined',
  children,
  hideBtn,
  submitHandler = () => {},
  isOk = true,
  okText = 'submit',
  footer = false,
}: TaskDrawerI) => {
  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(!open);
  return (
    <>
      {!hideBtn && (
        <Button
          variant={btnVariant}
          startIcon={btnIcon}
          sx={{
            minHeight: '36px',
            '& .startIcon': {
              marginRight: btnTitle ? '8px' : '-4px',
            },
          }}
          classes={{
            startIcon: 'startIcon',
          }}
          onClick={handleToggle}
        >
          {btnTitle}
        </Button>
      )}
      <CommonDrawer
        footer={footer}
        title={title}
        isDrawerOpen={open}
        onClose={handleToggle}
        key={title + uuid()}
        submitHandler={submitHandler}
        isOk={isOk}
        okText={okText}
      >
        {children}
      </CommonDrawer>
    </>
  );
};

export default Drawer;
