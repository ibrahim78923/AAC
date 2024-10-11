import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertFolder } from './useUpsertFolder';
import { upsertFolderFormFields } from './UpsertFolder.data';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import ApiErrorState from '@/components/ApiErrorState';
import SkeletonForm from '@/components/Skeletons/SkeletonForm';
import { KNOWLEDGE_BASE_ACTIONS_CONSTANT } from '@/constants/portal-actions';
import { GENERIC_UPSERT_FORM_CONSTANT } from '@/constants/strings';

const { EDIT_FOLDER } = KNOWLEDGE_BASE_ACTIONS_CONSTANT ?? {};
const { EDIT, ADD, UPDATE, CREATE } = GENERIC_UPSERT_FORM_CONSTANT ?? {};

export const UpsertFolder = () => {
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
      dialogTitle={`${
        isPortalOpen?.action === EDIT_FOLDER ? EDIT : ADD
      } Folder`}
      submitButtonText={isPortalOpen?.action === EDIT_FOLDER ? UPDATE : CREATE}
      showSubmitLoader={apiCallInProgress}
      disabledCancelButton={apiCallInProgress}
      handleSubmitButton={handleSubmit(onSubmit)}
    >
      <FormProvider methods={methods}>
        {showLoader ? (
          <SkeletonForm length={3} />
        ) : isError ? (
          <ApiErrorState canRefresh refresh={refetch} />
        ) : (
          upsertFolderFormFields?.map((item: ReactHookFormFieldsI) => (
            <item.component
              {...item?.componentProps}
              key={item?.id}
              size={'small'}
            />
          ))
        )}
      </FormProvider>
    </CustomCommonDialog>
  );
};
