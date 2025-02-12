import { Box, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import useNewPurchaseOrder from './useNewPurchaseOrder';
import ItemsDetails from './ItemsDetails';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { ActionsLoadingButton } from '@/components/Buttons/ActionsLoadingButton';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { FormGrid } from '@/components/Grids/FormGrid';
import { DynamicForm } from '@/components/DynamicForm';

const NewPurchaseOrder = () => {
  const {
    methods,
    submit,
    handlePageBack,
    newPurchaseFields,
    purchaseOrderId,
    vendorValue,
    router,
    loadingStatus,
    watch,
    form,
    handleSubmit,
    showLoader,
    hasError,
    refresh,
  } = useNewPurchaseOrder();

  return (
    <>
      <PageTitledHeader
        title={`${
          purchaseOrderId
            ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
            : GENERIC_UPSERT_FORM_CONSTANT?.NEW
        }   Purchase Order`}
        canMovedBack
        moveBack={handlePageBack}
      />
      <ApiRequestFlow
        showSkeleton={showLoader}
        hasError={hasError}
        refreshApi={refresh}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(submit)}>
          <ContainerGrid>
            <CustomGrid lg={9}>
              <FormGrid formFieldsList={newPurchaseFields}>
                <DynamicForm dynamicFormFieldsList={form} />
                {vendorValue && (
                  <CustomGrid>
                    <Box>
                      <Typography variant="h5" color="slateBlue.main">
                        Items Details
                      </Typography>
                      <ItemsDetails
                        control={methods?.control}
                        vendorId={vendorValue}
                        watch={watch}
                        name="purchaseDetails"
                      />
                    </Box>
                  </CustomGrid>
                )}
              </FormGrid>
            </CustomGrid>
          </ContainerGrid>
          <ActionsLoadingButton
            submitButtonText={
              !!router?.query?.purchaseOrderId
                ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
                : GENERIC_UPSERT_FORM_CONSTANT?.SAVE
            }
            showSubmitLoader={loadingStatus}
            handleCancelButton={handlePageBack}
          />
        </FormProvider>
      </ApiRequestFlow>
    </>
  );
};

export default NewPurchaseOrder;
