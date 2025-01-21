import CommonDrawer from '@/components/CommonDrawer';
import { upsertSoftwareFormFields } from './UpsertSoftware.data';
import { FormProvider } from '@/components/ReactHookForm';
import { Box } from '@mui/material';
import { useUpsertSoftware } from './useUpsertSoftware';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';
import { UpsertSoftwareI } from './UpsertSoftware.interface';
import { FormGrid } from '@/components/Grids/FormGrid';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

export const UpsertSoftware = (props: UpsertSoftwareI) => {
  const { isAddDrawerOpen } = props;
  const {
    onClose,
    methods,
    handleSubmit,
    softwareId,
    submitUpsertSoftware,
    form,
    showLoader,
    apiCallInProgress,
  } = useUpsertSoftware(props);

  return (
    <CommonDrawer
      isDrawerOpen={isAddDrawerOpen}
      onClose={onClose}
      isOk
      okText={
        !!softwareId
          ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
          : GENERIC_UPSERT_FORM_CONSTANT?.SAVE
      }
      footer
      title={`${
        !!softwareId
          ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
          : GENERIC_UPSERT_FORM_CONSTANT?.NEW
      } Software`}
      submitHandler={() => handleSubmit(submitUpsertSoftware)()}
      isLoading={apiCallInProgress}
      isDisabled={apiCallInProgress}
      disabledCancelBtn={apiCallInProgress}
    >
      <ApiRequestFlow showSkeleton={showLoader}>
        <FormProvider methods={methods}>
          <FormGrid formFieldsList={upsertSoftwareFormFields()} />
          {form?.map((item: any) => (
            <Box key={item?.id}>
              {componentMap[item?.component] &&
                createElement(componentMap[item?.component], {
                  ...item?.componentProps,
                  name: item?.componentProps?.label,
                  size: 'small',
                })}
            </Box>
          ))}
        </FormProvider>
      </ApiRequestFlow>
    </CommonDrawer>
  );
};
