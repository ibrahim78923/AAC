import { Theme, useTheme } from '@mui/material';

const usePreviewDrawer = () => {
  const theme = useTheme<Theme>();

  const companyDetailsArray = [
    { title: 'Company Registration Number', value: 'AB123456' },
    { title: 'Company Owner', value: 'Savannah Shane' },
    { title: 'Phone Number', value: ' +44 779 672 6637' },
    { title: 'Comapny Type', value: 'Partner' },
    { title: 'Industry', value: 'Consumer Services' },
    { title: 'No of Employees', value: '500' },
    { title: 'Total Revenue', value: ' £50,000,000.00' },
    { title: 'Created Date', value: '10/04/2023' },
    { title: 'Address', value: 'SMD,128 City Road, London, EC1V 2NX' },
  ];

  return {
    theme,
    companyDetailsArray,
  };
};

export default usePreviewDrawer;
