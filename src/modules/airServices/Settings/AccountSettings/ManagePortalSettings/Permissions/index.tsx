import { Box, Tooltip, Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import {
  FormProvider,
  RHFCheckbox,
  RHFRadioGroup,
} from '@/components/ReactHookForm';
import { permissionData } from './Permissions.data';
import { PageTitledHeader } from '@/components/PageTitledHeader';
import { usePermissions } from './usePermissions';
import { CustomGrid } from '@/components/Grids/CustomGrid';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { ContainerGrid } from '@/components/Grids/ContainerGrid';
import { ActionsLoadingButton } from '@/components/Buttons/ActionsLoadingButton';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

export const Permissions = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    showLoader,
    isError,
    refetch,
    patchCustomerPortalPermissionsStatus,
    handleCancelButton,
  } = usePermissions();

  return (
    <Box border={'1px solid'} borderColor={'grey.700'} p={2} borderRadius={4}>
      <PageTitledHeader title="Permissions" />
      <ApiRequestFlow
        showSkeleton={showLoader}
        hasError={isError}
        refreshApi={refetch}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <ContainerGrid>
            {permissionData?.map((item: any) => (
              <CustomGrid key={item?.id}>
                <Box borderBottom={1} borderColor={'grey.700'}>
                  {item?.mainHeading && (
                    <Typography {...item?.mainHeadingProp}>
                      {item?.mainHeading}
                    </Typography>
                  )}
                  <Typography {...item?.headingProp}>
                    {item?.heading}
                  </Typography>
                  <Box display={'flex'} alignItems={'center'} flexWrap={'wrap'}>
                    <RHFRadioGroup {...item?.componentProps} />
                    {item?.checkboxProps && (
                      <RHFCheckbox {...item?.checkboxProps} />
                    )}
                    {item?.tooltipProps && (
                      <Tooltip {...item?.tooltipProps}>
                        <ErrorIcon color="primary" fontSize="small" />
                      </Tooltip>
                    )}
                  </Box>
                </Box>
              </CustomGrid>
            ))}

            <CustomGrid>
              <ActionsLoadingButton
                submitButtonText={GENERIC_UPSERT_FORM_CONSTANT?.SAVE}
                showSubmitLoader={
                  patchCustomerPortalPermissionsStatus?.isLoading
                }
                handleCancelButton={handleCancelButton}
              />
            </CustomGrid>
          </ContainerGrid>
        </FormProvider>
      </ApiRequestFlow>
    </Box>
  );
};
