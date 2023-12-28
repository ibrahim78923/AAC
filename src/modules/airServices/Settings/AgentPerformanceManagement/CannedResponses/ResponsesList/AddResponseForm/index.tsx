import { Avatar, AvatarGroup, Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { addResponseDataArray } from './AddResponseForm.data';
import { SelectAgentsModal } from './SelectAgentsModal';
import { useAddResponseForm } from './useAddResponseForm';
import CommonDrawer from '@/components/CommonDrawer';

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
              {addResponseDataArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  <item.component {...item?.componentProps} size={'small'} />
                  {item?.componentProps?.avatarGroup && !!agents?.length && (
                    <Grid item xs={12}>
                      <AvatarGroup max={4} sx={{ justifyContent: 'flex-end' }}>
                        {agents?.map((avatar: any) => (
                          <Avatar
                            key={avatar?.id}
                            alt={avatar?.name}
                            src={avatar?.src?.src}
                          />
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
        />
      </CommonDrawer>
    </>
  );
};
