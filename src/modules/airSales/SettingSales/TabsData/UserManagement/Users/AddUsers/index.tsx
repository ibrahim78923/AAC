import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { dataArray } from '../Users.data';
import useAddUser from './useAddUser';

const AddUsers = (props: any) => {
  const { isAddUserDrawer, setIsAddUserDrawer, checkedUser } = props;
  const theme = useTheme();
  const { methods, handleSubmit, onSubmit } = useAddUser(
    checkedUser,
    isAddUserDrawer,
    setIsAddUserDrawer,
  );

  return (
    <CommonDrawer
      isDrawerOpen={isAddUserDrawer?.isToggle}
      onClose={() =>
        setIsAddUserDrawer({ ...isAddUserDrawer, isToggle: false })
      }
      title={isAddUserDrawer?.type === 'edit' ? 'Edit User' : 'Add User'}
      okText={isAddUserDrawer?.type === 'edit' ? 'Edit' : 'Add'}
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
              <Grid item xs={12} md={item?.md} key={item?.componentProps?.name}>
                <item.component
                  {...item.componentProps}
                  size={'small'}
                  disabled={
                    isAddUserDrawer?.type === 'view' ||
                    (isAddUserDrawer?.type === 'edit' &&
                      item?.componentProps?.name === 'email')
                      ? true
                      : false
                  }
                >
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={option?.value} value={option?.value}>
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
