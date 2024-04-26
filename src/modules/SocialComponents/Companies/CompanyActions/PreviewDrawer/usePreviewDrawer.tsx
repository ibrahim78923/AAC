import { DATE_FORMAT } from '@/constants';
import { useGetCompanyPreviewQuery } from '@/services/commonFeatures/companies';
import { Theme, useTheme } from '@mui/material';
import dayjs from 'dayjs';

const usePreviewDrawer = (checkedRows: any) => {
  const { data: getCompanyPreview } = useGetCompanyPreviewQuery({
    id: checkedRows,
  });
  const companyDetails = getCompanyPreview?.data;
  const theme = useTheme<Theme>();

  const companyDetailsArray = [
    { title: 'Company Registration Number', value: 'AB123456' },
    {
      title: 'Company Owner',
      value: companyDetails?.companyOwner?.name ?? 'N/A',
    },
    {
      title: 'Phone Number',
      value: companyDetails?.companyOwner?.phoneNumber ?? 'N/A',
    },
    { title: 'Comapny Type', value: companyDetails?.type ?? 'N/A' },
    { title: 'Industry', value: companyDetails?.industry ?? 'N/A' },
    { title: 'No of Employees', value: companyDetails?.noOfEmloyee ?? 'N/A' },
    { title: 'Total Revenue', value: companyDetails?.totalRevenue ?? 'N/A' },
    {
      title: 'Created Date',
      value: dayjs(companyDetails?.createdAt)?.format(DATE_FORMAT?.UI) ?? 'N/A',
    },
    { title: 'Address', value: companyDetails?.address ?? 'N/A' },
  ];

  return {
    theme,
    companyDetailsArray,
    companyDetails,
  };
};

export default usePreviewDrawer;
