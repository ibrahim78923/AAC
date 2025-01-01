import { useSelectAgentsModal } from './useSelectAgentsModal';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { FormProvider, RHFAutocompleteAsync } from '@/components/ReactHookForm';
import { CustomCommonDialog } from '@/components/CustomCommonDialog';
import { CustomAvatarGroup } from '@/components/CustomAvatarGroup';

export const SelectAgentsModal = (props: any) => {
  const {
    methods,
    onSubmit,
    selectedAgentsList,
    openSelectAgentsModal,
    apiQueryAgents,
    productId,
    handleSubmit,
    closeModal,
  } = useSelectAgentsModal(props);

  return (
    <>
      <CustomCommonDialog
        dialogMaxWidth={'xs'}
        typeImage={
          <CheckCircleRoundedIcon
            sx={{
              color: 'primary.main',
            }}
          />
        }
        isPortalOpen={openSelectAgentsModal}
        closePortal={(_event: any, reason: any) => {
          if (reason && reason == 'backdropClick') return;
          closeModal();
        }}
        dialogTitle="Agents"
        submitButtonText="Assign"
        disabledCancelButton={!!!selectedAgentsList?.length}
        handleSubmitButton={handleSubmit(onSubmit)}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <RHFAutocompleteAsync
            name="agents"
            size="small"
            multiple
            placeholder="Select"
            apiQuery={apiQueryAgents}
            getOptionLabel={(option: any) =>
              `${option?.firstName} ${option?.lastName}`
            }
            externalParams={{ admin: true, productId }}
            required
          />

          {!!selectedAgentsList?.length && (
            <CustomAvatarGroup max={4} selectedUsers={selectedAgentsList} />
          )}
        </FormProvider>
      </CustomCommonDialog>
    </>
  );
};
