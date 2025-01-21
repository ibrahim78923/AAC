import { useUpsertInventory } from './useUpsertInventory';
import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { LoadingButton } from '@mui/lab';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';
import { INVENTORY_TITLE } from '@/constants/strings';
import { uploadFileMaxSize } from '@/utils/avatarUtils';
import { ACCEPT_FILE_EXTENSIONS } from '@/constants/file';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

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
    upsertInventoryFormFieldsOne,
    upsertInventoryFormFieldsTwo,
    form,
    getDynamicFieldsStatus,
    assetTypeWatch,
    refetch,
    isError,
    apiCallInProgress,
  } = useUpsertInventory();

  return (
    <>
      <PageTitledHeader
        moveBack={() => moveBack?.()}
        canMovedBack
        title={
          !!inventoryId
            ? INVENTORY_TITLE?.UPDATE_INVENTORY
            : INVENTORY_TITLE?.ADD_NEW_INVENTORY
        }
      />
      <ApiRequestFlow
        showLoader={isLoading || isFetching}
        hasError={isError}
        refreshApi={refetch}
      >
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
                        <item.component
                          {...item?.componentProps}
                          size="small"
                        />
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
                  <RHFDropZone
                    name="fileUrl"
                    fullWidth={true}
                    fileType={`PNG, JPG and PDF (max ${uploadFileMaxSize} MB)`}
                    accept={{
                      'image/png': ACCEPT_FILE_EXTENSIONS?.PNG,
                      'image/jpeg': ACCEPT_FILE_EXTENSIONS?.JPEG,
                      'application/pdf': ACCEPT_FILE_EXTENSIONS?.PDF,
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
                  className="small"
                  disabled={apiCallInProgress}
                >
                  Cancel
                </LoadingButton>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  className="small"
                  loading={apiCallInProgress}
                >
                  {!!inventoryId ? 'update' : 'save'}
                </LoadingButton>
              </Box>
            </Grid>
            <Grid item lg={3} sx={{ display: { xs: 'none', lg: 'block' } }}>
              <RHFDropZone
                name="fileUrl"
                fullWidth={true}
                fileType={`PNG, JPG and PDF (max ${uploadFileMaxSize} MB)`}
                accept={{
                  'image/png': ACCEPT_FILE_EXTENSIONS?.PNG,
                  'image/jpeg': ACCEPT_FILE_EXTENSIONS?.JPEG,
                  'application/pdf': ACCEPT_FILE_EXTENSIONS?.PDF,
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
      </ApiRequestFlow>
    </>
  );
};
