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

const useAddUser = (useActionParams?: any) => {
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
  const [postUsers] = usePostUsersMutation();
  const [updateUsers] = useUpdateUsersMutation();
  const [postUserEmployee] = usePostUserEmployeeMutation();
  const { setIsOpenAdduserDrawer: setIsAddEmployyeDrawer } =
    useUserDetailsList();
  const updateUserId = isOpenAddUserDrawer?.data?.data?._id;
  const userDetail = isOpenAddUserDrawer?.data?.data;
  const initialTab = 0;
  const tabTitle = tabVal === initialTab ? 'COMPANY_OWNER' : 'SUPER_ADMIN';

  // for super admin form methods
  const superAdminMethods: any = useForm({
    resolver: yupResolver(superAdminValidationSchema),
    defaultValues: userDetail,
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
  const addressValues = `${formValues?.flat ? 'Flat # ' : ''}${
    formValues?.flat ?? ''
  }${formValues?.flat ? ',' : ''}
    ${formValues?.buildingName ? 'building name ' : ''}${
      formValues?.buildingName ?? ''
    }${formValues?.buildingName ? ',' : ''}${
      formValues?.buildingNumber ? 'building # ' : ''
    }${formValues?.buildingNumber ?? ''}
    ${formValues?.buildingNumber ? ',' : ''}${
      formValues?.streetName ? 'street name ' : ''
    }${formValues?.streetName ?? ''}${formValues?.streetName ? ',' : ''}${
      formValues?.city ?? ''
    }${formValues?.city ? ',' : ''}${formValues?.country ?? ''}${
      formValues?.country ? ',' : ''
    }`;

  // setValue of address values
  useEffect(() => {
    setValue('compositeAddress', addressValues?.trim());
  }, [addressValues]);

  // watch crn number from values
  const organizationNumber = formValues?.crn;
  debouncedSearch(organizationNumber, setOrgNumber);
  const { data, isSuccess, isError } = useGetAuthCompaniesQuery({
    q: orgNumber,
  });
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
    if (values?.country && values?.city) {
      values.address = {
        flatNumber: values.flat,
        buildingName: values?.buildingName,
        buildingNumber: values?.buildingNumber,
        streetName: values?.streetName,
        city: values?.city,
        country: values?.country,
      };
    } else {
      values.address = {
        composite: values?.compositeAddress,
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
        'products',
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
      reset();
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
  };
};

export default useAddUser;
