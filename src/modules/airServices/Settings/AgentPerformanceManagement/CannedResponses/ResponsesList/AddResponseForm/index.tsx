import { Avatar, AvatarGroup, Box, Grid, Tooltip } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { addResponseDataArray, stringAvatar } from './AddResponseForm.data';
import { SelectAgentsModal } from './SelectAgentsModal';
import { useAddResponseForm } from './useAddResponseForm';
import CommonDrawer from '@/components/CommonDrawer';
import { CANNED_RESPONSES } from '@/constants/strings';

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
  } = useAddResponseForm(props);
  return (
    <>
      <CommonDrawer
        isDrawerOpen={open}
        onClose={closeDrawer}
        title={`${editableObj ? 'Update' : 'Add'} Response`}
        submitHandler={() => {
          methodsAddResponseForm?.handleSubmit(submitAddResponse)();
        }}
        isOk={true}
        isLoading={
          postResponseStatus?.isLoading || patchResponseStatus?.isLoading
        }
        footer={true}
        okText={`${editableObj ? 'Update' : 'Save'}`}
      >
        <Box mt={1}>
          <FormProvider
            methods={methodsAddResponseForm}
            onSubmit={handleSubmit(submitAddResponse)}
          >
            <Grid container spacing={4}>
              {addResponseDataArray(
                availableForChanged,
                setOpenSelectAgentsModal,
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
