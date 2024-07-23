import { useUpsertInventory } from './useUpsertInventory';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import ApiErrorState from '@/components/ApiErrorState';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';

export const UpsertInventory = () => {
  const {
    methods,
    handleSubmit,
    theme,
    submitUpsertInventory,
    inventoryId,
    isLoading,
    isFetching,
    moveBack,
    postAddToInventoryStatus,
    patchAddToInventoryStatus,
    upsertInventoryFormFieldsOne,
    upsertInventoryFormFieldsTwo,
    form,
    getDynamicFieldsStatus,
    postAttachmentStatus,
    assetTypeWatch,
  } = useUpsertInventory();

  if (isLoading || isFetching) return <SkeletonForm />;

  if (getDynamicFieldsStatus?.isError) return <ApiErrorState />;

  return (
    <>
      <PageTitledHeader
        moveBack={() => moveBack?.()}
        canMovedBack
        title={!!inventoryId ? ' Update Inventory' : ' Add New Inventory'}
      />
      <FormProvider
        methods={methods}
        onSubmit={handleSubmit(submitUpsertInventory)}
      >
        <Grid container rowSpacing={1.8} columnSpacing={2}>
          <Grid item lg={9}>
            <Box
              p={2}
              borderRadius={3}
              border={`2px solid ${theme?.palette?.custom?.off_white_three}`}
            >
              <Grid item container xs={12} overflow="scroll">
                <Grid container rowSpacing={1.8} columnSpacing={3}>
                  {upsertInventoryFormFieldsOne?.map((item: any) => (
                    <Grid item xs={12} md={item?.md} key={item?.id}>
                      <item.component {...item?.componentProps} size="small" />
                    </Grid>
                  ))}
                  {getDynamicFieldsStatus?.isLoading ||
                  getDynamicFieldsStatus?.isFetching ? (
                    <Grid item xs={12} textAlign={'center'}>
                      <CircularProgress />
                    </Grid>
                  ) : (
                    <>
                      {!!form?.length && (
                        <Grid item xs={12}>
                          <Typography variant={'h4'}>
                            {assetTypeWatch?.name} Properties
                          </Typography>
                        </Grid>
                      )}
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
                    </>
                  )}
                  {upsertInventoryFormFieldsTwo?.map((item: any) => (
                    <Grid item xs={12} md={item?.md} key={item?.id}>
                      <item.component {...item?.componentProps} size="small">
                        {item?.heading ? item?.heading : null}
                      </item.component>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Box sx={{ display: { lg: 'none', xs: 'block' } }}>
                <RHFDropZone name="fileUrl" fullWidth={true} />
                <br />
                {!!inventoryId && (
                  <>
                    <Typography
                      variant="body1"
                      fontWeight={500}
                      color="slateBlue.main"
                      mb={2}
                    >
                      {' '}
                      Attachments{' '}
                    </Typography>
                    <Box maxHeight={'20vh'}>
                      <Attachments
                        recordId={inventoryId}
                        permissionKey={[
                          AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.ADD_ASSETS,
                        ]}
                      />
                    </Box>
                  </>
                )}
              </Box>
            </Box>
            <Box
              display={'flex'}
              alignItems={'center'}
              justifyContent={'flex-end'}
              gap={2}
              mt={2}
            >
              <LoadingButton
                variant="outlined"
                color="secondary"
                onClick={() => moveBack?.()}
                disabled={
                  postAddToInventoryStatus?.isLoading ||
                  patchAddToInventoryStatus?.isLoading ||
                  postAttachmentStatus?.isLoading
                }
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={
                  postAddToInventoryStatus?.isLoading ||
                  patchAddToInventoryStatus?.isLoading ||
                  postAttachmentStatus?.isLoading
                }
              >
                {!!inventoryId ? 'update' : 'save'}
              </LoadingButton>
            </Box>
          </Grid>
          <Grid item lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <RHFDropZone name="fileUrl" fullWidth={true} />
            <br />
            {!!inventoryId && (
              <>
                <Typography
                  variant="body1"
                  fontWeight={500}
                  color="slateBlue.main"
                  mb={2}
                >
                  {' '}
                  Attachments{' '}
                </Typography>
                <Box maxHeight={'20vh'}>
                  <Attachments
                    recordId={inventoryId}
                    permissionKey={[
                      AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.ADD_ASSETS,
                    ]}
                    colSpan={{ sm: 12, lg: 12 }}
                  />
                </Box>
              </>
            )}
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
};
