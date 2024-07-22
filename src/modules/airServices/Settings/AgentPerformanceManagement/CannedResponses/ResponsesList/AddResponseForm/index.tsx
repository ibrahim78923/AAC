import {
  Avatar,
  AvatarGroup,
  Box,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { addResponseDataArray, stringAvatar } from './AddResponseForm.data';
import { SelectAgentsModal } from './SelectAgentsModal';
import { useAddResponseForm } from './useAddResponseForm';
import CommonDrawer from '@/components/CommonDrawer';
import {
  CANNED_RESPONSES,
  GENERIC_UPSERT_FORM_CONSTANT,
} from '@/constants/strings';
import { Attachments } from '@/components/Attachments';
import { AIR_SERVICES_SETTINGS_AGENT_PRODUCTIVITY_AND_WORKLOAD_MANAGEMENT_PERMISSIONS } from '@/constants/permission-keys';

export const AddResponseForm = (props: any) => {
  const {
    methodsAddResponseForm,
    handleSubmit,
    submitAddResponse,
    agents,
    setAgents,
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
          methodsAddResponseForm?.handleSubmit(submitAddResponse)();
        }}
        isOk
        isLoading={
          postResponseStatus?.isLoading || patchResponseStatus?.isLoading
        }
        footer
        okText={`${
          editableObj
            ? GENERIC_UPSERT_FORM_CONSTANT?.UPDATE
            : GENERIC_UPSERT_FORM_CONSTANT?.SAVE
        }`}
      >
        <Box mt={1}>
          <FormProvider
            methods={methodsAddResponseForm}
            onSubmit={handleSubmit(submitAddResponse)}
          >
            <Grid container spacing={2}>
              {addResponseDataArray(
                setOpenSelectAgentsModal,
                hasAttachment,
              )?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                  {item?.componentProps?.avatarGroup &&
                    !!agents?.length &&
                    availableForChanged === CANNED_RESPONSES?.SELECT_AGENTS && (
                      <Grid item xs={12}>
                        <AvatarGroup
                          max={4}
                          sx={{ justifyContent: 'flex-end' }}
                          total={agents?.length}
                        >
                          {agents?.map((avatar: any) => (
                            <Tooltip
                              key={avatar?._id}
                              title={`${avatar?.firstName} ${avatar?.lastName}`}
                            >
                              <Avatar
                                key={avatar?.id}
                                sx={{ color: 'grey.600', fontWeight: 500 }}
                                alt={`${avatar?.firstName} ${avatar?.lastName}`}
                                src={avatar?.attachments}
                                {...stringAvatar(
                                  `${avatar?.firstName} ${avatar?.lastName}`,
                                )}
                              />
                            </Tooltip>
                          ))}
                        </AvatarGroup>
                      </Grid>
                    )}
                </Grid>
              ))}
              <Grid item xs={12}>
                {!!editableObj && (
                  <>
                    <Typography
                      variant="body1"
                      fontWeight={500}
                      color="slateBlue.main"
                      mb={2}
                    >
                      {' '}
                      Attachments{' '}
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
        </Box>
        <SelectAgentsModal
          openSelectAgentsModal={openSelectAgentsModal}
          closeSelectAgentsModal={() => setOpenSelectAgentsModal(false)}
          setAgentsResponses={setAgents}
          agentsDetails={agents}
          setValue={setValue}
        />
      </CommonDrawer>
    </>
  );
};
