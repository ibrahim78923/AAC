// ... (previous imports)
import CommonDrawer from '@/components/CommonDrawer';
import React from 'react';

import { Alert } from '@mui/material';
import { useReceivedItems } from './useReceivedItems';
import {
  itemDetail,
  itemDetailColumns,
  itemDetailFormFieldsFunction,
} from './ReceivedItems.data';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

export const ReceivedItems = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;

  const { errorOccurred, submitHandler } = useReceivedItems(props); // Extract 'control' from useReceivedItems

  const method = useForm({
    defaultValues: {
      test: itemDetail,
    },
  });
  const { handleSubmit } = method;
  const { fields } = useFieldArray({
    control: method?.control,
    name: 'test',
  });

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
        <FormProvider {...method}>
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
                      method?.control,
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
