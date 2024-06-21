import { Grid, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import { upsertUserArray } from './UpsertUser.data';
import CommonDrawer from '@/components/CommonDrawer';
import { USER_MANAGEMENT } from '@/constants/strings';
import { useUser } from '../useUser';

function UpsertUser({
  isDrawerOpen,
  title,
  okText,
  setIsDrawerOpen,
  tabData,
  methods,
  handleSubmit,
  submit,
  patchProductUsersStatus,
  addUsersListStatus,
}: any) {
  const { disabled, usersTeamDropdown, rolesDropdown, setDisabled } = useUser();

  return (
    <CommonDrawer
      isDrawerOpen={isDrawerOpen}
      onClose={() => setIsDrawerOpen?.(false)}
      title={title}
      submitHandler={() => {
        title === USER_MANAGEMENT?.USERVIEW && disabled
          ? setDisabled(false)
          : handleSubmit(submit)();
      }}
      footer={true}
      isOk={true}
      okText={
        title === USER_MANAGEMENT?.USERVIEW && disabled
          ? USER_MANAGEMENT?.EDIT
          : okText
      }
      cancelText={
        title === USER_MANAGEMENT?.USERVIEW && disabled
          ? USER_MANAGEMENT?.BACK
          : USER_MANAGEMENT?.CANCEL
      }
      isLoading={
        addUsersListStatus?.isLoading || patchProductUsersStatus?.isLoading
      }
      isDisabled={
        addUsersListStatus?.isLoading || patchProductUsersStatus?.isLoading
      }
      disabledCancelBtn={
        addUsersListStatus?.isLoading || patchProductUsersStatus?.isLoading
      }
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1}>
          {upsertUserArray(rolesDropdown, usersTeamDropdown)?.map(
            (item: any) => (
              <Grid item xs={12} md={item?.md} key={item?._id}>
                {item?.subheading && title !== USER_MANAGEMENT?.USERVIEW && (
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {item?.subheading}
                  </Typography>
                )}
                <item.component
                  {...item?.componentProps}
                  size={'small'}
                  disabled={title === USER_MANAGEMENT?.USERVIEW && disabled}
                  placeholder={
                    title === USER_MANAGEMENT?.USERVIEW && tabData?.length > 0
                      ? (tabData?.[0]?.[item?.componentProps?.name] as string)
                      : item?.componentProps?.placeholder
                  }
                />
              </Grid>
            ),
          )}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
}

export default UpsertUser;
