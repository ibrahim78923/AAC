import { Box, Grid, InputAdornment, Typography } from '@mui/material';
import { FormProvider, RHFTextField } from '@/components/ReactHookForm';
import CommonDrawer from '@/components/CommonDrawer';
import { EraserIcon } from '@/assets/icons';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import useToggle from '@/hooks/useToggle';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  addUsersArray,
  superAdminValidationSchema,
  CompanyOwnerValidationSchema,
  companyOwnerDefaultValues,
} from './AddUser.data';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { SUPER_ADMIN } from '@/constants/index';
import useUserDetailsList from '../../UsersDetailsList/useUserDetailsList';
import { useGetAuthCompaniesQuery } from '@/services/auth';
import { useEffect, useState } from 'react';
import { debouncedSearch } from '@/utils';
import useAddUser from './useAddUser';
import { v4 as uuidv4 } from 'uuid';

const AddUser = ({
  isOpenDrawer,
  onClose,
  tabVal,
  isOpenAddUserDrawer,
  setIsOpenAddUserDrawer,
  organizationId,
}: any) => {
  const { pathName, postUsers, updateUsers, postUserEmployee } = useAddUser();
  const [isToggled, setIsToggled] = useToggle(false);
  const userDetail = isOpenAddUserDrawer?.data?.data;
  const tabTitle = tabVal === 0 ? 'COMPANY_OWNER' : 'SUPER_ADMIN';
  const id = isOpenAddUserDrawer?.data?.data?._id;
  const { setIsOpenAdduserDrawer: setIsAddEmployyeDrawer } =
    useUserDetailsList();

  const superAdminMethods: any = useForm({
    resolver: yupResolver(superAdminValidationSchema),
    defaultValues: userDetail,
  });

  const companyOwnerValues = {
    ...userDetail,
    crn: userDetail?.organization?.crn,
    companyName: userDetail?.organization?.name,
  };

  const companyOwnerMethods: any = useForm({
    resolver: yupResolver(CompanyOwnerValidationSchema),
    defaultValues: userDetail ? companyOwnerValues : companyOwnerDefaultValues,
  });

  const methods =
    tabTitle === 'SUPER_ADMIN' ? superAdminMethods : companyOwnerMethods;
  const { handleSubmit, reset, watch, setValue } = methods;

  const onSubmit = async (values: any) => {
    if (tabTitle === 'COMPANY_OWNER') {
      values.role = 'ORG_ADMIN';
      delete values['address'];
    } else if (tabTitle === 'SUPER_ADMIN') {
      delete values['phoneNumber'];
      delete values['postCode'];
      values.role = 'SUPER_ADMIN';
    } else {
      values.role = 'ORG_EMPLOYEE';
    }
    if (values?.compositeAddress) {
      values.address = {
        composite: values?.compositeAddress,
      };
    } else {
      values.address = {
        flatNumber: values.flat,
        buildingName: values?.buildingName,
        buildingNumber: values?.buildingNumber,
        streetName: values?.streetName,
        city: values?.city,
        country: values?.country,
      };
    }
    delete values['compositeAddress'];
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

  const organizationNumber = watch('crn');

  const [orgNumber, setOrgNumber] = useState('');
  debouncedSearch(organizationNumber, setOrgNumber);
  const { data, isSuccess, isError } = useGetAuthCompaniesQuery({
    q: orgNumber,
  });
  let companyDetails: any = {};
  if (isSuccess) {
    companyDetails = data?.data;
  }

  useEffect(() => {
    setValue('companyName', companyDetails?.company_name);
    setOrgNumber(organizationNumber);
  }, [data, isError]);

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
                          top: 45,
                          right: 20,
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
                  {item?.componentProps?.name === 'email' &&
                    tabTitle === 'COMPANY_OWNER' && (
                      <Box mt={2}>
                        <Grid item xs={12}>
                          <RHFTextField
                            name="crn"
                            label="Company Registration Number(CRN)"
                            placeholder="Enter crn"
                            size="small"
                            // defaultValue={userDetail?.organization?.crn}
                          />
                        </Grid>
                        <Grid item xs={12} mt={2}>
                          <RHFTextField
                            name="companyName"
                            label="company Name"
                            placeholder="Company Name"
                            size="small"
                            disabled
                            // defaultValue={userDetail?.organization?.name}
                          />
                        </Grid>
                      </Box>
                    )}
                  {isToggled && (
                    <Grid item container spacing={2} mt={1}>
                      {item?.componentProps?.name === 'compositeAddress' &&
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
