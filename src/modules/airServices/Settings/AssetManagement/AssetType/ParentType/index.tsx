import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { AssetFieldFormDataArray } from '../AssetType.data';
import useParentType from './useParentType';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export default function ParentType({ parentDetails, setParentDetails }: any) {
  const {
    onClose,
    methods,
    handleSubmit,
    onSubmit,
    postAssetTypeStatus,
    patchAssetTypeStatus,
  } = useParentType({ parentDetails, setParentDetails });

  return (
    <CustomCommonDialog
      isPortalOpen={parentDetails?.open}
      closePortal={onClose}
      handleSubmitButton={handleSubmit(onSubmit)}
      showSubmitLoader={
        postAssetTypeStatus?.isLoading || patchAssetTypeStatus?.isLoading
      }
      disabledCancelButton={
        postAssetTypeStatus?.isLoading || patchAssetTypeStatus?.isLoading
      }
      submitButtonText={parentDetails?.parentData ? 'Update' : 'Save'}
      dialogTitle={
        parentDetails?.parentData ? 'Edit Asset Type' : 'Add Asset Type'
      }
      dialogMaxWidth={'sm'}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={1}>
          {AssetFieldFormDataArray?.map((item: any) => (
            <Grid item xs={12} key={item?.id}>
              <item.component {...item?.componentProps} size={'small'} />
            </Grid>
          ))}
        </Grid>
      </FormProvider>
    </CustomCommonDialog>
  );
}
