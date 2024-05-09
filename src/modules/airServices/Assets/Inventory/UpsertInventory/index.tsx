import { useUpsertInventory } from './useUpsertInventory';
import { Box, Grid, Typography } from '@mui/material';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';

import { LoadingButton } from '@mui/lab';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { PageTitledHeader } from '@/components/PageTitledHeader';

export const UpsertInventory = () => {
  const {
    methods,
    handleSubmit,
    theme,
    upsertInventoryFormFields,
    submitUpsertInventory,
    inventoryId,
    isLoading,
    isFetching,
    moveBack,
    postAddToInventoryStatus,
    patchAddToInventoryStatus,
  } = useUpsertInventory();
  if (isLoading || isFetching) return <SkeletonForm />;
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
                  {upsertInventoryFormFields?.map((form: any) => (
                    <Grid item xs={12} md={form?.md} key={form.id}>
                      <form.component {...form?.componentProps} size="small">
                        {form?.heading ? form?.heading : null}
                      </form.component>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Box sx={{ display: { lg: 'none', xs: 'block' } }}>
                <RHFDropZone
                  name="fileUrl"
                  fullWidth={true}
                  fileType={'PNG or JPG  (max 2.44 MB)'}
                  maxSize={1024 * 1024 * 2.44}
                  accept={{
                    'image/*': ['.png', '.jpg'],
                  }}
                />
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
                  patchAddToInventoryStatus?.isLoading
                }
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={
                  postAddToInventoryStatus?.isLoading ||
                  patchAddToInventoryStatus?.isLoading
                }
              >
                {!!inventoryId ? 'update' : 'save'}
              </LoadingButton>
            </Box>
          </Grid>
          <Grid item lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <RHFDropZone
              name="fileUrl"
              fullWidth={true}
              fileType={'PNG or JPG  (max 2.44 MB)'}
              maxSize={1024 * 1024 * 2.44}
              accept={{
                'image/*': ['.png', '.jpg'],
              }}
            />
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
