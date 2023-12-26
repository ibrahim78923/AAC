import { useForm } from 'react-hook-form';

import { useTheme } from '@mui/material';

import { detailsDefaultValues, detailsValidationSchema } from './Details.data';

import { yupResolver } from '@hookform/resolvers/yup';

const useDetails = (data: any) => {
  const theme = useTheme();

  const rowApiValues = {
    CompanyName: data?.name,
    DomainName: data?.domain,
    CompanyRegistrationNumber: data?.CRN,
    CompanyOwner: data?.ownerId,
    PhoneNumber: data?.phoneNumber,
    Industry: data?.industry,
    CompanyType: data?.type,
    NumberOfEmployees: data?.noOfEmloyee,
    AnnualRevenue: data?.totalRevenue,
    City: data?.city,
    PostalCode: data?.postalCode,
    LifeCycleStage: data?.LifeCycleStage,
    LastActivityDate: data?.LastActivityDate,
    CreatedDate: new Date(data?.createdAt),
    time: data?.createdAt,
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
          CompanyRegistrationNumber,
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
          CompanyRegistrationNumber,
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

  const onSubmit = () => {};
  const { handleSubmit } = methodsDetails;
  return {
    theme,
    methodsDetails,
    onSubmit,
    handleSubmit,
  };
};

export default useDetails;
