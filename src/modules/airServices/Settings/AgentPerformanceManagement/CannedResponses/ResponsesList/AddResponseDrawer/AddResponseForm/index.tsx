import { Avatar, AvatarGroup, Box, Grid } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { addResponseDataArray } from './AddResponseForm.data';
import { SelectAgentsModal } from './SelectAgentsModal';
import { useAddResponseForm } from './useAddResponseForm';

export const AddResponseForm = (props: any) => {
  const {
    methods,
    handleSubmit,
    submitCreateNewTicket,
    agents,
    setAgents,
    setOpenSelectAgentsModal,
    openSelectAgentsModal,
  } = useAddResponseForm(props);
  return (
    <>
      <Box mt={1}>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(submitCreateNewTicket)}
        >
          <Grid container spacing={4}>
            {addResponseDataArray?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
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
    </>
  );
};
