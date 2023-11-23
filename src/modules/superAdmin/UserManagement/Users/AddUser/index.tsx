import { Box, Grid, InputAdornment, Typography } from '@mui/material';
import { FormProvider } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { EraserIcon } from '@/assets/icons';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import useToggle from '@/hooks/useToggle';
import { usersApi } from '@/services/superAdmin/user-management/users';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addUsersArray,
  superAdminValidationSchema,
  CompanyOwnerValidationSchema,
} from './AddUser.data';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { SUPER_ADMIN } from '@/constants/index';
import { v4 as uuidv4 } from 'uuid';
import { usePostUserEmployeeMutation } from '@/services/superAdmin/user-management/UserList';
import useUserDetailsList from '../../UsersDetailsList/useUserDetailsList';

const AddUser = ({
  isOpenDrawer,
  onClose,
  tabVal,
  isOpenAddUserDrawer,
  setIsOpenAddUserDrawer,
  organizationId,
}: any) => {
  const [isToggled, setIsToggled] = useToggle(false);
  const { usePostUsersMutation, useUpdateUsersMutation } = usersApi;
  const [postUsers] = usePostUsersMutation();
  const [updateUsers] = useUpdateUsersMutation();
  const [postUserEmployee] = usePostUserEmployeeMutation();
  const pathName = window?.location?.pathname;
  const userDetail = isOpenAddUserDrawer?.data?.data;
  const tabTitle = tabVal === 0 ? 'COMPANY_OWNER' : 'SUPER_ADMIN';
  const id = isOpenAddUserDrawer?.data?.data?._id;
  const { setIsOpenAdduserDrawer: setIsAddEmployyeDrawer } =
    useUserDetailsList();

  const superAdminMethods: any = useForm({
    resolver: yupResolver(superAdminValidationSchema),
    defaultValues: userDetail,
  });
  const companyOwnerMethods: any = useForm({
    resolver: yupResolver(CompanyOwnerValidationSchema),
    defaultValues: userDetail,
  });

  const methods =
    tabTitle === 'SUPER_ADMIN' ? superAdminMethods : companyOwnerMethods;
  const {
    handleSubmit,
    reset,
    //  watch
  } = methods;

  // const crnNumber = watch('crn');
  // const { crnData } = useGetCompaniesCRNQuery(crnNumber);

  const onSubmit = async (values: any) => {
    values.role = tabTitle === 'COMPANY_OWNER' ? 'ORG_ADMIN' : 'SUPER_ADMIN';
    try {
      isOpenAddUserDrawer?.type === 'add'
        ? postUsers({ body: values })?.unwrap()
        : pathName === SUPER_ADMIN?.USERS_LIST
        ? postUserEmployee({ id: organizationId, body: values })
        : updateUsers({ id, body: values });
      enqueueSnackbar('User Added Successfully', {
        variant: 'success',
      });
      setIsOpenAddUserDrawer({ ...isOpenAddUserDrawer, drawer: false });
      setIsAddEmployyeDrawer(false);
      reset();
    } catch (error: any) {
      enqueueSnackbar(error, {
        variant: 'error',
      });
    }
  };

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
      footer
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2} mt={1}>
          {addUsersArray()?.map((item: any) => {
            return (
              item?.toShow?.includes(
                pathName === SUPER_ADMIN?.USERMANAGMENT
                  ? tabTitle
                  : 'SUPER_ADMIN',
              ) && (
                <Grid item xs={12} md={item?.md} key={uuidv4()}>
                  <Typography variant="body2" fontWeight={500}>
                    {item?.title}
                  </Typography>
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
                          top: 45,
                          right: 15,
                          zIndex: 9999,
                        }}
                        position="end"
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            gap: '10px',
                            alignItems: 'center',
                          }}
                        >
                          <Box
                            sx={{ cursor: 'pointer' }}
                            onClick={() => {
                              setIsToggled(false);
                            }}
                          >
                            <EraserIcon />
                          </Box>
                          <BorderColorIcon
                            onClick={() => {
                              setIsToggled(true);
                            }}
                            sx={{ cursor: 'pointer', fontSize: '20px' }}
                          />
                        </Box>
                      </InputAdornment>
                    </Box>
                  )}
                  <item.component
                    {...item.componentProps}
                    size={'small'}
                    disabled={
                      isOpenAddUserDrawer?.type === 'view' ? true : false
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
                      {item?.title === 'Address' &&
                        isToggled &&
                        item?.subData?.map((data: any) => (
                          <Grid item xs={12} md={item?.md} key={uuidv4()}>
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
