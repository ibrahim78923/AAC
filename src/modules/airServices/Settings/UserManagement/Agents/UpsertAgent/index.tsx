import { Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertAgent } from './useUpsertAgent';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import ApiErrorState from '@/components/ApiErrorState';
import { componentMap } from '@/utils/dynamic-forms';
import { createElement } from 'react';
import { IAgentsProps } from '../Agents.interface';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const UpsertAgent = (props: IAgentsProps) => {
  const { isAgentModalOpen, selectedAgentList } = props;
  const {
    methods,
    handleSubmit,
    handleUpsertAgentSubmit,
    handleClose,
    upsertAgentFormFields,
    getDynamicFieldsStatus,
    form,
    apiCallInProgress,
  } = useUpsertAgent(props);

  return (
    <>
      <CustomCommonDialog
        isPortalOpen={isAgentModalOpen}
        closePortal={handleClose}
        dialogTitle={`${
          !!selectedAgentList?.length
            ? GENERIC_UPSERT_FORM_CONSTANT?.EDIT
            : GENERIC_UPSERT_FORM_CONSTANT?.ADD
        } Agent`}
        submitButtonText={
          !!selectedAgentList?.length
            ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
            : GENERIC_UPSERT_FORM_CONSTANT?.SAVE
        }
        showSubmitLoader={apiCallInProgress}
        disabledCancelButton={apiCallInProgress}
        handleSubmitButton={handleSubmit(handleUpsertAgentSubmit)}
      >
        {getDynamicFieldsStatus?.isLoading ||
        getDynamicFieldsStatus?.isFetching ? (
          <SkeletonForm />
        ) : getDynamicFieldsStatus?.isError ? (
          <ApiErrorState />
        ) : (
          <>
            <FormProvider methods={methods}>
              <Grid container spacing={1}>
                {upsertAgentFormFields?.map((form: any) => (
                  <Grid item xs={12} md={form?.gridLength} key={form?.id}>
                    <form.component {...form?.componentProps} size="small" />
                  </Grid>
                ))}
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
              </Grid>
            </FormProvider>
          </>
        )}
      </CustomCommonDialog>
    </>
  );
};
