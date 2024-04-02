import { Box, Grid, InputAdornment, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { addUsersArray } from './AddUser.data';
import { SUPER_ADMIN } from '@/constants/index';
import useAddUser from './useAddUser';
import { v4 as uuidv4 } from 'uuid';
import { style } from '../Users.style';
import BorderColorIcon from '@mui/icons-material/BorderColor';

const AddUser = ({
  isOpenDrawer,
  onClose,
  tabVal,
  isOpenAddUserDrawer,
  setIsOpenAddUserDrawer,
  setIsOpenAdduserDrawer,
  organizationId,
}: any) => {
  const useActionParams: any = {
    tabVal: tabVal,
    isOpenAddUserDrawer: isOpenAddUserDrawer,
    setIsOpenAddUserDrawer: setIsOpenAddUserDrawer,
    setIsOpenAdduserDrawer: setIsOpenAdduserDrawer,
    organizationId: organizationId,
  };

  const {
    pathName,
    methods,
    handleSubmit,
    onSubmit,
    userDetail,
    tabTitle,
    isToggled,
    setIsToggled,
    addressVal,
    postUserLoading,
  } = useAddUser(useActionParams);
  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={onClose}
      title={
        isOpenAddUserDrawer?.type === 'view'
          ? userDetail?.firstName
          : isOpenAddUserDrawer?.type === 'edit'
          ? 'Edit User'
          : 'Add User'
      }
      okText={isOpenAddUserDrawer?.type === 'edit' ? 'Update User' : 'Add'}
      isOk={isOpenAddUserDrawer?.type === 'view' ? false : true}
      submitHandler={handleSubmit(onSubmit)}
      isLoading={postUserLoading}
      footer
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1} mt={1} sx={style?.avatarStyle}>
          {addUsersArray()?.map((item: any) => {
            return (
              item?.toShow?.includes(
                pathName === SUPER_ADMIN?.USERMANAGMENT
                  ? tabTitle
                  : 'SUPER_ADMIN',
              ) && (
                <Grid item xs={12} md={item?.md} key={item?.name}>
                  {item?.componentProps?.heading && (
                    <Typography variant="h5">
                      {item?.componentProps?.heading}
                    </Typography>
                  )}
                  {item?.componentProps?.name === 'address' && (
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
                        {addressVal?.length > 0 ? (
                          <BorderColorIcon
                            sx={{
                              cursor: 'not-allowed',
                              fontSize: '20px',
                              color: 'lightgrey',
                            }}
                          />
                        ) : (
                          <BorderColorIcon
                            onClick={() => {
                              setIsToggled(true);
                            }}
                            sx={{ cursor: 'pointer', fontSize: '20px' }}
                          />
                        )}
                      </InputAdornment>
                    </Box>
                  )}

                  <item.component
                    {...item.componentProps}
                    size={'small'}
                    disabled={
                      isOpenAddUserDrawer?.type === 'view' ||
                      item.componentProps.name === 'companyName' ||
                      (isOpenAddUserDrawer?.type === 'edit' &&
                        item.componentProps.name === 'crn')
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
                      {item?.componentProps?.name === 'address' &&
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
                                    <option
                                      key={uuidv4()}
                                      value={option?.value}
                                    >
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
              )
            );
          })}
        </Grid>
      </FormProvider>
    </CommonDrawer>
  );
};

export default AddUser;
