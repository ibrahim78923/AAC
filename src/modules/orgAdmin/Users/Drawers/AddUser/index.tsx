import { Grid, Typography, useTheme } from '@mui/material';

import { FormProvider } from '@/components/ReactHookForm';

import CommonDrawer from '@/components/CommonDrawer';

import { addUsersArray } from './AddUser.data';
import { v4 as uuidv4 } from 'uuid';
import useAddUsers from './useAddUsers';

const AddUser = ({ isOpenDrawer, onClose, setIsOpenAdduserDrawer }: any) => {
  const { handleSubmit, onSubmit, methods } = useAddUsers(
    setIsOpenAdduserDrawer,
  );
  const theme = useTheme();

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={onClose}
      title="Add User"
      okText="Add"
      isOk={true}
      submitHandler={handleSubmit(onSubmit)}
      footer
    >
      <FormProvider methods={methods}>
        <Typography
          variant="body3"
          fontWeight={500}
          color={theme?.palette?.custom?.main}
        >
          Add a new user to this organization.
        </Typography>
        <Grid container spacing={1}>
          {addUsersArray?.map((item: any) => {
            return (
              <Grid item xs={12} md={item?.md} key={uuidv4()}>
                <Typography variant="body2" fontWeight={500}>
                  {item?.title}
                </Typography>
                <item.component {...item?.componentProps} size={'small'}>
                  {item?.componentProps?.select &&
                    item?.options?.map((option: any) => (
                      <option key={uuidv4()} value={option?.value}>
                        {option?.label}
                      </option>
                    ))}
                </item.component>
              </Grid>
            );
          })}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default AddUser;
