import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { addResponseDataArray } from './AddResponseForm.data';
import { SelectAgentsModal } from './SelectAgentsModal';
import { useAddResponseForm } from './useAddResponseForm';
import CommonDrawer from '@/components/CommonDrawer';
import {
  CANNED_RESPONSES,
  GENERIC_UPSERT_FORM_CONSTANT,
} from '@/constants/strings';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';
import { CustomAvatarGroup } from '@/components/Avatars/CustomAvatarGroup';

export const AddResponseForm = (props: any) => {
  const {
    methods,
    handleSubmit,
    submitAddResponse,
    selectedAgentsList,
    setSelectedAgentsList,
    setOpenSelectAgentsModal,
    openSelectAgentsModal,
    open,
    closeDrawer,
    editableObj,
    postResponseStatus,
    patchResponseStatus,
    availableForChanged,
    setValue,
    hasAttachment,
    setHasAttachment,
  } = useAddResponseForm(props);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={open}
        onClose={closeDrawer}
        title={`${
          editableObj
            ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
            : GENERIC_UPSERT_FORM_CONSTANT?.ADD
        } Response`}
        submitHandler={() => {
          handleSubmit(submitAddResponse)();
        }}
        isOk
        isLoading={
          postResponseStatus?.isLoading || patchResponseStatus?.isLoading
        }
        disabledCancelBtn={
          postResponseStatus?.isLoading || patchResponseStatus?.isLoading
        }
        footer
        okText={`${
          editableObj
            ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
            : GENERIC_UPSERT_FORM_CONSTANT?.SAVE
        }`}
      >
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(submitAddResponse)}
        >
          <Grid container spacing={2}>
            {addResponseDataArray(setOpenSelectAgentsModal, hasAttachment)?.map(
              (item: any) => (
                <Grid item xs={12} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                  {item?.avatarGroup &&
                    !!selectedAgentsList?.length &&
                    availableForChanged === CANNED_RESPONSES?.SELECT_AGENTS && (
                      <Grid item xs={12}>
                        <CustomAvatarGroup
                          max={4}
                          selectedUsers={selectedAgentsList}
                        />
                      </Grid>
                    )}
                </Grid>
              ),
            )}

            <Grid item xs={12}>
              {!!editableObj && (
                <>
                  <Typography
                    variant="body1"
                    fontWeight={500}
                    color="slateBlue.main"
                    mb={2}
                  >
                    Attachments
                  </Typography>
                  <Box maxHeight={'20vh'}>
                    <Attachments
                      recordId={editableObj?._id}
                      colSpan={{ sm: 12, lg: 12 }}
                      permissionKey={[
                        AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS?.SEARCH_EDIT_DELETE_CANNED_RESPONSES,
                      ]}
                      hasAttachments={setHasAttachment}
                    />
                  </Box>
                </>
              )}
            </Grid>
          </Grid>
        </FormProvider>
      </CommonDrawer>
      {openSelectAgentsModal && (
        <SelectAgentsModal
          openSelectAgentsModal={openSelectAgentsModal}
          closeSelectAgentsModal={() => setOpenSelectAgentsModal(false)}
          setAgentsResponses={setSelectedAgentsList}
          agentsDetails={selectedAgentsList}
          setValue={setValue}
          setOpenSelectAgentsModal={setOpenSelectAgentsModal}
        />
      )}
    </>
  );
};
