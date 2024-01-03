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
  const { watch } = methods;
  const seletedCompany = watch('mergeCompanies');

  return {
    theme,
    companyDetails,
    methods,
    seletedCompany,
  };
};

export default useMergeModal;
