import { Box, Grid, InputAdornment, Typography } from '@mui/material';

import { FormProvider, RHFSelect } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { EraserIcon } from '@/assets/icons';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import useToggle from '@/hooks/useToggle';
import { usersApi } from '@/services/superAdmin/user-management/users';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  addUsersArray,
  superAdminDefaultValues,
  companyOwnerDefaultValues,
  options,
  superAdminValidationSchema,
  CompanyOwnerValidationSchema,
} from './AddUser.data';

import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';
import useUserManagement from '../../useUserManagement';
import { SUPER_ADMIN } from '@/constants/index';

const AddUser = ({ isOpenDrawer, onClose }: any) => {
  const { userType, setUserType } = useUserManagement();
  const [isToggled, setIsToggled] = useToggle(false);
  const { usePostUsersMutation } = usersApi;
  const [postUsers] = usePostUsersMutation();
  const pathName = window?.location?.pathname;

  const superAdminMethods: any = useForm({
    resolver: yupResolver(superAdminValidationSchema),
    defaultValues: superAdminDefaultValues,
  });
  const companyOwnerMethods: any = useForm({
    resolver: yupResolver(CompanyOwnerValidationSchema),
    defaultValues: companyOwnerDefaultValues,
  });

  const methods =
    userType === 'SUPER_ADMIN' ? superAdminMethods : companyOwnerMethods;

  const { handleSubmit, reset, watch } = methods;
  const { crn } = watch({ name: 'crn' });

  const onSubmit = async (values: any) => {
    values.role = userType;
    values.companyName = crn;
    try {
      postUsers({ body: values })?.unwrap();
      enqueueSnackbar('User Added Successfully', {
        variant: 'success',
      });
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
      title="Add User"
      okText="Add"
      isOk={true}
      submitHandler={handleSubmit(onSubmit)}
      footer
    >
      <FormProvider methods={methods}>
        <Grid container spacing={2} mt={1}>
          {pathName === SUPER_ADMIN?.USERMANAGMENT && (
            <Grid item xs={12}>
              <Typography variant="body2" fontWeight={500}>
                User Type
              </Typography>
              <RHFSelect
                name="role"
                size={'small'}
                value={userType}
                onChange={(e: any) => setUserType(e?.target?.value)}
                fullWidth={true}
                select={true}
              >
                {options?.map((option: any) => (
                  <option key={uuidv4()} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </RHFSelect>
            </Grid>
          )}
          {addUsersArray?.map((item: any) => {
            return (
              item?.toShow?.includes(
                pathName === SUPER_ADMIN?.USERMANAGMENT
                  ? userType
                  : 'ORG_ADMIN',
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
                    <Box
                      sx={{
                        backgroundColor: '',
                        position: 'relative',
                        right: 0,
                      }}
                    >
                      <InputAdornment
                        sx={{
                          position: 'absolute',
                          top: 20,
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
                  <item.component {...item.componentProps} size={'small'}>
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
