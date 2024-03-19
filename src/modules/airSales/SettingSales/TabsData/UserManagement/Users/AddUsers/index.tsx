import CommonDrawer from '@/components/CommonDrawer';
import { FormProvider } from '@/components/ReactHookForm';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { dataArray } from '../Users.data';
import useUsers from '../useUsers';
import useAddUser from './useAddUser';

const AddUsers = (props: any) => {
  const { isAddUserDrawer, setIsAddUserDrawer, checkedUser } = props;
  const theme = useTheme();
  const { onSubmit } = useUsers(isAddUserDrawer, setIsAddUserDrawer);
  const { methods, handleSubmit } = useAddUser(checkedUser);

  return (
    <CommonDrawer
      isDrawerOpen={isAddUserDrawer?.isToggle}
      onClose={() =>
        setIsAddUserDrawer({ ...isAddUserDrawer, isToggle: false })
      }
      title={'Add User'}
      okText={'Add'}
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
                <item.component {...item.componentProps} size={'small'}>
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
