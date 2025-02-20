import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertFolder } from './useUpsertFolder';
import { upsertFolderFormFields } from './UpsertFolder.data';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { KNOWLEDGE_BASE_ACTIONS_CONSTANT } from '@/constants/portal-actions';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';
import { ApiRequestFlow } from '@/components/ApiRequestStates/ApiRequestFlow';

const { EDIT_FOLDER } = KNOWLEDGE_BASE_ACTIONS_CONSTANT ?? {};
const { UPDATE, CREATE } = GENERIC_UPSERT_FORM_CONSTANT ?? {};

const UpsertFolder = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    closePortal,
    isPortalOpen,
    showLoader,
    isError,
    refetch,
    apiCallInProgress,
  } = useUpsertFolder();

  return (
    <CustomCommonDialog
      isPortalOpen={isPortalOpen?.isOpen}
      closePortal={closePortal}
      dialogTitle={isPortalOpen?.action}
      submitButtonText={isPortalOpen?.action === EDIT_FOLDER ? UPDATE : CREATE}
      showSubmitLoader={apiCallInProgress}
      disabledCancelButton={apiCallInProgress}
      handleSubmitButton={handleSubmit(onSubmit)}
      disabledSubmitButton={showLoader}
    >
      <ApiRequestFlow
        refreshApi={refetch}
        showSkeleton={showLoader}
        length={3}
        hasError={isError}
      >
        <FormProvider methods={methods}>
          {upsertFolderFormFields?.map((item: ReactHookFormFieldsI) => (
            <item.component
              {...item?.componentProps}
              key={item?.id}
              size={'small'}
            />
          ))}
        </FormProvider>
      </ApiRequestFlow>
    </CustomCommonDialog>
  );
};

export default UpsertFolder;
