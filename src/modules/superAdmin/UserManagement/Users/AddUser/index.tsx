import { Box, Grid, InputAdornment, Skeleton, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { addUsersArray } from './AddUser.data';
import { EQuickLinksType, fieldName, SUPER_ADMIN } from '@/constants/index';
import useAddUser from './useAddUser';
import { v4 as uuidv4 } from 'uuid';
import { style } from '../Users.style';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { ACTIONS_TYPES } from '@/constants/strings';
import {
  AddUserProps,
  UseActionParams,
} from '@/modules/superAdmin/UserManagement/Users/Users-interface';

const AddUser = ({
  isOpenDrawer,
  onClose,
  tabVal,
  isOpenAddUserDrawer,
  setIsOpenAddUserDrawer,
  setIsOpenAdduserDrawer,
  organizationId,
}: AddUserProps) => {
  const useActionParams: UseActionParams = {
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
    userDetailLoading,
    updateUserLoading,
  } = useAddUser(useActionParams);

  return (
    <CommonDrawer
      isDrawerOpen={isOpenDrawer}
      onClose={onClose}
      title={
        isOpenAddUserDrawer?.type === ACTIONS_TYPES?.VIEW
          ? userDetail?.firstName
          : isOpenAddUserDrawer?.type === ACTIONS_TYPES?.EDIT
          ? 'Edit User'
          : 'Add User'
      }
      okText={
        isOpenAddUserDrawer?.type === ACTIONS_TYPES?.EDIT
          ? 'Update User'
          : 'Add'
      }
      isOk={isOpenAddUserDrawer?.type === ACTIONS_TYPES?.VIEW ? false : true}
      submitHandler={handleSubmit(onSubmit)}
      isLoading={postUserLoading || updateUserLoading}
      footer
    >
      <FormProvider methods={methods}>
        <Grid container spacing={1} mt={1} sx={style?.avatarStyle}>
          {addUsersArray()?.map((item: any) => {
            const shouldShowItem = item?.toShow?.includes(
              pathName === SUPER_ADMIN?.USERMANAGMENT
                ? tabTitle
                : EQuickLinksType?.ORG_EMPLOYEE,
            );

            return (
              shouldShowItem && (
                <Grid item xs={12} md={item?.md} key={item?.name}>
                  {item?.componentProps?.heading && !userDetailLoading && (
                    <Typography variant="h5">
                      {item?.componentProps?.heading}
                    </Typography>
                  )}
                  {item?.componentProps?.name === fieldName?.ADDRESS && (
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

                  {userDetailLoading ? (
                    <Skeleton variant="rectangular" height={40} />
                  ) : (
                    <item.component
                      {...item.componentProps}
                      size={'small'}
                      disabled={
                        isOpenAddUserDrawer?.type === ACTIONS_TYPES?.VIEW ||
                        item.componentProps.name === 'companyName' ||
                        (isOpenAddUserDrawer?.type === ACTIONS_TYPES?.EDIT &&
                          (item.componentProps.name === 'crn' ||
                            item.componentProps.name === 'email' ||
                            item.componentProps.name === 'products'))
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
                  )}
                  {isToggled && (
                    <Grid item container spacing={2} mt={1}>
                      {item?.componentProps?.name === fieldName?.ADDRESS &&
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
