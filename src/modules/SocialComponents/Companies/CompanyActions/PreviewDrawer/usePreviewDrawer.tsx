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
      value: companyDetails?.companyOwner?.name ?? '--',
    },
    {
      title: 'Phone Number',
      value: companyDetails?.phone ?? '--',
    },
    { title: 'Comapny Type', value: companyDetails?.type ?? '--' },
    { title: 'Industry', value: companyDetails?.industry ?? '--' },
    { title: 'No of Employees', value: companyDetails?.noOfEmloyee ?? '--' },
    { title: 'Total Revenue', value: companyDetails?.totalRevenue ?? '--' },
    {
      title: 'Created Date',
      value: dayjs(companyDetails?.createdAt)?.format(DATE_FORMAT?.UI) ?? '--',
    },
    { title: 'Address', value: companyDetails?.address ?? '--' },
  ];

  return {
    theme,
    companyDetailsArray,
    companyDetails,
  };
};

export default usePreviewDrawer;
