import CommonDrawer from '@/components/CommonDrawer';
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
import SkeletonTable from '@/components/Skeletons/SkeletonTable';
import ApiErrorState from '@/components/ApiErrorState';
import { pxToRem } from '@/utils/getFontValue';

export const ReceivedItems = (props: any) => {
  const { isDrawerOpen, setIsDrawerOpen } = props;

  const {
    errorOccurred,
    submitHandler,
    handleSubmit,
    fields,
    control,
    method,
    isLoading,
    patchAddToItemStatus,
    isFetching,
    isError,
  } = useReceivedItems(props);

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => {
        setIsDrawerOpen(false);
      }}
      title="Receive items"
      submitHandler={() => handleSubmit(submitHandler)()}
      footer
      isOk
      okText="Receive"
      isLoading={patchAddToItemStatus?.isLoading}
      isDisabled={patchAddToItemStatus?.isLoading}
      disabledCancelBtn={patchAddToItemStatus?.isLoading}
    >
      <>
        {!!errorOccurred && (
          <Alert severity="error" style={{ marginBottom: pxToRem(10) }}>
            The received item quantity should not exceed the pending item
            quantity
          </Alert>
        )}
        {isLoading || isFetching ? (
          <SkeletonTable />
        ) : isError ? (
          <ApiErrorState />
        ) : (
          <FormProvider methods={method}>
            <TableContainer>
              <Table sx={{ minWidth: pxToRem(100) }}>
                <TableHead>
                  <TableRow>
                    {itemDetailColumns?.map((column: string) => (
                      <TableCell key={column}>{column}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {fields?.map((item: any, index: number) => (
                    <TableRow key={item?.id}>
                      {itemDetailFormFieldsFunction?.(
                        control,
                        'receivedItem',
                        fields,
                        index,
                      )?.map((singleField: any) => (
                        <TableCell key={singleField?.id}>
                          {singleField?.data}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </FormProvider>
        )}
      </>
    </CommonDrawer>
  );
};
