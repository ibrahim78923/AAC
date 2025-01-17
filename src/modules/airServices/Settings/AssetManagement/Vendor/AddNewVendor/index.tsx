import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Grid } from '@mui/material';
import { useAddNewVendor } from './useAddNewVendor';
import { newVendorDataArray } from './AddNewVendor.data';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';
import { IVendorProps } from '../Vendor.interface';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

const AddNewVendor = (props: IVendorProps) => {
  const { isADrawerOpen, update } = props;

  const {
    methods,
    handleSubmit,
    onSubmit,
    isLoading,
    handleClose,
    patchNewVendorStatus,
    postNewVendorStatus,
    getDynamicFieldsStatus,
    form,
    postAttachmentStatus,
    getDynamicFormData,
  } = useAddNewVendor(props);

  return (
    <CommonDrawer
      footer={true}
      isDrawerOpen={isADrawerOpen as boolean}
      onClose={handleClose}
      title={update ? 'Edit Vendor' : 'New Vendor'}
      okText="Save"
      isOk
      submitHandler={handleSubmit(onSubmit)}
      isLoading={
        patchNewVendorStatus?.isLoading ||
        postNewVendorStatus?.isLoading ||
        postAttachmentStatus?.isLoading
      }
      isDisabled={
        postNewVendorStatus?.isLoading ||
        patchNewVendorStatus?.isLoading ||
        postAttachmentStatus?.isLoading
      }
      disabledCancelBtn={
        postNewVendorStatus?.isLoading ||
        patchNewVendorStatus?.isLoading ||
        postAttachmentStatus?.isLoading
      }
    >
      <ApiRequestFlow
        showSkeleton={
          isLoading ||
          getDynamicFieldsStatus?.isLoading ||
          getDynamicFieldsStatus?.isFetching
        }
        hasError={getDynamicFieldsStatus?.isError}
        refreshApi={getDynamicFormData}
      >
        <FormProvider methods={methods}>
          <Grid container spacing={2}>
            {newVendorDataArray?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                <item.component {...item?.componentProps} size={'small'} />
              </Grid>
            ))}
            {form?.map((item: any) => (
              <Grid item xs={12} key={item?.id}>
                {componentMap[item?.component] &&
                  createElement(componentMap[item?.component], {
                    ...item?.componentProps,
                    name: item?.componentProps?.label,
                    size: 'small',
                  })}
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </ApiRequestFlow>
    </CommonDrawer>
  );
};

export default AddNewVendor;
