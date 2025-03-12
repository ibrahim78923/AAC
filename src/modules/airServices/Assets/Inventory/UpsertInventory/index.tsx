import { useUpsertInventory } from './useUpsertInventory';
import { Box, Typography } from '@mui/material';
import { FormProvider, RHFDropZone } from '@/components/ReactHookForm';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_ASSETS_INVENTORY_PERMISSIONS } from '@/constants/permission-keys';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { uploadFileMaxSize } from '@/utils/avatarUtils';
import { ACCEPT_FILE_EXTENSIONS } from '@/constants/file';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { ActionsLoadingButton } from '@/components/Buttons/ActionsLoadingButton';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { FormGrid } from '@/components/Grids/FormGrid';
import { CustomLinearProgress } from '@/components/ProgressBars/CustomLinearProgress';
import { DynamicForm } from '@/components/DynamicForm';

export const UpsertInventory = () => {
  const {
    methods,
    handleSubmit,
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
        title={`${
          !!inventoryId
            ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
            : GENERIC_UPSERT_FORM_CONSTANT?.ADD
        } Contract`}
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
          <Box
            sx={{
              border: {
                xs: `2px solid `,
                md: 'none',
              },
              borderColor: {
                xs: `custom.off_white_three`,
                md: 'none',
              },
              borderRadius: { xs: 2, md: 0 },
              padding: { md: 0, xs: 2 },
            }}
          >
            <ContainerGrid>
              <CustomGrid md={8}>
                <Box
                  sx={{
                    border: {
                      md: `2px solid `,
                      xs: 'none',
                    },
                    borderColor: {
                      md: `custom.off_white_three`,
                      xs: 'none',
                    },
                    borderRadius: { md: 2, xs: 0 },
                    padding: { md: 1.5, xs: 0 },
                  }}
                >
                  <FormGrid formFieldsList={upsertInventoryFormFieldsOne}>
                    {getDynamicFieldsStatus?.isLoading ||
                    getDynamicFieldsStatus?.isFetching ? (
                      <CustomGrid>
                        <CustomLinearProgress width="100%" />
                      </CustomGrid>
                    ) : (
                      <>
                        {!!form?.length && (
                          <CustomGrid>
                            <Typography variant={'h4'}>
                              {assetTypeWatch?.name} Properties
                            </Typography>
                          </CustomGrid>
                        )}
                        <DynamicForm dynamicFormFieldsList={form} />
                      </>
                    )}
                    {upsertInventoryFormFieldsTwo?.map((item: any) => (
                      <CustomGrid md={item?.md} key={item?.id}>
                        <item.component {...item?.componentProps} size="small">
                          {item?.heading ? item?.heading : null}
                        </item.component>
                      </CustomGrid>
                    ))}
                  </FormGrid>
                </Box>
              </CustomGrid>
              <CustomGrid md={4}>
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
              </CustomGrid>
            </ContainerGrid>
          </Box>
          <br />
          <ContainerGrid>
            <CustomGrid md={8}>
              <ActionsLoadingButton
                submitButtonText={
                  !!inventoryId
                    ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
                    : GENERIC_UPSERT_FORM_CONSTANT?.SAVE
                }
                showSubmitLoader={apiCallInProgress}
                handleCancelButton={moveBack}
              />
            </CustomGrid>
          </ContainerGrid>
        </FormProvider>
      </ApiRequestFlow>
    </>
  );
};
