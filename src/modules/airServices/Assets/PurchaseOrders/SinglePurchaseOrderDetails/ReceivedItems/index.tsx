import CommonDrawer from '@/components/CommonDrawer';
import Alert from '@mui/material/Alert';
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
import { pxToRem } from '@/utils/getFontValue';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';

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
    refetch,
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
          <Alert
            severity="error"
            variant="filled"
            sx={{ marginBottom: pxToRem(10), color: 'graph.slate_gray' }}
          >
            The received item quantity should not exceed the pending item
            quantity
          </Alert>
        )}

        <ApiRequestFlow
          showSkeleton={isLoading || isFetching}
          hasError={isError}
          refreshApi={refetch}
          skeletonType={SKELETON_TYPES?.TABLE}
        >
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
        </ApiRequestFlow>
      </>
    </CommonDrawer>
  );
};
