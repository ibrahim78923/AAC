import CommonDrawer from '@/components/CommonDrawer';
import Alert from '@mui/material/Alert';
import { useReceivedItems } from './useReceivedItems';
import {
  itemDetailColumns,
  itemDetailFormFieldsFunction,
} from './ReceivedItems.data';
import { FormProvider } from '@/components/ReactHookForm';
import { pxToRem } from '@/utils/getFontValue';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { SKELETON_TYPES } from '@/constants/mui-constant';
import { FieldArrayTable } from '@/components/Table/FieldArrayTable';
import { useCallback } from 'react';

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
            <FieldArrayTable
              canAddItem={false}
              columns={itemDetailColumns}
              fields={fields}
              minWidth={pxToRem(400)}
              getRowData={useCallback(
                (index: any) =>
                  itemDetailFormFieldsFunction?.(
                    control,
                    'receivedItem',
                    fields,
                    index,
                  ),
                [control, fields],
              )}
            />
          </FormProvider>
        </ApiRequestFlow>
      </>
    </CommonDrawer>
  );
};
