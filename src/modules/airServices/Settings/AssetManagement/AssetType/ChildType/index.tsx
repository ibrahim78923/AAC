import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { AssetFieldFormDataArray } from '../AssetType.data';
import useChildType from './useChildType';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export default function ChildType({ childDetails, setChildDetails }: any) {
  const {
    onClose,
    methods,
    handleSubmit,
    onSubmit,
    patchChildAssetTypeStatus,
  } = useChildType({
    childDetails,
    setChildDetails,
  });

  return (
    <CustomCommonDialog
      isPortalOpen={childDetails?.open}
      closePortal={onClose}
      handleSubmitButton={handleSubmit(onSubmit)}
      showSubmitLoader={patchChildAssetTypeStatus?.isLoading}
      disabledCancelButton={patchChildAssetTypeStatus?.isLoading}
      dialogTitle={
        childDetails?.childData ? 'Edit Asset Type' : 'Add Asset Type'
      }
      submitButtonText={childDetails?.parentData ? 'Update' : 'Save'}
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
