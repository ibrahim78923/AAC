import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { dataArray } from '../Users.data';
import useAddUser from './useAddUser';
import useUserManagement from '@/modules/airMarketer/SocialMarketing/SocialInbox/SocialInboxSettings/TabsData/UserManagement/useUserManagement';

const AddUsers = (props: any) => {
  const { isAddUserDrawer, setIsAddUserDrawer, checkedUser } = props;
  const theme = useTheme();
  const { methods, handleSubmit, onSubmit } = useAddUser(
    checkedUser,
    isAddUserDrawer?.type,
  );
  const { EDIT, VIEW } = useUserManagement();

  return (
    <CommonDrawer
      isDrawerOpen={isAddUserDrawer?.isToggle}
      onClose={() =>
        setIsAddUserDrawer({ ...isAddUserDrawer, isToggle: false })
      }
      title={isAddUserDrawer?.type === EDIT ? 'Edit User' : 'Add User'}
      okText={isAddUserDrawer?.type === EDIT ? 'Edit' : 'Add'}
      footer={true}
      isOk={true}
      submitHandler={handleSubmit(onSubmit)}
    >
      <Typography
        sx={{
          fontWeight: 500,
          fontSize: '12px',
          color: `${theme.palette.custom.main}`,
        }}
      >
        Add a new user to this organization
      </Typography>
      <Box sx={{ paddingTop: '1rem' }}>
        <FormProvider methods={methods}>
          <Grid container spacing={1}>
            {dataArray()?.map((item: any) => (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <item.component
                  {...item.componentProps}
                  size={'small'}
                  disabled={
                    isAddUserDrawer?.type === VIEW ||
                    (isAddUserDrawer?.type === EDIT &&
                      item?.componentProps?.name === 'email')
                      ? true
                      : false
                  }
                >
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            ))}
          </Grid>
        </FormProvider>
      </Box>
    </CommonDrawer>
  );
};

export default AddUsers;
