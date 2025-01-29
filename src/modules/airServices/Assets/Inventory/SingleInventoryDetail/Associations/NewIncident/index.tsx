import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box } from '@mui/material';
import { useNewIncident } from './useNewIncident';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';
import { FormGrid } from '@/components/Grids/FormGrid';

export const NewIncident: React.FC<{
  openDrawer: boolean;
  setIsOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}> = (props) => {
  const { openDrawer } = props;
  const {
    handleSubmit,
    onSubmit,
    methods,
    onClose,
    form,
    newIncidentFormFieldsDynamic,
    apiCallInProgress,
    getDynamicFormData,
    showLoader,
    hasError,
  } = useNewIncident(props);

  return (
    <CommonDrawer
      isDrawerOpen={openDrawer}
      onClose={onClose}
      title={'Create and Link a new Incident to this asset'}
      okText={'Create'}
      isOk
      footer
      isLoading={apiCallInProgress}
      isDisabled={apiCallInProgress}
      disabledCancelBtn={apiCallInProgress}
      submitHandler={handleSubmit(onSubmit)}
    >
      <ApiRequestFlow
        showSkeleton={showLoader}
        hasError={hasError}
        refreshApi={getDynamicFormData}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <FormGrid formFieldsList={newIncidentFormFieldsDynamic} />
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
