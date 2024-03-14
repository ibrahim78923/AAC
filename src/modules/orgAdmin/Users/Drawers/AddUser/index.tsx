import { Box, Grid, InputAdornment, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { EditInputIcon } from '@/assets/icons';
import { addUsersArray } from './AddUser.data';
import { v4 as uuidv4 } from 'uuid';
import useAddUser from './useAddUsers';
import useUsers from '../../useUsers';

const AddUser = ({ isOpenDrawer, onClose, setIsOpenAdduserDrawer }: any) => {
  const { user } = useUsers();
  const organizationId = user?.organization?._id;
  const useActionParams: any = {
    setIsOpenAdduserDrawer: setIsOpenAdduserDrawer,
    organizationId: organizationId,
  };

  const { methods, handleSubmit, onSubmit, isToggled, setIsToggled } =
    useAddUser(useActionParams);

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
      <Typography variant="body3">
        Add a new user to this organization
      </Typography>
      <FormProvider methods={methods}>
        <Grid container spacing={1} mt={1}>
          {addUsersArray?.map((item: any) => {
            return (
              <Grid item xs={12} md={item?.md} key={item?.name}>
                {item?.componentProps?.heading && (
                  <Typography variant="h5">
                    {item?.componentProps?.heading}
                  </Typography>
                )}
                {item?.componentProps?.name === 'compositeAddress' && (
                  <Box position="relative">
                    <InputAdornment
                      sx={{
                        position: 'absolute',
                        top: 53,
                        right: 20,
                        zIndex: 9999,
                      }}
                      position="end"
                    >
                      <Box
                        onClick={() => {
                          setIsToggled(true);
                        }}
                        sx={{ cursor: 'pointer', fontSize: '20px' }}
                      >
                        <EditInputIcon />
                      </Box>
                    </InputAdornment>
                  </Box>
                )}
                <item.component
                  {...item.componentProps}
                  size={'small'}
                  disabled={
                    isToggled &&
                    item?.componentProps?.name === 'compositeAddress'
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
                {isToggled && (
                  <Grid item container spacing={2} mt={1}>
                    {item?.componentProps?.name === 'compositeAddress' &&
                      item?.subData?.map((data: any) => (
                        <Grid item xs={12} md={item?.md} key={item?.name}>
                          <Typography variant="body2" fontWeight={500}>
                            {data?.title}
                          </Typography>
                          <data.component
                            {...data.componentProps}
                            size={'small'}
                          >
                            {data?.componentProps?.select
                              ? data?.options?.map((option: any) => (
                                  <option key={uuidv4()} value={option?.value}>
                                    {option?.label}
                                  </option>
                                ))
                              : null}
                          </data.component>
                        </Grid>
                      ))}
                  </Grid>
                )}
              </Grid>
            );
          })}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default AddUser;
