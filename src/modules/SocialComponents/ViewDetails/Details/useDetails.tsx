import { useForm } from 'react-hook-form';

import { useTheme } from '@mui/material';

import { detailsDefaultValues, detailsValidationSchema } from './Details.data';

import { yupResolver } from '@hookform/resolvers/yup';
import { useCompanyUpdateMutation } from '@/services/commonFeatures/companies';
import { enqueueSnackbar } from 'notistack';
import { useGetLifeCycleQuery } from '@/services/commonFeatures/contacts';
import { useGetUsersQuery } from '@/services/superAdmin/user-management/users';
import dayjs from 'dayjs';
import { DATE_FORMAT } from '@/constants';

const useDetails = (data: any) => {
  const theme = useTheme();
  const [CompanyUpdate] = useCompanyUpdateMutation();

  const { data: lifeCycleStages } = useGetLifeCycleQuery({});

  const params = {
    role: 'ORG_ADMIN',
  };
  const { data: userList } = useGetUsersQuery(params);

  const lifeCycleStagesData = lifeCycleStages?.data?.lifecycleStages?.map(
    (lifecycle: any) => ({ value: lifecycle?._id, label: lifecycle?.name }),
  );

  const UserListData = userList?.data?.users?.map((lifecycle: any) => ({
    value: lifecycle?._id,
    label: `${lifecycle?.firstName} ${lifecycle?.lastName}`,
  }));

  const rowApiValues = {
    CompanyName: data?.name,
    DomainName: data?.domain,
    crn: data?.crn,
    CompanyOwner: data?.ownerId,
    PhoneNumber: data?.phone,
    Industry: data?.industry,
    CompanyType: data?.type,
    NumberOfEmployees: data?.noOfEmloyee,
    AnnualRevenue: data?.totalRevenue,
    City: data?.city,
    PostalCode: data?.postalCode,
    LifeCycleStage: data?.LifeCycleStage,
    LastActivityDate: data?.LastActivityDate,
    CreatedDate: new Date(data?.createdAt),
    time: data?.createdAt?.split('T')[1]?.substring(0, 5),
    LinkedInCompanyPage: data?.linkedInUrl,
    Address: data?.address,
    description: data?.description,
  };

  const methodsDetails: any = useForm({
    resolver: yupResolver(detailsValidationSchema),
    defaultValues: async () => {
      // if action is view or update

      if (rowApiValues) {
        const {
          CompanyName,
          DomainName,
          crn,
          CompanyOwner,
          PhoneNumber,
          Industry,
          CompanyType,
          NumberOfEmployees,
          AnnualRevenue,
          City,
          PostalCode,
          LifeCycleStage,
          LastActivityDate,
          CreatedDate,
          time,
          LinkedInCompanyPage,
          Address,
          description,
        } = rowApiValues;
        return {
          CompanyName,
          DomainName,
          crn,
          CompanyOwner,
          PhoneNumber,
          Industry,
          CompanyType,
          NumberOfEmployees,
          AnnualRevenue,
          City,
          PostalCode,
          LifeCycleStage,
          LastActivityDate,
          CreatedDate,
          time,
          LinkedInCompanyPage,
          Address,
          description,
        };
      }
      return detailsDefaultValues;
    },
  });

  const onSubmit = async (values: any) => {
    const formData = new FormData();
    formData.append('domain', values?.DomainName);
    formData.append('name', values?.CompanyName);
    formData.append('ownerId', values?.CompanyOwner);
    formData.append('industry', values?.Industry);
    formData.append('type', values?.CompanyType);
    formData.append('noOfEmloyee', parseInt(values?.NumberOfEmployees));
    formData.append('totalRevenue', parseInt(values?.AnnualRevenue));
    formData.append('city', values?.City);
    formData.append('postalCode', values?.PostalCode);
    formData.append('address', values?.Address);
    formData.append('description', values?.description);
    formData.append('linkedInUrl', values?.LinkedInCompanyPage);
    formData.append('phone', values?.PhoneNumber);
    formData.append('crn', values?.CompanyRegistrationNumber);
    if (
      values?.LifeCycleStage !== undefined &&
      values?.LifeCycleStage !== null
    ) {
      formData.append('lifeCyleId', values.LifeCycleStage);
    }
    formData.append(
      'joiningDate',
      dayjs(values?.CreatedDate)?.format(DATE_FORMAT?.API),
    );
    formData.append('isDeleted', 'ACTIVE');
    formData.append('recordType', 'companies');

    try {
      await CompanyUpdate({
        body: formData,
        id: data?._id,
      }).unwrap();

      enqueueSnackbar(`company updated Successfully`, { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Some thing went wrong', {
        variant: 'error',
      });
    }
  };
  const { handleSubmit } = methodsDetails;
  return {
    theme,
    methodsDetails,
    onSubmit,
    handleSubmit,
    lifeCycleStagesData,
    UserListData,
  };
};

export default useDetails;
