import { usePostUserEmployeeMutation } from '@/services/superAdmin/user-management/UserList';
import {
  useGetUsersByIdQuery,
  usersApi,
} from '@/services/superAdmin/user-management/users';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  CompanyOwnerValidationSchema,
  companyOwnerDefaultValues,
  superAdminValidationSchema,
  orgEmployeeValidationSchema,
} from './AddUser.data';
import { useEffect, useState } from 'react';
import { debouncedSearch } from '@/utils';
import {
  useAuthCompanyVerificationMutation,
  useGetAuthCompaniesQuery,
} from '@/services/auth';
import { EQuickLinksType, SUPER_ADMIN } from '@/constants';
import useToggle from '@/hooks/useToggle';
import { ACTIONS_TYPES } from '@/constants/strings';
import {
  UseActionParams,
  UseAddUserReturn,
} from '@/modules/superAdmin/UserManagement/Users/Users-interface';
import { debounce } from 'lodash';
import { useGetEmailExistQuery } from '@/services/common-APIs';
import { errorSnackbar, successSnackbar } from '@/lib/snackbar';

const useAddUser = (useActionParams: UseActionParams): UseAddUserReturn => {
  const [isToggled, setIsToggled] = useToggle(false);
  const {
    tabVal,
    organizationId,
    setIsOpenAdduserDrawer,
    setIsOpenAddUserDrawer,
    isOpenAddUserDrawer,
  } = useActionParams;
  const [orgNumber, setOrgNumber] = useState('');
  const [email, setEmail] = useState();
  const pathName = window?.location?.pathname;
  const { usePostUsersMutation, useUpdateUsersMutation } = usersApi;
  const [postUsers, { isLoading: postUserLoading }] = usePostUsersMutation();
  const [updateUsers, { isLoading: updateUserLoading }] =
    useUpdateUsersMutation();

  const [postUserEmployee, { isLoading: postEmployeeLoading }] =
    usePostUserEmployeeMutation();
  const [authCompanyVerification, { isLoading: authCompanyLoading }] =
    useAuthCompanyVerificationMutation();
  const updateUserId = isOpenAddUserDrawer?.recordId;

  const { data: userDetailData, isLoading: userDetailLoading } =
    useGetUsersByIdQuery(isOpenAddUserDrawer?.recordId, {
      skip: !isOpenAddUserDrawer?.recordId,
    });
  const userDetail = userDetailData?.data;

  const { isError: checkedEmailError } = useGetEmailExistQuery(
    { email: email },
    { skip: !email || isOpenAddUserDrawer?.type === ACTIONS_TYPES?.EDIT },
  );

  useEffect(() => {
    if (checkedEmailError) {
      errorSnackbar('Email already exist');
    }
  }, [checkedEmailError]);

  const initialTab = 0;
  const tabTitle =
    tabVal === initialTab
      ? EQuickLinksType?.COMPANY_OWNER
      : EQuickLinksType?.SUPER_ADMIN;

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
  const orgEmployeeMethods: any = useForm({
    resolver: yupResolver(orgEmployeeValidationSchema),
    defaultValues: superAdminValues,
  });

  // for company owner form methods
  const companyOwnerMethods: any = useForm({
    resolver: yupResolver(CompanyOwnerValidationSchema),
    defaultValues: userDetailData ? userDetail : companyOwnerDefaultValues,
  });

  //constant methods for both forms
  const methods =
    pathName === SUPER_ADMIN?.USERS_LIST
      ? orgEmployeeMethods
      : tabTitle === EQuickLinksType?.SUPER_ADMIN
        ? superAdminMethods
        : companyOwnerMethods;

  const { watch, setValue, handleSubmit, reset } = methods;
  const emailVal = watch('email');
  const [debouncedEmail, setDebouncedEmail] = useState(emailVal);

  // Debounce function
  const debounceEmail = debounce((value: any) => {
    setDebouncedEmail(value);
  }, 2000);

  useEffect(() => {
    debounceEmail(emailVal);
    return () => {
      debounceEmail.cancel();
    };
  }, [emailVal]);

  useEffect(() => {
    setEmail(debouncedEmail);
  }, [debouncedEmail]);

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
    const fieldsToSet: any = {
      firstName: userDetail?.firstName,
      lastName: userDetail?.lastName,
      email: userDetail?.email,
      address: userDetail?.address?.composite,
      crn: userDetail?.organization?.crn,
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
      companyName: userDetail?.organization?.name,
      products: userDetail?.activeProducts?.map((item: any) => {
        return item?._id;
      }),
    };
    for (const key in fieldsToSet) {
      setValue(key, fieldsToSet[key]);
    }
  }, [userDetailData]);

  // watch crn number from values
  const organizationNumber = formValues?.crn;

  debouncedSearch(organizationNumber, setOrgNumber);

  const { data, isSuccess, isError } = useGetAuthCompaniesQuery(
    { q: orgNumber },
    { skip: !orgNumber || isOpenAddUserDrawer?.type === ACTIONS_TYPES?.EDIT },
  );

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
      tabTitle === EQuickLinksType?.COMPANY_OWNER
    ) {
      values.role = EQuickLinksType?.ORG_ADMIN;
      delete values['address'];
    } else if (
      pathName === SUPER_ADMIN?.USERMANAGMENT &&
      tabTitle === EQuickLinksType?.SUPER_ADMIN
    ) {
      values.role = EQuickLinksType?.SUPER_ADMIN;
      values.superAdminRoleId = values?.superAdminRoleId?._id;
    } else if (pathName === SUPER_ADMIN?.USERS_LIST) {
      values.role = EQuickLinksType?.ORG_EMPLOYEE;
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
    if (isOpenAddUserDrawer?.type === ACTIONS_TYPES?.EDIT) {
      keysToDelete = keysToDelete.concat(
        '_id',
        'crn',
        'companyName',
        'role',
        'organization',
        'email',
        'activeProducts',
      );
    }

    for (const key of keysToDelete) {
      delete values[key];
    }

    try {
      if (isOpenAddUserDrawer?.type === ACTIONS_TYPES?.ADD) {
        const response = await postUsers({ body: values })?.unwrap();
        if (response) {
          await authCompanyVerification({
            email: { email: response?.email },
          })?.unwrap();
          reset();
          setIsOpenAddUserDrawer({ ...isOpenAddUserDrawer, drawer: false });
          successSnackbar('User Added Successfully');
        }
      } else if (pathName === SUPER_ADMIN?.USERS_LIST) {
        const response = await postUserEmployee({
          id: organizationId,
          body: values,
        })?.unwrap();
        if (response?.data?.email) {
          await authCompanyVerification({
            email: { email: response?.data?.email },
          })?.unwrap();
          successSnackbar('Org Employee Added Successfully');
          setIsOpenAdduserDrawer(false);
        }
      } else {
        await updateUsers({ id: updateUserId, body: values })?.unwrap();
        setIsOpenAddUserDrawer({ ...isOpenAddUserDrawer, drawer: false });
        successSnackbar('User Updated Successfully');
      }
    } catch (error: any) {
      errorSnackbar(error?.data?.message);
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
    userDetailLoading,
    updateUserLoading,
    authCompanyLoading,
    checkedEmailError,
    postEmployeeLoading,
  };
};

export default useAddUser;
