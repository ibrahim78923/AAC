import { useUpsertInventory } from './useUpsertInventory';
import { Box, Grid, Typography } from '@mui/material';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';

import { useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import { ViewDetailBackArrowIcon } from '@/assets/icons';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';

export const UpsertInventory = () => {
  const {
    methods,
    handleSubmit,
    theme,
    setFormType,
    query,
    upsertInventoryFormFields,
    submitUpsertInventory,
    inventoryId,
    setHasAttachment,
    isLoading,
    isFetching,
    moveBack,
  } = useUpsertInventory();

  useEffect(() => {
    setFormType(query?.type);
  }, [query?.update]);
  if (isLoading || isFetching) return <SkeletonForm />;
  return (
    <>
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
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                }}
              >
                <Box onClick={moveBack} sx={{ cursor: 'pointer' }} mt={0.5}>
                  <ViewDetailBackArrowIcon />
                </Box>
                {!!inventoryId ? (
                  <Typography variant="h3" color="slateblue.main">
                    Update
                  </Typography>
                ) : (
                  <Typography variant="h3" color="slateblue.main">
                    Add New
                  </Typography>
                )}
              </Box>
              <br />
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
                <RHFDropZone name="fileUrl" />
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
                          AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.ADD_NEW_EXPENSE,
                        ]}
                        hasAttachments={setHasAttachment}
                        size={1024 * 1024 * 2.44}
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
                onClick={() => methods?.reset()}
              >
                Cancel
              </LoadingButton>
              <LoadingButton
                variant="contained"
                type="submit"
                sx={{ paddingX: '25px' }}
              >
                {!!inventoryId ? 'update' : 'save'}
              </LoadingButton>
            </Box>
          </Grid>
          <Grid item lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <RHFDropZone name="fileUrl" />
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
                      AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS?.ADD_NEW_EXPENSE,
                    ]}
                    hasAttachments={setHasAttachment}
                    size={1024 * 1024 * 2.44}
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
