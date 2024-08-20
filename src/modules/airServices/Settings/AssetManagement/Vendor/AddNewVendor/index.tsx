import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid } from '@mui/material';
import { useAddNewVendor } from './useAddNewVendor';
import { newVendorDataArray } from './AddNewVendor.data';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';
import { IVendorProps } from '../Vendor.interface';

const AddNewVendor = (props: IVendorProps) => {
  const { isADrawerOpen, update } = props;

  const {
    methodsNewVendor,
    handleSubmit,
    onSubmit,
    isLoading,
    handleClose,
    patchNewVendorStatus,
    postNewVendorStatus,
    getDynamicFieldsStatus,
    form,
    postAttachmentStatus,
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
      <Box>
        {isLoading ||
        getDynamicFieldsStatus?.isLoading ||
        getDynamicFieldsStatus?.isFetching ? (
          <SkeletonForm />
        ) : getDynamicFieldsStatus?.isError ? (
          <ApiErrorState />
        ) : (
          <FormProvider methods={methodsNewVendor}>
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
        )}
      </Box>
    </CommonDrawer>
  );
};

export default AddNewVendor;
