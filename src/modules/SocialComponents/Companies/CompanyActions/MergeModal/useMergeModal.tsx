import { Theme, useTheme } from '@mui/material';
import { useGetCompaniesDetailsQuery } from '@/services/commonFeatures/companies';
import { useForm } from 'react-hook-form';

const useMergeModal = (checkedRows: any) => {
  const theme = useTheme<Theme>();

  const { data: getCompaniesDetails } = useGetCompaniesDetailsQuery({
    Id: checkedRows,
  });
  const companyDetails = getCompaniesDetails?.data;

  const methods = useForm();

  const optionsArray = [
    { value: 'All Industries', label: 'All Industries' },
    { value: 'Computer Software', label: 'Computer Software' },
    { value: 'Construction', label: 'Construction' },
    { value: 'Electronics', label: 'Electronics' },
  ];

  return {
    theme,
    companyDetails,
    methods,
    optionsArray,
  };
};

export default useMergeModal;
