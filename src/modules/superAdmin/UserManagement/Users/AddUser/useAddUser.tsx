import { usePostUserEmployeeMutation } from '@/services/superAdmin/user-management/UserList';
import { usersApi } from '@/services/superAdmin/user-management/users';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  CompanyOwnerValidationSchema,
  companyOwnerDefaultValues,
  superAdminValidationSchema,
} from './AddUser.data';
import { useEffect, useState } from 'react';
import { debouncedSearch } from '@/utils';
import { useGetAuthCompaniesQuery } from '@/services/auth';
import { SUPER_ADMIN } from '@/constants';
import { enqueueSnackbar } from 'notistack';
import useUserDetailsList from '../../UsersDetailsList/useUserDetailsList';
import useToggle from '@/hooks/useToggle';

const useAddUser = (useActionParams?: any) => {
  const [isToggled, setIsToggled] = useToggle(false);
  const {
    tabVal,
    organizationId,
    setIsOpenAdduserDrawer,
    setIsOpenAddUserDrawer,
    isOpenAddUserDrawer,
  } = useActionParams;
  const [orgNumber, setOrgNumber] = useState('');
  const pathName = window?.location?.pathname;
  const { usePostUsersMutation, useUpdateUsersMutation } = usersApi;
  const [postUsers, { isLoading: postUserLoading }] = usePostUsersMutation();
  const [updateUsers] = useUpdateUsersMutation();
  const [postUserEmployee] = usePostUserEmployeeMutation();
  const { setIsOpenAdduserDrawer: setIsAddEmployyeDrawer } =
    useUserDetailsList();
  const updateUserId = isOpenAddUserDrawer?.data?.data?._id;
  const userDetail = isOpenAddUserDrawer?.data?.data;
  const initialTab = 0;
  const tabTitle = tabVal === initialTab ? 'COMPANY_OWNER' : 'SUPER_ADMIN';
  // for super admin form methods
  const superAdminValues: any = {
    firstName: '',
    lastName: '',
    email: '',
    compositeAddress: '',
    phoneNumber: '',
    jobTitle: '',
    postCode: '',
    facebookUrl: '',
    twitterUrl: '',
  };

  const superAdminMethods: any = useForm({
    resolver: yupResolver(superAdminValidationSchema),
    defaultValues: superAdminValues,
  });

  // for company awner form values
  const companyOwnerValues = {
    ...userDetail,
    crn: userDetail?.organization?.crn,
    companyName: userDetail?.organization?.name,
    products: userDetail?.products?.map((item: any) => {
      return item?._id;
    }),
  };

  // for company owner form methods
  const companyOwnerMethods: any = useForm({
    resolver: yupResolver(CompanyOwnerValidationSchema),
    defaultValues: userDetail ? companyOwnerValues : companyOwnerDefaultValues,
  });

  //constant methods for both forms
  const methods =
    tabTitle === 'SUPER_ADMIN' ? superAdminMethods : companyOwnerMethods;

  const { watch, setValue, handleSubmit, reset } = methods;

  //watch all values from forms
  const formValues = watch();

  //make sum up of address fields
  const addressValues = formValues?.composite?.address
    ? formValues?.composite?.address
    : `${formValues?.flat ? `Flat # ${formValues?.flat}, ` : ''}` +
      `${
        formValues?.buildingNumber
          ? `Building # ${formValues?.buildingNumber}, `
          : ''
      }` +
      `${
        formValues?.buildingName
          ? `Building Name ${formValues?.buildingName}, `
          : ''
      }` +
      `${
        formValues?.streetName ? `Street # ${formValues?.streetName}, ` : ''
      }` +
      `${formValues?.city ? `${formValues?.city}, ` : ''}` +
      `${formValues?.country ? `${formValues?.country}` : ''}`;

  // setValue of address values
  useEffect(() => {
    setValue('address', addressValues?.trim());
  }, [addressValues]);

  useEffect(() => {
    // if (drawerType === 'edit') {
    const fieldsToSet: any = {
      firstName: userDetail?.firstName,
      lastName: userDetail?.lastName,
      email: userDetail?.email,
      address: userDetail?.address?.composite,
      flat: userDetail?.address?.flatNumber ?? '',
      city: userDetail?.address?.city ?? '',
      country: userDetail?.address?.country ?? '',
      buildingName: userDetail?.address?.buildingName ?? '',
      buildingNumber: userDetail?.address?.buildingNumber ?? '',
      streetName: userDetail?.address?.streetName ?? '',
      postCode: userDetail?.postCode,
      phoneNumber: userDetail?.phoneNumber,
      jobTitle: userDetail?.jobTitle,
      facebookUrl: userDetail?.facebookUrl,
      linkedInUrl: userDetail?.linkedInUrl,
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
    // }
  }, [userDetail]);
  // watch crn number from values
  const organizationNumber = formValues?.crn;

  debouncedSearch(organizationNumber, setOrgNumber);
  const { data, isSuccess, isError } =
    tabVal === initialTab
      ? useGetAuthCompaniesQuery({
          q: orgNumber,
        })
      : { data: null, isSuccess: false, isError: false };

  let companyDetails: any = {};
  if (isSuccess) {
    companyDetails = data?.data;
  }

  // set organization name base on crn number
  useEffect(() => {
    setValue('companyName', companyDetails?.company_name);
    setOrgNumber(organizationNumber);
  }, [data, isError]);

  //onsubmit function of forms
  const onSubmit = async (values: any) => {
    if (
      pathName === SUPER_ADMIN?.USERMANAGMENT &&
      tabTitle === 'COMPANY_OWNER'
    ) {
      values.role = 'ORG_ADMIN';
      delete values['address'];
    } else if (
      pathName === SUPER_ADMIN?.USERMANAGMENT &&
      tabTitle === 'SUPER_ADMIN'
    ) {
      values.role = 'SUPER_ADMIN';
    } else if (pathName === SUPER_ADMIN?.USERS_LIST) {
      values.role = 'ORG_EMPLOYEE';
    }

    if (isToggled) {
      values.address = {
        flat: values.flat,
        buildingName: values?.buildingName,
        buildingNumber: values?.buildingNumber,
        streetName: values?.streetName,
        city: values?.city,
        country: values?.country,
      };
    } else {
      values.address = {
        composite: values?.address,
      };
    }
    let keysToDelete: any = [
      'flat',
      'buildingNumber',
      'buildingName',
      'city',
      'country',
      'streetName',
      'compositeAddress',
    ];
    if (isOpenAddUserDrawer?.type === 'edit') {
      keysToDelete = keysToDelete.concat(
        '_id',
        'crn',
        'companyName',
        'role',
        'organization',
        'email',
      );
    }

    for (const key of keysToDelete) {
      delete values[key];
    }

    try {
      isOpenAddUserDrawer?.type === 'add'
        ? (await postUsers({ body: values })?.unwrap(),
          reset(),
          setIsOpenAddUserDrawer({ ...isOpenAddUserDrawer, drawer: false }))
        : pathName === SUPER_ADMIN?.USERS_LIST
          ? (await postUserEmployee({
              id: organizationId,
              body: values,
            })?.unwrap(),
            setIsOpenAdduserDrawer(false))
          : await updateUsers({ id: updateUserId, body: values })?.unwrap();

      enqueueSnackbar(
        `User ${
          isOpenAddUserDrawer?.type === 'edit' ? 'updated' : 'added'
        } Successfully`,
        {
          variant: 'success',
        },
      );
      setIsAddEmployyeDrawer(false);
    } catch (error: any) {
      enqueueSnackbar(error?.data?.message, {
        variant: 'error',
      });
    }
  };

  return {
    pathName,
    postUsers,
    updateUsers,
    postUserEmployee,
    methods,
    handleSubmit,
    onSubmit,
    userDetail,
    tabTitle,
    isToggled,
    setIsToggled,
    addressVal: formValues.address,
    postUserLoading,
  };
};

export default useAddUser;
