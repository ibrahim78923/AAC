import CommonDrawer from '@/components/CommonDrawer';
import React from 'react';

import { Alert } from '@mui/material';
import { useReceivedItems } from './useReceivedItems';
import {
  itemDetailColumns,
  itemDetailFormFieldsFunction,
} from './ReceivedItems.data';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
export const ReceivedItems = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;

  const {
    errorOccurred,
    submitHandler,
    handleSubmit,
    fields,
    control,
    method,
  } = useReceivedItems(props);

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => {
        setIsDrawerOpen(false);
      }}
      title="Receive items"
      submitHandler={() => handleSubmit(submitHandler)()}
      footer={true}
      isOk={true}
      okText="Receive"
    >
      <>
        {errorOccurred && (
          <Alert severity="error" style={{ marginBottom: '10px' }}>
            The received item quantity should not exceed the pending item
            quantity
          </Alert>
        )}
        <FormProvider methods={method}>
          {' '}
          <TableContainer>
            <Table sx={{ minWidth: '100px' }}>
              <TableHead>
                <TableRow>
                  {itemDetailColumns?.map((column: any) => (
                    <TableCell key={column}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {fields?.map((item: any, index: any) => (
                  <TableRow key={item?.id}>
                    {itemDetailFormFieldsFunction?.(
                      control,
                      'test',
                      index,
                    )?.map((singleField: any) => (
                      <TableCell key={item.id}>{singleField?.data}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </FormProvider>
      </>
    </CommonDrawer>
  );
};
