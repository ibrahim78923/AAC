import { Box, Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertTeamArray } from './UpsertTeams.data';
import CommonDrawer from '@/components/CommonDrawer';
import { useUpsertTeams } from './useUpsertTeams';
import { USER_MANAGEMENT } from '@/constants/strings';

function UpsertTeams({ isDrawerOpen, setIsDrawerOpen, title, okText }: any) {
  const { methods, handleSubmit, submit, disabled, setDisabled, teamData } =
    useUpsertTeams(setIsDrawerOpen);

  return (
    <>
      <CommonDrawer
        isDrawerOpen={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
        }}
        title={title}
        submitHandler={() => {
          title === USER_MANAGEMENT?.EDIT_TEAM && disabled
            ? setDisabled(false)
            : handleSubmit(submit)();
        }}
        footer={true}
        isOk={true}
        okText={
          title === USER_MANAGEMENT?.EDIT_TEAM && disabled
            ? USER_MANAGEMENT?.EDIT
            : okText
        }
      >
        <Box mt={1}>
          <FormProvider methods={methods}>
            <Grid container spacing={4}>
              {upsertTeamArray?.map((item: any) => (
                <Grid item xs={12} md={item?.md} key={item?.id}>
                  {item?.subheading && title !== USER_MANAGEMENT?.EDIT_TEAM && (
                    <Typography variant="body2" sx={{ mb: 2 }}>
                      {item?.subheading}
                    </Typography>
                  )}
                  <item.component
                    {...item?.componentProps}
                    size={'small'}
                    disabled={title === USER_MANAGEMENT?.EDIT_TEAM && disabled}
                    placeholder={
                      title === USER_MANAGEMENT?.EDIT_TEAM &&
                      teamData?.length > 0
                        ? (teamData?.[0]?.[
                            item?.componentProps?.name
                          ] as string)
                        : item?.componentProps?.placeholder
                    }
                  />
                </Grid>
              ))}
            </Grid>
          </FormProvider>
        </Box>
      </CommonDrawer>
    </>
  );
}

export default UpsertTeams;
