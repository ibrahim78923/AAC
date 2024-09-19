import { FormProvider } from '@/components/ReactHookForm';
import { useUpsertFolder } from './useUpsertFolder';
import {
  SET_DRAWER_CONSTANTS,
  upsertFolderFormFields,
} from './UpsertFolder.data';
import { ReactHookFormFieldsI } from '@/components/ReactHookForm/ReactHookForm.interface';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';

export const UpsertFolder = () => {
  const {
    methods,
    handleSubmit,
    onSubmit,
    closePortal,
    isPortalOpen,
    showLoader,
  } = useUpsertFolder();

  return (
    <CustomCommonDialog
      isPortalOpen={isPortalOpen?.isOpen}
      closePortal={closePortal}
      dialogTitle={SET_DRAWER_CONSTANTS?.[isPortalOpen?.action]?.title}
      submitButtonText={
        SET_DRAWER_CONSTANTS?.[isPortalOpen?.action]?.buttonText
      }
      showSubmitLoader={showLoader}
      disabledCancelButton={showLoader}
      handleSubmitButton={handleSubmit(onSubmit)}
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
    </CustomCommonDialog>
  );
};
