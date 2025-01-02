import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { addAssetDataArray } from './AddAsset.data';
import { useAddAsset } from './useAddAsset';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const AddAsset = (props: any) => {
  const { addModalOpen, setAddModalOpen } = props;

  const { methods, handleSubmit, onSubmit, postAssociatedAssetStatus } =
    useAddAsset(setAddModalOpen);

  return (
    <CustomCommonDialog
      isPortalOpen={addModalOpen}
      closePortal={() => setAddModalOpen?.(false)}
      handleSubmitButton={handleSubmit(onSubmit)}
      disabledCancelButton={postAssociatedAssetStatus?.isLoading}
      showSubmitLoader={postAssociatedAssetStatus?.isLoading}
      dialogTitle="Add Asset"
      submitButtonText="Save"
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {addAssetDataArray?.map((item: any) => (
            <Grid item xs={12} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CustomCommonDialog>
  );
};
